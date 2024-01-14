<script setup lang="ts">
import { Column, Task } from "@/types"
import CanbanTableColumnHeader from "~/canban/CanbanTableColumnHeader.vue"
import CanbanTableColumnList from "~/canban/CanbanTableColumnList.vue"
import VButton from "~/form/VButton.vue"
const props = defineProps<{ column: Column; isProtoColumn?: boolean }>()
const emit = defineEmits([
  "onListChange",
  "onCreateTask",
  "onTaskSelection",
  "onCreateColumn",
  "onDeleteColumn"
])

function handleListChange(updatedTasks: Task[]) {
  emit("onListChange", updatedTasks)
}
function handleTaskCreation(columnId: number) {
  emit("onCreateTask", columnId)
}
function handleTaskSelection(taskId: number) {
  emit("onTaskSelection", taskId, props.column.id)
}

function handleColumnCreation() {
  emit("onCreateColumn")
}
function handleColumnDeletion() {
  emit("onDeleteColumn")
}
</script>

<template>
  <section class="column">
    <div class="proto-column" v-if="isProtoColumn">
      <VButton @click="handleColumnCreation">Create column</VButton>
    </div>
    <template v-else>
      <CanbanTableColumnHeader
        :title="column.title"
        @onCreateTask="handleTaskCreation(column.id)"
        @onDeleteColumn="handleColumnDeletion"
      />
      <CanbanTableColumnList
        :tasks="column.tasks"
        @onListChange="handleListChange"
        @onTaskSelection="handleTaskSelection"
      />
    </template>
  </section>
</template>

<style scoped lang="scss">
.column {
  min-width: 235px;
  max-width: 235px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.proto-column {
  margin: 10px;
}
</style>
