<script setup lang="ts">
import { reactive } from "vue"
import TimelineHeader from "~/timeline/TimelineHeader.vue"
import TimelineTable from "~/timeline/TimelineTable.vue"

import { project as mockProject } from "@/mock"
const tasks = reactive(mockProject.columns.flatMap(({ tasks }) => tasks))
</script>

<template>
  <section class="timeline">
    <TimelineHeader />
    <TimelineTable :tasks="tasks" />
  </section>
</template>

<style scoped lang="scss">
.timeline {
  @include flex-column;
  width: calc(var(--view-width) - var(--view-padding));
  height: calc(var(--view-height) - var(--view-padding));
  overflow: scroll;
  gap: 40px;
}
</style>
