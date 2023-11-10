<script setup lang="ts">
import { computed } from "vue"
import { Column, TabletSignle, TabletList } from "@/types"
import { TIMELINE_TABLET_SECTION_WIDTH } from "@/constants"
import { useTasksToLeveledTablets } from "@/composables/tasks.to.levels"
import { useFilterTasksByMonth } from "@/composables/filter.tasks.by.month"
import {
  useComputedTimelineTabletStyles,
  useComputedTimelineTabletListStyles
} from "@/composables/timeline.tablet.styles"
import { useCssVar } from "@vueuse/core"

const props = defineProps<{ columns: Column[] }>()
const emit = defineEmits(["onTaskSelection"])

const levels = computed(() => useTasksToLeveledTablets(useFilterTasksByMonth(props.columns)))

useCssVar("--timeline-tablet-section-width").value = TIMELINE_TABLET_SECTION_WIDTH + "px"

const unitStyles = {
  "max-width": `${TIMELINE_TABLET_SECTION_WIDTH}px`,
  "min-width": `${TIMELINE_TABLET_SECTION_WIDTH}px`
}

function handleSelection(taskId: string, columnId: string) {
  emit("onTaskSelection", taskId, columnId)
}
function getColumnTitle(columnId: string) {
  return props.columns.find(({ id }) => id === columnId)?.title || ""
}
</script>

<template>
  <section class="table">
    <template v-for="i in 30" :key="i">
      <div class="unit" :style="unitStyles">
        <h3 class="unit-title">S {{ i }}</h3>
        <div class="unit-body"></div>
      </div>
    </template>
    <div class="blocks-container">
      <template v-for="(tablets, i) in levels" :key="i">
        <template v-for="tablet in tablets" :key="tablet.task.id">
          <div
            v-if="!Array.isArray(tablet.task)"
            class="tablet tablet-single"
            :style="useComputedTimelineTabletStyles(tablet as TabletSignle)"
            @click="handleSelection(tablet.task.id, tablet.task.columnId)"
          >
            {{ tablet.task.title }}
            <sub class="column-title">[{{ getColumnTitle(tablet.task.columnId) }}]</sub>
          </div>
          <div
            v-else
            class="tablet tablet-list"
            :style="useComputedTimelineTabletListStyles(tablet as TabletList)"
            @click="console.log(tablet.task)"
          >
            List of tasks...
          </div>
        </template>
      </template>
    </div>
  </section>
</template>

<style scoped lang="scss">
.table {
  @include flex-row;
  position: relative;
  min-width: 100%;
  height: 100%;
}
.blocks-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 36px;
  left: 0;
  width: var(--timeline-tablet-section-width);
}
.tablet {
  position: absolute;
  @include flex-row;
  align-items: center;
  height: 46px;
}
.tablet,
.tablet-list {
  position: absolute;
  @include flex-row;
  align-items: center;
  height: 46px;
}
.tablet-list {
  justify-content: center;
  background-color: #2cde9a;
  color: white;
  cursor: pointer;
  user-select: none;
  border-radius: 5px;
}
.tablet-single {
  padding: 0 16px;
  height: 46px;

  border-radius: 40px;
  background: grey;
  color: white;
  cursor: pointer;
  font-weight: 600;

  .column-title {
    margin-left: 4px;
    color: #e9e9e9;
    font-size: 12px;
  }
}
.unit {
  @include flex-column;
  align-items: center;
  height: 100%;
  gap: 16px;
}
.unit-body {
  width: 100%;
  height: 100%;
  border-left: 1px solid #ebedf4;
}
.unit:last-child .unit-body {
  border-right: 1px solid #ebedf4;
}
.unit-title {
  color: #768396;
  font-weight: 600;
  font-size: 16px;
}
</style>
