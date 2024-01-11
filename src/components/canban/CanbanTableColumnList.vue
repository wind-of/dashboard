<script setup lang="ts">
import draggable from "vuedraggable"
import CanbanTableColumnListItem from "./CanbanTableColumnListItem.vue"
import { computed } from "vue"
import { Task } from "../../types"

const props = defineProps<{ tasks: Task[] }>()
const emit = defineEmits(["onListChange", "onTaskSelection"])

const tasks = computed({
  get() {
    return props.tasks
  },
  set(updatedTasks) {
    emit("onListChange", updatedTasks)
  }
})

function handleTaskClick(taskId: number) {
  emit("onTaskSelection", taskId)
}
</script>

<template>
  <draggable class="list-group" v-model="tasks" group="tasks" itemKey="id">
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

  display: flex;
  flex-direction: column;
  gap: 14px;
}
</style>
