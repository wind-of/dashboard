<script setup>
import { computed, toRefs } from "vue"
import { DARK_THEME, LIGHT_THEME } from "@/constants"
const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  }
})
const { isActive } = toRefs(props)
const theme = computed(() => (isActive.value ? DARK_THEME : LIGHT_THEME))
</script>

<template>
  <div class="wrapper" :class="isActive ? 'active-icon-class' : ''">
    <slot :theme="theme"></slot>
  </div>
</template>

<style>
.active-icon-class {
  background-color: var(--blue);
}
</style>
<style scoped>
.wrapper {
  width: 40px;
  height: 40px;
  border-radius: 10px;

  display: flex;
  align-items: center;
  justify-content: space-around;

  cursor: pointer;
  transition: background-color 0.2s;
}
</style>
