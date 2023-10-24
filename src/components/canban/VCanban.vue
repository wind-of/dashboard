<script setup lang="ts">
import { reactive, ref } from "vue"
import CanbanHeader from "~/canban/CanbanHeader.vue"
import CanbanTable from "~/canban/CanbanTable.vue"
import CanbanDrawer from "~/canban/CanbanDrawer.vue"
import { project as mockProject } from "@/mock"
import { task as initializeTask, column as initializeColumn } from "@/utils/template"
import type { Project, Column, Task } from "@/types"

const binTask = initializeTask()
const binColumn = initializeColumn()

const project: Project = reactive(mockProject)
const isDrawerOpen = ref(false)
const selected = reactive({ task: initializeTask({ title: "", description: "" }), columnId: "" })

const column = (columnId: string) => project.columns.find(({ id }) => id === columnId) || binColumn
const task = (taskId: string, columnId: string) =>
  column(columnId).tasks.find(({ id }) => id === taskId) || binTask

function handleListChange(columnId: string, updatedList: Task[]) {
  const currentColumn = column(columnId)
  currentColumn.tasks = updatedList
}
function handleColumnList(updatedColumns: Column[]) {
  project.columns = updatedColumns
}
function handleTaskCreation(columnId: string) {
  column(columnId).tasks.push(initializeTask())
}
function handleTaskChange(updatedTask: Task) {
  const targetTask = task(selected.task.id, selected.columnId)
  targetTask.title = updatedTask.title
  targetTask.description = updatedTask.description
  targetTask.tags = updatedTask.tags
}
function handleTaskChangeCancel() {
  isDrawerOpen.value = false
  selected.task = initializeTask({ title: "", description: "" })
  selected.columnId = ""
}
function handleTaskDelete() {
  const currentColumn = column(selected.columnId)
  currentColumn.tasks = currentColumn.tasks.filter(({ id }) => id !== selected.task.id)
  isDrawerOpen.value = false
}
function handleTaskSelection(taskId: string, columnId: string) {
  selected.columnId = columnId
  selected.task = task(taskId, columnId)
  isDrawerOpen.value = true
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
      <CanbanDrawer
        :task="selected.task"
        :columnId="selected.columnId"
        :isOpen="isDrawerOpen"
        @onCommitChanges="handleTaskChange"
        @onCancelChanges="handleTaskChangeCancel"
        @onTaskDelete="handleTaskDelete"
      />
    </Teleport>
  </section>
</template>

<style lang="scss" scoped>
.canban {
  @include flex-column;
  width: var(--canban-width);
  padding: var(--canban-padding);
  gap: 40px;
}
</style>
