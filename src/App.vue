<script setup>
import { RouterView } from "vue-router"
import LeftDrawer from "./components/LeftDrawer.vue"
import AppHeader from "./components/AppHeader.vue"
</script>

<template>
  <section class="app">
    <LeftDrawer />
    <section class="content">
      <AppHeader />
      <section class="body">
        <RouterView />
      </section>
    </section>
  </section>
</template>

<style scoped>
.app {
  display: flex;
}
.content {
  width: 100%;
  min-height: 100vh;
}
.body {
  padding: 30px;
  overflow: scroll;
}
</style>
