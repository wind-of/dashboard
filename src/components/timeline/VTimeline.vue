<script setup lang="ts">
import TimelineHeader from "~/timeline/TimelineHeader.vue"
import TimelineTable from "~/timeline/TimelineTable.vue"
</script>

<template>
  <section class="timeline">
    <TimelineHeader />
    <TimelineTable />
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
