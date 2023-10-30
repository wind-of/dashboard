<script setup lang="ts">
withDefaults(defineProps<{ title?: string }>(), { title: "Timeline" })
</script>

<template>
  <header class="header">
    <h1 class="title">{{ title }}</h1>
    <div class="table-format" tabindex="0">Month</div>
  </header>
</template>

<style scoped lang="scss">
.title {
  font-size: 30px;
  font-weight: 500;
}
.header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 150px;
}
.table-format {
  padding: 5px 20px;
  justify-self: flex-start;

  font-size: 14px;
  color: var(--blue);
  border: 1px solid var(--blue);
  border-radius: 18px;
  cursor: pointer;
  outline: none;

  transition-property: color, background;
  transition-duration: 0.15s;
  &:hover,
  &:active,
  &:focus {
    background: var(--blue);
    color: var(--white);
  }
}
</style>
