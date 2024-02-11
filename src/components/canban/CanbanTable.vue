<script setup lang="ts">
import { computed, inject } from "vue"
import draggable from "vuedraggable"
import type { Column } from "@/types"
import CanbanTableColumn from "@/components/canban/CanbanTableColumn.vue"
import { mockColumn } from "@/mock"
import { draggingColumnDataDefaults } from "@/components/canban/helpers"

const props = defineProps<{ columns: Column[] }>()
const columnDragData = inject("draggingColumnData", draggingColumnDataDefaults)
const columnsList = computed({
  get() {
    return [...props.columns].sort((a, b) => (b.lexorank <= a.lexorank ? 1 : -1))
  },
  set() {}
})

function handleChange({ moved, added, removed }) {
  columnDragData.update(moved || added || removed)
}
function handleMove(event) {
  columnDragData.update({ shouldInsertAfter: event.willInsertAfter })
}
</script>

<template>
  <section class="wrapper">
    <draggable
      class="columns"
      v-model="columnsList"
      @change="handleChange"
      @move="handleMove"
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
