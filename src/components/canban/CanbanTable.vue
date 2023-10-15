<script setup>
import { computed, reactive } from "vue"
import draggable from "vuedraggable"
import CanbanTableColumn from "./CanbanTableColumn.vue"
const props = defineProps({
  columns: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(["onColumnListChange"])
const columnsList = computed({
  get() {
    return props.columns
  },
  set(updatedColumns) {
    emit("onColumnChange", updatedColumns)
  }
})
function handleColumnListChange(data) {
  emit("onColumnListChange", data)
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
        <CanbanTableColumn :key="columns[index].id" :column="columns[index]" @onListChange="handleColumnListChange({ updatedList: $event, columnId: columns[index].id })"/>
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
