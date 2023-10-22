<script setup lang="ts">
withDefaults(defineProps<{ title: string }>(), { title: "Tasks" })
</script>

<template>
  <header class="header">
    <h1 class="title">{{ title }}</h1>
  </header>
</template>

<style scoped>
.title {
  font-size: 30px;
  font-weight: 500;
}
.header {
  display: flex;
  justify-content: space-between;
}
</style>
