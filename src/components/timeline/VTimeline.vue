<script setup lang="ts">
import { reactive, ref, computed } from "vue"
import type { Project } from "@/types"
import TimelineHeader from "~/timeline/TimelineHeader.vue"
import TimelineTable from "~/timeline/TimelineTable.vue"
import TaskDrawer from "~/TaskDrawer.vue"
import { useTaskDrawer } from "@/composables/task.drawer"
import { project as project_ } from "@/mock"
import { DEFAULT_PERIOD, PERIODS } from "@/constants"

const project: Project = reactive(project_)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const columnsWithoutTasks = computed(() => project.columns.map(({ tasks, ...rest }) => rest))
const {
  handleTaskChange,
  handleTaskChangeCancel,
  handleTaskDelete,
  handleTaskSelection,
  isDrawerOpen,
  selected
} = useTaskDrawer(project)

const currentPeriod = ref(DEFAULT_PERIOD)
function handlePeriodUpdate(period: PERIODS) {
  currentPeriod.value = period
}
</script>

<template>
  <section class="timeline">
    <TimelineHeader :activePeriod="currentPeriod" @onActivePeriodUpdate="handlePeriodUpdate" />
    <TimelineTable
      :columns="project.columns"
      :period="currentPeriod"
      @onTaskSelection="handleTaskSelection"
    />
    <Teleport to="body">
      <TaskDrawer
        :task="selected.task"
        :columnId="selected.columnId"
        :isOpen="isDrawerOpen"
        :columns="columnsWithoutTasks"
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
