<script setup lang="ts">
import { Task } from "../../types"
import CanbanTableColumnHeader from "./CanbanTableColumnHeader.vue"
import CanbanTableColumnList from "./CanbanTableColumnList.vue"
defineProps({
  column: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(["onListChange", "onCreateTask"])
function handleListChange(updatedTasks: Task[]) {
  emit("onListChange", updatedTasks)
}
function handleTaskCreation(columnId: string) {
  emit("onCreateTask", columnId)
}
</script>

<template>
  <section class="column">
    <CanbanTableColumnHeader :title="column.title" @onCreateTask="handleTaskCreation(column.id)" />
    <CanbanTableColumnList :tasks="column.tasks" @onListChange="handleListChange" />
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
