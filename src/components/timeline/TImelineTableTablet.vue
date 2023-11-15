<script setup lang="ts">
import type { Tablet } from "@/types"
import { Column, TabletSignle, TabletList } from "@/types"
import { PERIODS } from "@/constants"
import {
  useComputedTimelineTabletStyles,
  useComputedTimelineTabletListStyles
} from "@/composables/timeline.tablet.styles"

const props = defineProps<{ tablet: Tablet; columns: Column[]; period: PERIODS }>()
const emit = defineEmits(["onTaskSelection"])

function handleSelection(taskId: string, columnId: string) {
  emit("onTaskSelection", taskId, columnId)
}
function getColumnTitle(columnId: string) {
  return props.columns.find(({ id }) => id === columnId)?.title || ""
}
</script>

<template>
  <div
    v-if="!Array.isArray(tablet.task)"
    class="tablet tablet-single"
    :style="useComputedTimelineTabletStyles(tablet as TabletSignle, period)"
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

<style scoped lang="scss">
.tablet {
  position: absolute;
  @include flex-row;
  align-items: center;
  height: 46px;
  color: white;
  font-weight: 600;
  cursor: pointer;
  user-select: none;
}
.tablet-list {
  justify-content: center;
  border-radius: 5px;
}
.tablet-single {
  padding: 0 16px;
  height: 46px;
  border-radius: 40px;

  .column-title {
    margin-left: 4px;
    color: #e9e9e9;
    font-size: 12px;
  }
}
</style>
