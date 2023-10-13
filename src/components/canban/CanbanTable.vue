<script setup>
import { reactive } from "vue"
import draggable from "vuedraggable"
import CanbanTableColumn from "./CanbanTableColumn.vue"
const props = defineProps({
  columns: {
    type: Array,
    default: () => []
  }
})
const columns = reactive(props.columns)
</script>

<template>
  <section class="wrapper">
    <draggable
      class="columns"
      :list="columns"
      group="columns"
      itemKey="id"
    >
      <template #item="{ element: column }">
        <CanbanTableColumn :key="column.id" :column="column" />
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
