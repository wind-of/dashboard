<script setup lang="ts">
import { computed } from "vue"
import { Column } from "@/types"
import { TIMELINE_TABLET_SECTION_WIDTH } from "@/constants"
import { useTasksToLeveledTablets } from "@/composables/tasks.to.levels"
import { useFilterTasksByMonth } from "@/composables/filter.tasks.by.month"
import { useCssVar } from "@vueuse/core"
import TImelineTableTablet from "./TImelineTableTablet.vue"

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
        <template v-for="tablet in tablets" :key="tablet.task.id || tablet.task[0].id">
          <TImelineTableTablet
            :columns="columns"
            :tablet="tablet"
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
