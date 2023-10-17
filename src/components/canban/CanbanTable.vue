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
const emit = defineEmits(["onListChange", "onTaskCreate", "onColumnChange"])
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
      <template #item="{ element }">
        <CanbanTableColumn 
          :key="element.id" 
          :column="element" 
          @onListChange="handleColumnListChange($event, element.id)"
          @onCreateTask="handleColumnTaskCreation"
        />
      </template>
    </draggable>
  </section>
</template>

<style lang="scss" scoped>
.wrapper {
  @include flex-row;
  width: calc(var(--canban-width) - var(--canban-drawer-width) - var(--canban-padding));
  padding-bottom: 20px;
  overflow: scroll;
}
.columns {
  @include flex-row;
  width: 100%;
  gap: 16px;
}
</style>
