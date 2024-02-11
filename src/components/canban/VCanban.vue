<script setup lang="ts">
import { computed, provide, ref, watchEffect } from "vue"

import CanbanHeader from "@/components/canban/CanbanHeader.vue"
import CanbanTable from "@/components/canban/CanbanTable.vue"
import TaskDrawer from "@/components/TaskDrawer.vue"

import type { Project, Column, Task } from "@/types"
import { useTaskDrawer } from "@/composables/task.drawer"
import { useProjectStore } from "@/stores/project"
import {
  createColumnInProject,
  createTaskInColumn,
  deleteColumnFromProject,
  updateColumn,
  updateProjectTitle,
  updateTaskPositionRequest
} from "@/api"
import { useTagsStore } from "@/stores/tags"
import { watch } from "fs"

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

const columnsWithoutTasks = computed(() => project.value.columns.map(({ tasks, ...rest }) => rest))

// FIXME: список на мгновение возвращается в исходное состояние, пока запрос не завершится.
const draggingTaskData = ref<any>({
  element: undefined,
  columnId: undefined,
  newIndex: undefined,
  inserAfter: false
})
const updateDraggingTaskData = (update: object) => {
  draggingTaskData.value = { ...draggingTaskData.value, ...update }
}

watchEffect(async () => {
  const { element, columnId, newIndex } = draggingTaskData.value
  if (!element || columnId === undefined || newIndex === undefined) return
  await handleTaskPositionChange()
  draggingTaskData.value = {
    element: undefined,
    columnId: undefined,
    newIndex: undefined,
    inserAfter: false
  }
})

async function handleTaskPositionChange() {
  const { shouldInsertAfter, columnId, newIndex, element: task } = draggingTaskData.value
  projectUpdater(() =>
    updateTaskPositionRequest(projectId.value, task.id, columnId, newIndex, shouldInsertAfter)
  )
}
function handleColumnPositionChange(column: Column, newIndex: number) {
  console.log(column, newIndex)
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
provide("columnPositionChange", handleColumnPositionChange)
provide("draggingTaskData", {
  data: draggingTaskData,
  update: updateDraggingTaskData
})
</script>

<template>
  <section class="canban">
    <CanbanHeader :title="project.title" @onProjectTitleChange="handleProjectTitleChange" />
    <CanbanTable :columns="project.columns" />
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
