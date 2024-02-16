<script setup lang="ts">
import LeftNavigation from "@/components/LeftNavigation.vue"
import AppHeader from "@/components/AppHeader.vue"
</script>

<template>
  <div class="wrapper">
    <LeftNavigation />
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
