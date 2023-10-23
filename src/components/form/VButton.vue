<script setup lang="ts">
import { computed } from "vue"
const props = defineProps<{ isPrimary?: boolean }>()
const primaryClass = computed(() => (props.isPrimary ? "primary-button-class" : ""))
</script>

<template>
  <button :class="primaryClass"><slot /></button>
</template>

<style>
.primary-button-class {
  border: none;
  background-color: var(--blue);
  color: white;
}
</style>
