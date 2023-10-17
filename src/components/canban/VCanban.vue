<script setup>
import { reactive } from "vue";
import CanbanHeader from "./CanbanHeader.vue"
import CanbanTable from "./CanbanTable.vue"
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
    <section class="drawer"></section>
  </section>
</template>

<style lang="scss" scoped>
.canban {
  width: var(--canban-width);
  display: flex;
  flex-direction: column;
  padding: var(--canban-padding);
  gap: 40px;
}
.drawer {
  width: var(--canban-drawer-width);
  height: calc(100vh - var(--header-height));
  position: absolute;
  
  background: white;
  right: 0;
  top: var(--header-height);
}
</style>
