<script setup lang="ts">
import { computed } from "vue"
import draggable from "vuedraggable"
import CanbanTableColumn from "./CanbanTableColumn.vue"
import { Column } from "../../types"
const props = defineProps<{ columns: Column[] }>()
const emit = defineEmits(["onListChange", "onTaskCreate", "onColumnChange", "onTaskSelection"])
const columnsList = computed({
  get() {
    return props.columns
  },
  set(updatedColumns) {
    emit("onColumnChange", updatedColumns)
  }
})
function handleColumnListChange(columnId: string, updatedList: Column[]) {
  emit("onListChange", columnId, updatedList)
}
function handleColumnTaskCreation(columnId: string) {
  emit("onTaskCreate", columnId)
}
function handleTaskSelection(taskId: string, columnId: string) {
  emit("onTaskSelection", taskId, columnId)
}
</script>

<template>
  <section class="wrapper">
    <draggable class="columns" v-model="columnsList" group="columns" itemKey="id">
      <template #item="{ element }">
        <CanbanTableColumn
          :key="element.id"
          :column="element"
          @onListChange="handleColumnListChange(element.id, $event)"
          @onCreateTask="handleColumnTaskCreation"
          @onTaskSelection="handleTaskSelection"
        />
      </template>
    </draggable>
  </section>
</template>

<style lang="scss" scoped>
.wrapper {
  @include flex-row;
  width: calc(var(--view-width) - var(--canban-padding));
  overflow: scroll;
}
.columns {
  @include flex-row;
  width: 100%;
  gap: 16px;
}
</style>
