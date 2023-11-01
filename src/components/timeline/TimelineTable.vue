<script setup lang="ts">
import { computed } from "vue"
import { Column } from "@/types"
import { TIMELINE_TABLET_WIDTH } from "@/constants"
import { useTasksToLeveledTablets } from "@/composables/tasks.to.levels"
import { useFilterTasksByMonth } from "@/composables/filter.tasks.by.month"
import { useComputedTimelineTabletStyles } from "@/composables/timeline.tablet.styles"

const props = defineProps<{ columns: Column[] }>()
const emit = defineEmits(["onTaskSelection"])

const levels = computed(() => useTasksToLeveledTablets(useFilterTasksByMonth(props.columns)))

const unitStyles = {
  "max-width": `${TIMELINE_TABLET_WIDTH}px`,
  "min-width": `${TIMELINE_TABLET_WIDTH}px`
}

function handleSelection(taskId: string, columnId: string) {
  emit("onTaskSelection", taskId, columnId)
}
</script>

<template>
  <section class="table">
    <template v-for="i in 30" :key="i">
      <div class="unit" :style="unitStyles">
        <h3 class="unit-title">S{{ i }}</h3>
        <div class="unit-body"></div>
      </div>
    </template>
    <div class="blocks-container">
      <template v-for="(tablets, i) in levels" :key="i">
        <div
          class="tablet"
          v-for="tablet in tablets"
          :style="useComputedTimelineTabletStyles(tablet)"
          :key="tablet.task.id"
          @click="handleSelection(tablet.task.id, tablet.task.columnId)"
        >
          {{ tablet.task.startDate }} - {{ tablet.task.expirationDate }}
        </div>
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
  top: 0;
  left: 0;
}
.tablet {
  position: absolute;
  margin-top: 36px;
  height: 46px;
  border-radius: 40px;
  background: grey;
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
