<script setup lang="ts">
import { reactive, ref } from "vue"
import CanbanHeader from "./CanbanHeader.vue"
import CanbanTable from "./CanbanTable.vue"
import CanbanDrawer from "./CanbanDrawer.vue"
import { project as mockProject } from "../../mock"
import { task as initializeTask } from "../../utils/template"
import type { Project, Column, Task } from "../../types"

const project: Project = reactive(mockProject)
const column = (columnId: string): Column =>
  project.columns.find(({ id }) => id === columnId) as Column
function handleListChange({ columnId, updatedList }: { columnId: string; updatedList: Task[] }) {
  column(columnId).tasks = updatedList
}
function handleColumnList(updatedColumns: Column[]) {
  project.columns = updatedColumns
}
function handleTaskCreation(columnId: string) {
  column(columnId).tasks.push(initializeTask({ description: "", tags: [] }))
}
const isDrawerOpen = ref(false)
</script>

<template>
  <section class="canban">
    <CanbanHeader :title="project.title" />
    <CanbanTable
      :columns="project.columns"
      @onColumnChange="handleColumnList"
      @onListChange="handleListChange"
      @onTaskCreate="handleTaskCreation"
    />
    <Teleport to="body">
      <CanbanDrawer :task="project.columns[0].tasks[0]" :isOpen="isDrawerOpen" />
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
