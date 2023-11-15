<script setup lang="ts">
import { DEFAULT_PERIOD, PERIODS } from "@/constants"
const props = withDefaults(defineProps<{ title?: string; activePeriod?: PERIODS }>(), {
  title: "Timeline",
  activePeriod: DEFAULT_PERIOD
})
const emit = defineEmits(["onActivePeriodUpdate"])

function handlePeriodUpdate(period: PERIODS) {
  if (period === props.activePeriod) {
    return
  }
  emit("onActivePeriodUpdate", period)
}
</script>

<template>
  <header class="header">
    <h1 class="title">{{ title }}</h1>
    <div class="periods">
      <button
        v-for="period in PERIODS"
        :key="period"
        class="period"
        :class="{ active: period === activePeriod }"
        @click="handlePeriodUpdate(period)"
      >
        {{ period }}
      </button>
    </div>
  </header>
</template>

<style scoped lang="scss">
.title {
  font-size: 30px;
  font-weight: 500;
}
.header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 150px;
}
.periods {
  @include flex-row;
  gap: 10px;
}
.period {
  padding: 5px 20px;
  justify-self: flex-start;

  font-size: 14px;
  font-weight: 400;
  color: var(--blue);
  border: 1px solid var(--blue);
  border-radius: 18px;
  cursor: pointer;
  outline: none;

  transition-property: color, background;
  transition-duration: 0.15s;
  &:hover,
  &:active,
  &.active {
    background: var(--blue);
    color: var(--white);
  }
}
</style>
