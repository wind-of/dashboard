<script setup lang="ts">
import AuthBanner from "~/auth/AuthBanner.vue"
</script>

<template>
  <section class="auth">
    <AuthBanner />
    <RouterView />
  </section>
</template>

<style scoped lang="scss">
.auth {
  @include flex-row;
  width: 100vw;
  height: 100vh;
  > * {
    width: 50vw;
    height: 100vh;
  }
}
</style>
