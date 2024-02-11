<script setup lang="ts">
import { inject } from "vue"
import { Column } from "@/types"
import CanbanTableColumnHeader from "@/components/canban/CanbanTableColumnHeader.vue"
import CanbanTableColumnList from "@/components/canban/CanbanTableColumnList.vue"
import VButton from "@/components/form/VButton.vue"
import { draggingTaskDataDefaults } from "@/components/canban/helpers"
const props = defineProps<{ column: Column; isProtoColumn?: boolean }>()
const updateColumnTitle = inject("updateColumnTitle", ({ title, columnId }) => {})
const deleteColumn = inject("deleteColumn", (columnId) => {})
const createColumn = inject("createColumn", () => {})
const createTask = inject("createTask", (columnId) => {})
const taskDragData = inject("draggingTaskData", draggingTaskDataDefaults)

function handleColumnDeletion() {
  deleteColumn(props.column.id)
}
function handleColumnTitleChange(title: string) {
  updateColumnTitle({ title, columnId: props.column.id })
}
function handleTaskInsertion() {
  taskDragData.update({ columnId: props.column.id })
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
        @onCreateTask="createTask(column.id)"
        @onDeleteColumn="handleColumnDeletion"
        @onColumnTitleChange="handleColumnTitleChange"
      />
      <CanbanTableColumnList :tasks="column.tasks" @onTaskInsertion="handleTaskInsertion" />
    </template>
  </section>
</template>

<style scoped lang="scss">
.column {
  height: 100%;
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
