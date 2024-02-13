<script setup lang="ts">
import type { Tablet } from "@/types"
import { Column, TabletSignle, TabletList } from "@/types"
import { PERIODS, TIMELINE_TABLET_HEIGHT } from "@/constants"
import {
  useComputedTimelineTabletStyles,
  useComputedTimelineTabletListStyles
} from "@/composables/timeline.tablet.styles"
import { useCssVar } from "@vueuse/core"

useCssVar("--timeline-tablet-height").value = `${TIMELINE_TABLET_HEIGHT}px`

const props = defineProps<{ tablet: Tablet; columns: Column[]; period: PERIODS }>()
const emit = defineEmits(["onTaskSelection"])

function handleSelection(taskId: number, columnId: number) {
  emit("onTaskSelection", taskId, columnId)
}
function getColumnTitle(columnId: number) {
  return props.columns.find(({ id }) => id === columnId)?.title || ""
}
</script>

<template>
  <div
    v-if="!Array.isArray(tablet.task)"
    class="tablet tablet-single"
    :style="useComputedTimelineTabletStyles(tablet as TabletSignle, period)"
    @click="handleSelection(tablet.task.id, tablet.task.columnId)"
    :title="`${tablet.task.title} [${getColumnTitle(tablet.task.columnId)}]`"
  >
    {{ tablet.task.title }}
    <sub class="column-title">[{{ getColumnTitle(tablet.task.columnId) }}]</sub>
  </div>
  <div
    v-else
    class="tablet tablet-list"
    :style="useComputedTimelineTabletListStyles(tablet as TabletList)"
    @click="console.log(tablet.task)"
    title="List of tasks"
  >
    List of tasks
  </div>
</template>

<style scoped lang="scss">
.tablet {
  position: absolute;
  @include flex-row;
  align-items: center;
  height: var(--timeline-tablet-height);
  color: white;
  font-weight: 600;
  cursor: pointer;
  user-select: none;

  transition-property: top, left, width;
  transition-duration: 0.2s;
}
.tablet-list {
  justify-content: center;
  border-radius: 5px;
  background-color: #1ea7ff;
}
.tablet-single {
  padding: 0 16px;
  height: var(--timeline-tablet-height);
  border-radius: 40px;
  background-color: #5051f9;

  .column-title {
    margin-left: 4px;
    color: #e9e9e9;
    font-size: 12px;
  }
}
</style>
