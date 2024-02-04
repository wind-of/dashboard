<script setup lang="ts">
import { inject } from "vue"
import { Column, Task } from "@/types"
import CanbanTableColumnHeader from "~/canban/CanbanTableColumnHeader.vue"
import CanbanTableColumnList from "~/canban/CanbanTableColumnList.vue"
import VButton from "~/form/VButton.vue"
const props = defineProps<{ column: Column; isProtoColumn?: boolean }>()
const emit = defineEmits(["onListChange", "onCreateTask", "onTaskSelection"])
const updateColumnTitle = inject("updateColumnTitle", ({ title, columnId }) => {})
const deleteColumn = inject("deleteColumn", (columnId) => {})
const createColumn = inject("createColumn", () => {})

function handleListChange(updatedTasks: Task[]) {
  emit("onListChange", updatedTasks)
}
function handleTaskCreation(columnId: number) {
  emit("onCreateTask", columnId)
}
function handleTaskSelection(taskId: number) {
  emit("onTaskSelection", taskId, props.column.id)
}

function handleColumnDeletion() {
  deleteColumn(props.column.id)
}
function handleColumnTitleChange(title: string) {
  updateColumnTitle({ title, columnId: props.column.id })
}
</script>

<template>
  <section class="column">
    <div class="proto-column" v-if="isProtoColumn">
      <VButton @click="createColumn">Create column</VButton>
    </div>
    <template v-else>
      <CanbanTableColumnHeader
        :title="column.title"
        @onCreateTask="handleTaskCreation(column.id)"
        @onDeleteColumn="handleColumnDeletion"
        @onColumnTitleChange="handleColumnTitleChange"
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
  height: 100%;
  overflow-y: scroll;
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
