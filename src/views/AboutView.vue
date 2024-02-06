<script setup lang="ts">
import ViewWrapper from "@/components/ViewWrapper.vue"
</script>

<template>
  <ViewWrapper>
    <main class="about-wrapper">
      <h1>This is an about page</h1>
    </main>
  </ViewWrapper>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
