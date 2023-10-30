<script setup lang="ts">
import { toRaw } from "vue"
import { Task } from "@/types"

const unitWidth = 120
const hoursPerDay = 24
const dateProportion = unitWidth / hoursPerDay
const unitHeight = 46

const props = defineProps<{ tasks: Task[] }>()
const meow = toRaw(props.tasks).sort((a, b) => +a.startDate - +b.startDate)
const levels: { width: number; left: number; top: number; task: Task }[][] = []

for (let i = 0, mew = meow[i]; i < meow.length; mew = meow[++i]) {
  let clevelIndex = 0
  // eslint-disable-next-line no-constant-condition
  while (true) {
    if (!levels[clevelIndex]) {
      levels.push([])
    }
    let currentLevel = levels[clevelIndex]
    const { startDate: start, expirationDate: end } = mew
    const previousMew = currentLevel.findLast(({ task }) => task.startDate <= start)
    const newKek = { task: mew, top: levelToTopOffset(clevelIndex), ...dateToWidth(start, end) }
    if (
      !previousMew ||
      previousMew.left + previousMew.width <= newKek.left ||
      newKek.left + newKek.width <= previousMew.left
    ) {
      currentLevel.push(newKek)
      break
    }
    clevelIndex++
  }
}

// TODO: фильтрация тасков по месяцу
// TODO: обработка слишком длинных плашек
// TODO: отрефакторить здесь всё

function levelToTopOffset(levelIndex: number) {
  return levelIndex * unitHeight
}
function dateToWidth(start: Date, end: Date) {
  const width = ((+end - +start) / 3600000) * dateProportion
  const monthStart = new Date(`${start.getFullYear()}.${start.getMonth() + 1}.1`)
  const left = ((+start - +monthStart) / 3600000) * dateProportion
  return { width, left }
}

console.log(levels)

function random_rgba() {
  var o = Math.round,
    r = Math.random,
    s = 255
  return "rgb(" + o(r() * s) + "," + o(r() * s) + "," + o(r() * s) + ")"
}
function toPixels({ top, left, width }) {
  return { left: `${left}px`, top: `${top}px`, width: `${width}px`, background: random_rgba() }
}
</script>

<template>
  <section class="table">
    <div class="unit" v-for="i in 30" :key="i">
      <h3 class="unit-title">S{{ i }}</h3>
      <div class="unit-body"></div>
    </div>
    <div class="blocks-container">
      <template v-for="(level, i) in levels" :key="i">
        <div class="block" v-for="block in level" :style="toPixels(block)" :key="block.task.id">
          {{ block.task.startDate }} - {{ block.task.expirationDate }}
        </div>
      </template>
      <div class="block"></div>
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
.block {
  position: absolute;
  margin-top: 36px;
  height: 46px;
  border-radius: 40px;
  background: grey;
}
.unit {
  @include flex-column;
  align-items: center;
  max-width: 120px;
  min-width: 120px;
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
