<script setup lang="ts">
import { computed, provide } from "vue"

import CanbanHeader from "@/components/canban/CanbanHeader.vue"
import CanbanTable from "@/components/canban/CanbanTable.vue"
import TaskDrawer from "@/components/TaskDrawer.vue"

import { column as initializeColumn, isTaskInList } from "@/utils"
import type { Project, Column, Task } from "@/types"
import { useTaskDrawer } from "@/composables/task.drawer"
import { useProjectStore } from "@/stores/project"
import {
  createColumnInProject,
  createTaskInColumn,
  deleteColumnFromProject,
  updateColumn,
  updateProjectTitle
} from "@/api"
import { useTagsStore } from "@/stores/tags"

const projectStore = useProjectStore()
const tagsStore = useTagsStore()
const project = computed(() => projectStore.project as Project)
const projectId = computed(() => project.value.id)
const {
  handleTaskChange,
  handleTaskChangeCancel,
  handleTaskDelete,
  handleTaskSelection,
  isDrawerOpen,
  selected
} = useTaskDrawer()

async function projectUpdater(request) {
  await request()
  await projectStore.updateProjectInStore(projectId.value)
}

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
async function handleTaskCreation(columnId: number) {
  await createTaskInColumn(projectId.value, columnId)
  projectStore.updateProjectInStore(projectId.value)
}
async function handleColumnCreation() {
  await createColumnInProject(projectId.value)
  projectStore.updateProjectInStore(projectId.value)
}
async function handleColumnDeletion(columnId: number) {
  await deleteColumnFromProject(projectId.value, columnId)
  projectStore.updateProjectInStore(projectId.value)
}
async function handleColumnTitleChange({ title, columnId }: { title: string; columnId: number }) {
  await updateColumn(projectId.value, columnId, { title })
  await projectStore.updateProjectInStore(projectId.value)
}

async function handleProjectTitleChange(title: string) {
  projectUpdater(() => updateProjectTitle(projectId.value, title))
}

provide("createTask", handleTaskCreation)
provide("createColumn", handleColumnCreation)
provide("deleteColumn", handleColumnDeletion)
provide("updateColumnTitle", handleColumnTitleChange)
provide("selectTask", handleTaskSelection)
</script>

<template>
  <section class="canban">
    <CanbanHeader :title="project.title" @onProjectTitleChange="handleProjectTitleChange" />
    <CanbanTable
      :columns="project.columns"
      @onColumnChange="handleColumnList"
      @onListChange="handleListChange"
    />
    <Teleport to="body">
      <TaskDrawer
        :task="selected.task"
        :tags="tagsStore.tags"
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
