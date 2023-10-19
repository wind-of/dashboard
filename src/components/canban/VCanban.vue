<script setup>
import { reactive, ref } from "vue"
import CanbanHeader from "./CanbanHeader.vue"
import CanbanTable from "./CanbanTable.vue"
import CanbanDrawer from "./CanbanDrawer.vue"
import { project as mockProject } from "../../mock"
import { task as initializeTask } from "../../utils/template"

const project = reactive(mockProject)
const column = (columnId) => project.columns.find(({ id }) => id === columnId)
function handleListChange({ columnId, updatedList }) {
  column(columnId).tasks = updatedList
}
function handleColumnList(updatedColumns) {
  project.columns = updatedColumns
}
function handleTaskCreation(columnId) {
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
    <Teleport to="html">
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
