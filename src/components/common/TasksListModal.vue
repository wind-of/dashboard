<script setup lang="ts">
import { computed } from "vue"
import { Task } from "@/types"
import IconClose from "@/components/icons/IconClose.vue"
import { useTimeFormat } from "@/composables/useTimeFormat"

const props = defineProps<{ tasks: Task[] }>()
const emit = defineEmits(["onTaskClick", "onClose"])

const sortedTasks = computed(() =>
  [...props.tasks].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
)

function handleTaskClick(task: Task) {
  emit("onTaskClick", task.id, task.columnId)
}
function handleClose() {
  emit("onClose")
}
</script>

<template>
  <div class="wrapper">
    <section class="home-tasks">
      <div class="close-button" @click="handleClose"><IconClose class="icon" /></div>
      <h2>Tasks</h2>
      <section class="tasks">
        <div class="task" v-for="task in sortedTasks" :key="task.id" @click="handleTaskClick(task)">
          <section class="task-content">
            <h3 class="task-title">{{ task.title }}</h3>
            <p class="task-description">{{ task.shortDescription || "(No description)" }}</p>
          </section>
          <p>
            <span class="time"
              >[ {{ useTimeFormat({ date: task.startDate, isDetailed: true }) }} ]</span
            >
            —
            <span class="time"
              >[ {{ useTimeFormat({ date: task.expirationDate, isDetailed: true }) }} ]</span
            >
          </p>
        </div>
      </section>
    </section>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  @include flex-row;
  justify-content: space-around;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2;
}
.home-tasks {
  position: relative;
  padding: 20px;
  width: 60%;
  height: 50%;
  max-width: 870px;
  min-width: 320px;
  max-height: 600px;
  min-height: 300px;
  background-color: white;
  border-radius: 10px;
  @include flex-column;
  gap: 20px;
  overflow: scroll;
  .close-button {
    position: absolute;
    top: 20px;
    right: 20px;
    scale: 0.75;
    cursor: pointer;
  }
}
.tasks {
  @include flex-row;
  flex-wrap: wrap;
  align-items: center;
  width: 100%;
  padding: 15px;
  gap: 20px;
}
.task {
  @include flex-column;
  justify-content: space-between;
  flex-grow: 1;
  max-width: 350px;
  min-width: 250px;
  min-height: 150px;
  overflow: hidden;
  padding: 15px;
  border-radius: 15px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
  transition: box-shadow 0.2s ease-out;
  cursor: pointer;
  &-title,
  &-description {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &-description {
    color: #aaa;
  }

  .time {
    font-size: 12px;
    color: #666;
  }
}
</style>
@/composables/useTimeFormat
