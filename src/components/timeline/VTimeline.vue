<script setup lang="ts">
import { ref, computed } from "vue"
import type { Project } from "@/types"
import TimelineHeader from "@/components/timeline/TimelineHeader.vue"
import TimelineTable from "@/components/timeline/TimelineTable.vue"
import TaskDrawer from "@/components/TaskDrawer.vue"
import { useTaskDrawer } from "@/composables/task.drawer"
import { useProjectStore } from "@/stores/project"
import { DEFAULT_PERIOD, PERIODS } from "@/constants"
import { useTagsStore } from "@/stores/tags"

const projectStore = useProjectStore()
const tagsStore = useTagsStore()
const project = computed(() => projectStore.project as Project)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const columnsWithoutTasks = computed(() => project.value.columns.map(({ tasks, ...rest }) => rest))
const {
  handleTaskChange,
  handleTaskChangeCancel,
  handleTaskDelete,
  handleTaskSelection,
  isDrawerOpen,
  selected
} = useTaskDrawer(project.value)

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
        :tags="tagsStore.tags"
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
