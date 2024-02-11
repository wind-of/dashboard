<script setup lang="ts">
import { computed, inject } from "vue"
import draggable from "vuedraggable"
import { Task } from "@/types"
import CanbanTableColumnListItem from "@/components/canban/CanbanTableColumnListItem.vue"
import { draggingTaskDataDefaults } from "@/components/canban/helpers"

const props = defineProps<{ tasks: Task[] }>()
const emit = defineEmits(["onTaskDragEnd", "onTaskInsertion"])
const selectTask = inject("selectTask", (taskId, columnId) => {})

const tasks = computed({
  get() {
    return [...props.tasks].sort((a, b) => (b.lexorank <= a.lexorank ? 1 : -1))
  },
  set(newList) {
    if (newList.length < props.tasks.length) {
      return
    }
    emit("onTaskInsertion")
  }
})
const taskDragData = inject("draggingTaskData", draggingTaskDataDefaults)

function handleChange({ moved, added, removed }) {
  taskDragData.update(moved || added || removed)
}
function handleMove(event) {
  taskDragData.update({ shouldInsertAfter: event.willInsertAfter })
}
function handleTaskClick(task: Task) {
  selectTask(task.id, task.columnId)
}
</script>

<template>
  <draggable
    class="list-group"
    v-model="tasks"
    @change="handleChange"
    @move="handleMove"
    group="tasks"
    item-key="lexorank"
    itemid="lexorank"
  >
    <template #item="{ element }">
      <CanbanTableColumnListItem
        :key="element.lexorank"
        :task="element"
        @click="handleTaskClick(element as Task)"
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
@/components/canban/helpers/helper
