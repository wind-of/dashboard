<script setup lang="ts">
import { computed } from "vue"
const props = defineProps<{ isPrimary?: boolean; isDanger?: boolean }>()

const classList = computed(() => {
  return [props.isPrimary && "primary-button-class", props.isDanger && "danger-button-class"]
})
</script>

<template>
  <button :class="classList"><slot /></button>
</template>

<style lang="scss">
button {
  transition-property: opacity;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;
}
button[disabled] {
  opacity: 0.5;
  cursor: not-allowed;
}
.primary-button-class {
  border: none;
  color: var(--white);
  background-color: var(--blue);
}
.danger-button-class {
  color: var(--red);
  border-color: var(--red);
  &:hover {
    background-color: var(--red);
    color: var(--white);
  }
}
</style>
