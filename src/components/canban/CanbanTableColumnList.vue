<script setup lang="ts">
import { computed, inject } from "vue"
import draggable from "vuedraggable"
import { Task } from "@/types"
import CanbanTableColumnListItem from "@/components/canban/CanbanTableColumnListItem.vue"

const props = defineProps<{ tasks: Task[] }>()
const emit = defineEmits(["onTaskSelection"])
const handleTaskPositionChange = inject("taskPositionChange", (task: Task, newIndex: number) => {})

const tasks = computed({
  get() {
    return props.tasks
  },
  set() {}
})

function handleTaskClick(taskId: number) {
  emit("onTaskSelection", taskId)
}
function handleTasksListChange({ moved }) {
  handleTaskPositionChange(moved.element, moved.newIndex)
}
</script>

<template>
  <draggable class="list-group" v-model="tasks" @change="handleTasksListChange" group="tasks">
    <template #item="{ element }">
      <CanbanTableColumnListItem
        :key="element.id"
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
