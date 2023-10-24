<script setup lang="ts">
import { Column, Task } from "../../types"
import CanbanTableColumnHeader from "./CanbanTableColumnHeader.vue"
import CanbanTableColumnList from "./CanbanTableColumnList.vue"
const props = defineProps<{ column: Column }>()
const emit = defineEmits(["onListChange", "onCreateTask", "onTaskSelection"])

function handleListChange(updatedTasks: Task[]) {
  emit("onListChange", updatedTasks)
}
function handleTaskCreation(columnId: string) {
  emit("onCreateTask", columnId)
}
function handleTaskSelection(taskId: string) {
  emit("onTaskSelection", taskId, props.column.id)
}
</script>

<template>
  <section class="column">
    <CanbanTableColumnHeader :title="column.title" @onCreateTask="handleTaskCreation(column.id)" />
    <CanbanTableColumnList
      :tasks="column.tasks"
      @onListChange="handleListChange"
      @onTaskSelection="handleTaskSelection"
    />
  </section>
</template>

<style scoped>
.column {
  width: 235px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
