<script setup>
import VCanban from "../components/canban/VCanban.vue"
import { project } from "../mock"
</script>

<template>
  <main class="main">
    <VCanban :project="project" />
  </main>
</template>
