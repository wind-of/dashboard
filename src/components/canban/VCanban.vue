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
  updateColumnPositionRequest,
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
  shouldInsertAfter: false
})
const draggingColumnData = ref<any>({
  element: undefined,
  newIndex: undefined,
  shouldInsertAfter: false
})
const updateDraggingTaskData = (update: object) => {
  draggingTaskData.value = { ...draggingTaskData.value, ...update }
}
const updateDraggingColumnData = (update: object) => {
  draggingColumnData.value = { ...draggingColumnData.value, ...update }
}

watchEffect(async () => {
  const { element, columnId, newIndex } = draggingTaskData.value
  if (!element || columnId === undefined || newIndex === undefined) return
  await handleTaskPositionChange()
  draggingTaskData.value = {
    element: undefined,
    columnId: undefined,
    newIndex: undefined,
    shouldInsertAfter: false
  }
})
watchEffect(async () => {
  const { element, newIndex } = draggingColumnData.value
  if (!element || newIndex === undefined) return
  await handleColumnPositionChange()
  draggingColumnData.value = {
    element: undefined,
    newIndex: undefined,
    shouldInsertAfter: false
  }
})

async function handleTaskPositionChange() {
  const { shouldInsertAfter, columnId, newIndex, element: task } = draggingTaskData.value
  await projectUpdater(() =>
    updateTaskPositionRequest(projectId.value, task.id, columnId, newIndex, shouldInsertAfter)
  )
}
async function handleColumnPositionChange() {
  const { shouldInsertAfter, newIndex, element: column } = draggingColumnData.value
  await projectUpdater(() =>
    updateColumnPositionRequest(projectId.value, column.id, newIndex, shouldInsertAfter)
  )
}
async function handleTaskCreation(columnId: number) {
  projectUpdater(() => createTaskInColumn(projectId.value, columnId))
}
async function handleColumnCreation() {
  projectUpdater(() => createColumnInProject(projectId.value))
}
async function handleColumnDeletion(columnId: number) {
  projectUpdater(() => deleteColumnFromProject(projectId.value, columnId))
}
async function handleColumnTitleChange({ title, columnId }: { title: string; columnId: number }) {
  projectUpdater(() => updateColumn(projectId.value, columnId, { title }))
}

async function handleProjectTitleChange(title: string) {
  projectUpdater(() => updateProjectTitle(projectId.value, title))
}

provide("createTask", handleTaskCreation)
provide("createColumn", handleColumnCreation)
provide("deleteColumn", handleColumnDeletion)
provide("updateColumnTitle", handleColumnTitleChange)
provide("selectTask", handleTaskSelection)
provide("draggingTaskData", {
  data: draggingTaskData,
  update: updateDraggingTaskData
})
provide("draggingColumnData", {
  data: draggingColumnData,
  update: updateDraggingColumnData
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
.canban {
  @include flex-column;
  width: calc(var(--view-width) - var(--view-padding));
  height: calc(var(--view-height) - var(--view-padding));
  overflow: scroll;
  padding-bottom: 30px;
  gap: 40px;
}
</style>
