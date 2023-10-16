<script setup>
import { computed } from "vue"
import draggable from "vuedraggable"
import CanbanTableColumn from "./CanbanTableColumn.vue"
const props = defineProps({
  columns: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(["onListChange", "onTaskCreate"])
const columnsList = computed({
  get() {
    return props.columns
  },
  set(updatedColumns) {
    emit("onColumnChange", updatedColumns)
  }
})
function handleColumnListChange(updatedList, columnId) {
  emit("onListChange", { updatedList, columnId })
}
function handleColumnTaskCreation(columnId) {
  emit("onTaskCreate", columnId)
}
</script>

<template>
  <section class="wrapper">
    <draggable
      class="columns"
      v-model="columnsList"
      group="columns"
      itemKey="id"
    >
      <template #item="{ index }">
        <CanbanTableColumn 
          :key="columns[index].id" 
          :column="columns[index]" 
          @onListChange="handleColumnListChange($event, columns[index].id)"
          @onCreateTask="handleColumnTaskCreation"
        />
      </template>
    </draggable>
  </section>
</template>

<style lang="scss" scoped>
.columns {
  @include flex-row;
  width: 100%;
  gap: 16px;
}
</style>
