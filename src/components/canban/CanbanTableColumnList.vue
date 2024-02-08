<script setup lang="ts">
import { computed, inject, reactive } from "vue"
import draggable from "vuedraggable"
import { Task } from "@/types"
import CanbanTableColumnListItem from "@/components/canban/CanbanTableColumnListItem.vue"

const props = defineProps<{ tasks: Task[] }>()
const emit = defineEmits(["onTaskSelection"])
const handleTaskPositionChange = inject(
  "taskPositionChange",
  async (task: Task, columnId: number, newIndex: number, oldIndex: number) => {}
)

const tasks = computed({
  get() {
    return [...props.tasks].sort((a, b) => (b.lexorank <= a.lexorank ? 1 : -1))
  },
  set() {}
})

function handleTaskClick(taskId: number) {
  emit("onTaskSelection", taskId)
}
const taskData = reactive({
  element: undefined,
  columnId: undefined,
  oldIndex: undefined,
  newIndex: undefined
})
async function handleTasksListChange({ moved, added, removed }) {
  if (moved) {
    await handleTaskPositionChange(
      moved.element,
      moved.element.columnId,
      moved.newIndex,
      moved.oldIndex
    )
    return
  }
  if (added) {
    taskData.newIndex = added.newIndex
  } else {
    taskData.oldIndex = removed.oldIndex
  }
  taskData.element = added?.element || removed?.element
  taskData.columnId = added?.element?.columnId || removed?.element?.columnId
  if (
    taskData.element &&
    taskData.columnId !== undefined &&
    taskData.oldIndex !== undefined &&
    taskData.newIndex !== undefined
  ) {
    await handleTaskPositionChange(
      taskData.element,
      taskData.columnId,
      taskData.newIndex,
      taskData.oldIndex
    )
    taskData.oldIndex = taskData.newIndex = taskData.columnId = taskData.element = undefined
  }
}
// TODO: достань newColumnId
async function handleEnd(event) {
  console.log(event)
  // const { oldIndex, newIndex } = event
  // const task = tasks.value[oldIndex]
  // await handleTaskPositionChange(task, , newIndex, oldIndex)
}
</script>

<template>
  <draggable
    class="list-group"
    v-model="tasks"
    @end="handleEnd"
    group="tasks"
    item-key="lexorank"
    itemid="lexorank"
  >
    <template #item="{ element }">
      <CanbanTableColumnListItem
        :key="element.lexorank"
        :task="element"
        @click="handleTaskClick(element.id)"
      />
    </template>
  </draggable>
</template>

<style scoped>
.list-group {
  min-height: 200px;
  height: 100%;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  gap: 14px;
}
</style>
