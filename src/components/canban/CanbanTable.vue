<script setup lang="ts">
import { computed } from "vue"
import draggable from "vuedraggable"
import type { Column } from "@/types"
import CanbanTableColumn from "~/canban/CanbanTableColumn.vue"
import { mockColumn } from "@/mock"

const props = defineProps<{ columns: Column[] }>()
const emit = defineEmits([
  "onListChange",
  "onTaskCreate",
  "onColumnChange",
  "onTaskSelection",
  "onColumnCreate",
  "onColumnDelete"
])
const columnsList = computed({
  get() {
    return props.columns
  },
  set(updatedColumns) {
    emit("onColumnChange", updatedColumns)
  }
})

function handleColumnListChange(columnId: number, updatedList: Column[]) {
  emit("onListChange", columnId, updatedList)
}
function handleColumnTaskCreation(columnId: number) {
  emit("onTaskCreate", columnId)
}
function handleTaskSelection(taskId: number, columnId: number) {
  emit("onTaskSelection", taskId, columnId)
}

function handleColumnCreation() {
  emit("onColumnCreate")
}
function handleColumnDeletion(columnId: number) {
  emit("onColumnDelete", columnId)
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
          @onDeleteColumn="handleColumnDeletion(element.id)"
        />
      </template>
    </draggable>
    <CanbanTableColumn isProtoColumn :column="mockColumn" @onCreateColumn="handleColumnCreation" />
  </section>
</template>

<style lang="scss" scoped>
.wrapper {
  @include flex-row;
  width: calc(var(--view-width) - var(--canban-padding));
  height: 100%;
  overflow: scroll;
}
.columns {
  @include flex-row;
  gap: 16px;
}
</style>
