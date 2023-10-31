<script setup lang="ts">
import { toRaw } from "vue"
import { Task } from "@/types"
import { TIMELINE_TABLET_WIDTH } from "@/constants"
import { randomRGB } from "@/utils"
import { useTasksToLeveledTablets } from "@/composables/tasks.to.levels"

const props = defineProps<{ tasks: Task[] }>()
const levels = useTasksToLeveledTablets(toRaw(props.tasks))

// TODO: фильтрация тасков по месяцу
// TODO: обработка слишком длинных плашек

function computeTabletStyles({ top, left, width }) {
  return {
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`,
    background: randomRGB()
  }
}
const unitStyles = {
  "max-width": `${TIMELINE_TABLET_WIDTH}px`,
  "min-width": `${TIMELINE_TABLET_WIDTH}px`
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
          :style="computeTabletStyles(tablet)"
          :key="tablet.task.id"
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
