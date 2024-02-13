<script setup lang="ts">
defineProps<{
  defaultTitle: string
  disabled?: boolean
}>()
const modelValue = defineModel()
</script>

<template>
  <select class="select" v-model="modelValue" :disabled="disabled">
    <option value="" selected disabled hidden>{{ defaultTitle }}</option>
    <slot />
  </select>
</template>

<style scoped lang="scss">
.select {
  max-width: 150px;
  align-self: flex-start;
  padding: 10px 6em 10px 10px;
  border: 1px solid #eee;
  color: #777;
  border-radius: 0.25rem;
  outline: none;
}
</style>
