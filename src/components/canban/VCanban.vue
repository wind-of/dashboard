<script setup>
import { reactive } from "vue";
import CanbanHeader from "./CanbanHeader.vue"
import CanbanTable from "./CanbanTable.vue"
import { project as mockProject } from "../../mock"

const project = reactive(mockProject)
function handleColumnListChange({ columnId, updatedList }) { 
  const currentColumn = project.columns.find(({ id }) => id === columnId)
  currentColumn.tasks = updatedList
}
function handleColumnList(updatedColumns) {
  project.columns = updatedColumns
}
</script>

<template>
  <section class="canban">
    <CanbanHeader :title="project.title" />
    <CanbanTable :columns="project.columns" @onColumnListChange="handleColumnListChange" @onColumnChange="handleColumnList" />
  </section>
</template>

<style scoped>
.canban {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
</style>
