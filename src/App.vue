<script setup lang="ts">
import { RouterView } from "vue-router"
</script>

<template>
  <section class="app">
    <RouterView />
  </section>
</template>

<style scoped lang="scss">
.app {
  display: flex;
}
.content {
  width: var(--view-width);
  min-height: 100vh;
}
.body {
  overflow: hidden;
  height: calc(100vh - var(--header-height));
  width: calc(100vw - var(--navigation-width));
  padding: var(--view-padding);
}
</style>
