<script setup lang="ts">
import { reactive } from "vue"
import type { Project } from "@/types"
import TimelineHeader from "~/timeline/TimelineHeader.vue"
import TimelineTable from "~/timeline/TimelineTable.vue"
import TaskDrawer from "~/TaskDrawer.vue"
import { useTaskDrawer } from "@/composables/task.drawer"
import { project as project_ } from "@/mock"

const project: Project = reactive(project_)
const {
  handleTaskChange,
  handleTaskChangeCancel,
  handleTaskDelete,
  handleTaskSelection,
  isDrawerOpen,
  selected
} = useTaskDrawer(project)
</script>

<template>
  <section class="timeline">
    <TimelineHeader />
    <TimelineTable :columns="project.columns" @onTaskSelection="handleTaskSelection" />
    <Teleport to="body">
      <TaskDrawer
        :task="selected.task"
        :columnId="selected.columnId"
        :isOpen="isDrawerOpen"
        @onCommitChanges="handleTaskChange"
        @onCancelChanges="handleTaskChangeCancel"
        @onTaskDelete="handleTaskDelete"
      />
    </Teleport>
  </section>
</template>

<style scoped lang="scss">
.timeline {
  @include flex-column;
  width: calc(var(--view-width) - var(--view-padding));
  height: calc(var(--view-height) - var(--view-padding));
  overflow: scroll;
  gap: 40px;
}
</style>
