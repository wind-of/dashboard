<script setup lang="ts">
import { computed, inject } from "vue"
import draggable from "vuedraggable"
import type { Column } from "@/types"
import CanbanTableColumn from "@/components/canban/CanbanTableColumn.vue"
import { mockColumn } from "@/mock"

const props = defineProps<{ columns: Column[] }>()
const handleColumnPositionChange = inject(
  "columnPositionChange",
  (column: Column, newIndex: number) => {}
)
const columnsList = computed({
  get() {
    return props.columns
  },
  set() {}
})

function handleColumnsListChange({ moved }) {
  handleColumnPositionChange(moved.element, moved.newIndex)
}
</script>

<template>
  <section class="wrapper">
    <draggable
      class="columns"
      v-model="columnsList"
      @change="handleColumnsListChange"
      group="columns"
      itemKey="id"
    >
      <template #item="{ element }">
        <CanbanTableColumn :key="element.id" :column="element" />
      </template>
    </draggable>
    <CanbanTableColumn isProtoColumn :column="mockColumn" />
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
