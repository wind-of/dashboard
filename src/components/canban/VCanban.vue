<script setup lang="ts">
import { computed } from "vue"

import CanbanHeader from "~/canban/CanbanHeader.vue"
import CanbanTable from "~/canban/CanbanTable.vue"
import TaskDrawer from "~/TaskDrawer.vue"

import { task as initializeTask, column as initializeColumn, isTaskInList } from "@/utils"
import type { Project, Column, Task } from "@/types"
import { useTaskDrawer } from "@/composables/task.drawer"
import { useProjectStore } from "@/stores/project"

const projectStore = useProjectStore()
const project = computed(() => projectStore.project as Project)
const {
  handleTaskChange,
  handleTaskChangeCancel,
  handleTaskDelete,
  handleTaskSelection,
  isDrawerOpen,
  selected
} = useTaskDrawer(project.value)

const binColumn = initializeColumn()

const column = (columnId: number) =>
  project.value.columns.find(({ id }) => id === columnId) || binColumn
const columnsWithoutTasks = computed(() => project.value.columns.map(({ tasks, ...rest }) => rest))

function handleListChange(columnId: number, updatedList: Task[]) {
  const currentColumn = column(columnId)
  if (isTaskInList(updatedList, selected.task.id)) {
    selected.columnId = columnId
  }
  currentColumn.tasks = updatedList
}
function handleColumnList(updatedColumns: Column[]) {
  project.value.columns = updatedColumns
}
function handleTaskCreation(columnId: number) {
  column(columnId).tasks.push(initializeTask())
}
</script>

<template>
  <section class="canban">
    <CanbanHeader :title="project.title" />
    <CanbanTable
      :columns="project.columns"
      @onColumnChange="handleColumnList"
      @onListChange="handleListChange"
      @onTaskCreate="handleTaskCreation"
      @onTaskSelection="handleTaskSelection"
    />
    <Teleport to="body">
      <TaskDrawer
        :task="selected.task"
        :columnId="selected.columnId"
        :isOpen="isDrawerOpen"
        :columns="columnsWithoutTasks"
        @onCommitChanges="handleTaskChange"
        @onCancelChanges="handleTaskChangeCancel"
        @onTaskDelete="handleTaskDelete"
      />
    </Teleport>
  </section>
</template>

<style lang="scss" scoped>
// FIX: Перенос тасков с "высоких" колонок в низкие не происходит из-за высоты колонки
.canban {
  @include flex-column;
  width: calc(var(--view-width) - var(--view-padding));
  height: calc(var(--view-height) - var(--view-padding));
  overflow: scroll;
  padding-bottom: 30px;
  gap: 40px;
}
</style>
