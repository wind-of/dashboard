<script setup>
import { RouterView } from 'vue-router'
import LeftDrawer from './components/LeftDrawer.vue';
</script>

<template>
  <section class="app">
    <LeftDrawer/>
    <section class="content">
      <header class="header">
        
      </header>
      <main>
        <RouterView />
      </main>
    </section>
  </section>
</template>

<style scoped>

</style>
