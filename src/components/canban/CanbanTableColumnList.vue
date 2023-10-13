<script setup>
import { reactive } from "vue"
import draggable from "vuedraggable"
import CanbanTableColumnListItem from "./CanbanTableColumnListItem.vue"
const props = defineProps({
  tasks: {
    type: Array, 
    default: () => []
  }
})
const tasks = reactive(props.tasks)
</script>

<template>
  <section class="list">
    <draggable
      class="list-group"
      :list="tasks"
      group="tasks"
      itemKey="id"
    >
      <template #item="{ element: task }">
        <CanbanTableColumnListItem :key="task.id" :task="task" />
      </template>
    </draggable>
  </section>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}
.list-group {
  min-height: 20px;
}
</style>
