<script setup lang="ts">
import { computed, ref } from "vue"
import { Column } from "@/types"
import { PERIODS, DEFAULT_TIMELINE_TABLET_UNIT_WIDTH } from "@/constants"
import { useTasksToLeveledTablets } from "@/composables/tasks.to.levels"
import { useFilterTasksByPeriod } from "@/composables/filter.tasks.by.period"
import { useCssVar } from "@vueuse/core"
import { computedTimelineUnitStyles, unitsCountInPeriod } from "@/utils/timeline"
import TimelineTableTablet from "@/components/timeline/TimelineTableTablet.vue"

const props = defineProps<{ columns: Column[]; period: PERIODS }>()
const emit = defineEmits(["onTaskSelection"])

const timelineTable = ref()
const timelineUnitsCount = computed(() => unitsCountInPeriod(props.period))
const timelineSectionWidth = computed(() =>
  Math.max(
    DEFAULT_TIMELINE_TABLET_UNIT_WIDTH,
    (timelineTable?.value?.clientWidth - 30 || 0) / timelineUnitsCount.value
  )
)

const levels = computed(() =>
  useTasksToLeveledTablets(
    useFilterTasksByPeriod(props.columns, props.period),
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
    <template v-for="i in unitsCountInPeriod(period)" :key="i">
      <div class="unit" :style="computedTimelineUnitStyles(timelineSectionWidth)">
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
