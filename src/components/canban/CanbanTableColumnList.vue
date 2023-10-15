<script setup>
import draggable from "vuedraggable"
import CanbanTableColumnListItem from "./CanbanTableColumnListItem.vue"
import { computed } from "vue"
const props = defineProps({
  tasks: {
    type: Array, 
    default: () => []
  }
})
const emit = defineEmits(["onListChange"])
const tasks = computed({
  get() {
    return props.tasks
  },
  set(updatedTasks) {
    emit("onListChange", updatedTasks)
  }
})
</script>
 
<template>
  <section class="list">
    <draggable
      class="list-group"
      v-model="tasks" 
      group="tasks"
      itemKey="id"
    >
      <template #item="{ index }">
        <CanbanTableColumnListItem :key="tasks[index].id" :task="tasks[index]" />
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
