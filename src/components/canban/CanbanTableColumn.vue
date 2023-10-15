<script setup>
import CanbanTableColumnHeader from "./CanbanTableColumnHeader.vue"
import CanbanTableColumnList from "./CanbanTableColumnList.vue"
defineProps({
  column: {
    type: Object,
    required: true
  }
})
const emit = defineEmits(["onListChange"])
function handleListChange(message) {
  emit("onListChange", message)
}
</script>

<template>
  <section class="column">
    <CanbanTableColumnHeader :title="column.title" />
    <CanbanTableColumnList :tasks="column.tasks" @onListChange="handleListChange"/>
  </section>
</template>

<style scoped>
.column {
  min-width: 235px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
