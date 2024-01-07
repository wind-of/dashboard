<script setup lang="ts">
import LeftDrawer from "~/LeftDrawer.vue"
import AppHeader from "~/AppHeader.vue"
</script>

<template>
  <div class="wrapper">
    <LeftDrawer />
    <section class="content">
      <AppHeader />
      <section class="body">
        <slot></slot>
      </section>
    </section>
  </div>
</template>

<style scoped lang="scss">
.wrapper {
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
