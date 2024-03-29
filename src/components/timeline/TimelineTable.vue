<script setup lang="ts">
import { computed, ref } from "vue"
import { useCssVar } from "@vueuse/core"
import TimelineTableTablet from "@/components/timeline/TimelineTableTablet.vue"
import { Column } from "@/types"
import { PERIODS, DEFAULT_TIMELINE_TABLET_UNIT_WIDTH } from "@/constants"
import { useTasksToLeveledTablets } from "@/composables/useTasksToLeveledTablets"
import { useFilterTasksByPeriod } from "@/composables/useFilterTasksByPeriod"
import { getTimelineUnitStyles, getUnitsCountInPeriod, computeLineOffset } from "@/utils/timeline"

const props = defineProps<{ columns: Column[]; period: PERIODS }>()
const emit = defineEmits(["onTaskSelection"])

const timelineTable = ref()
const timelineUnitsCount = computed(() => getUnitsCountInPeriod(props.period))
const timelineSectionWidth = computed(() =>
  Math.max(
    DEFAULT_TIMELINE_TABLET_UNIT_WIDTH,
    (timelineTable?.value?.clientWidth - 30 || 0) / timelineUnitsCount.value
  )
)

const levels = computed(() =>
  useTasksToLeveledTablets(
    useFilterTasksByPeriod(props.columns, props.period).flatMap(({ tasks }) => tasks),
    props.period,
    timelineSectionWidth.value
  )
)

useCssVar("--timeline-tablet-section-width").value = timelineSectionWidth.value + "px"

function handleSelection(taskId: number, columnId: number) {
  emit("onTaskSelection", taskId, columnId)
}
</script>

<template>
  <section class="table" ref="timelineTable">
    <div
      class="line"
      :style="computeLineOffset(period, timelineUnitsCount, timelineSectionWidth)"
    />
    <template v-for="i in getUnitsCountInPeriod(period)" :key="i">
      <div class="unit" :style="getTimelineUnitStyles(timelineSectionWidth)">
        <h3 class="unit-title">{{ i }}</h3>
        <div class="unit-body"></div>
      </div>
    </template>
    <div class="blocks-container">
      <template v-for="(tablets, i) in levels" :key="i">
        <template v-for="tablet in tablets" :key="tablet.task.id || tablet.task[0].id">
          <TimelineTableTablet
            :columns="columns"
            :tablet="tablet"
            :period="period"
            @onTaskSelection="handleSelection"
          />
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
  overflow-y: hidden;
}
.line {
  position: absolute;
  user-select: none;
  top: 8px;
  bottom: 0;
  width: 2px;
  height: 100%;
  z-index: 2;
  background-color: red;
  &::after {
    content: "";
    margin-left: -5px;
    border: 6px solid transparent;
    border-top: 8px solid red;
  }
}
.blocks-container {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 36px;
  left: 0;
  width: var(--timeline-tablet-section-width);
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
