<script setup lang="ts">
import { computed } from "vue"
import { Column } from "@/types"
import { PERIODS, TIMELINE_TABLET_SECTION_WIDTH } from "@/constants"
import { useTasksToLeveledTablets } from "@/composables/tasks.to.levels"
import { useFilterTasksByPeriod } from "@/composables/filter.tasks.by.month"
import { useCssVar } from "@vueuse/core"
import { timelineUnitStyles, unitsCountInPeriod } from "@/utils/timeline"
import TimelineTableTablet from "~/timeline/TimelineTableTablet.vue"

const props = defineProps<{ columns: Column[]; period: PERIODS }>()
const emit = defineEmits(["onTaskSelection"])

// TODO: возможность менять TIMELINE_TABLET_SECTION_WIDTH

const levels = computed(() =>
  useTasksToLeveledTablets(useFilterTasksByPeriod(props.columns, props.period), props.period)
)

useCssVar("--timeline-tablet-section-width").value = TIMELINE_TABLET_SECTION_WIDTH + "px"

function handleSelection(taskId: string, columnId: string) {
  emit("onTaskSelection", taskId, columnId)
}
</script>

<template>
  <section class="table">
    <template v-for="i in unitsCountInPeriod(period)" :key="i">
      <div class="unit" :style="timelineUnitStyles">
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
