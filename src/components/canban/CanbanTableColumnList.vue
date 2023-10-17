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
  <draggable
    class="list-group"
    v-model="tasks" 
    group="tasks"
    itemKey="id"
  >
    <template #item="{ element }">
      <CanbanTableColumnListItem :key="element.id" :task="element" />
    </template>
  </draggable>
</template>

<style scoped>
.list-group {
  min-height: 20px;
  display: flex;
  flex-direction: column;
  gap: 14px;
}
</style>
