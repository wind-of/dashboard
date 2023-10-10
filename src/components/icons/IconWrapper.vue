<script setup>
import { computed } from "vue"
import { LIGHT_THEME } from "@/constants"
const props = defineProps({
  theme: {
    type: String,
    default: LIGHT_THEME
  },
  defaultColor: {
    type: String,
    default: "#5F6388"
  }
})
const fillColor = computed(() => (props.theme === LIGHT_THEME ? props.defaultColor : "white"))
</script>

<template>
  <slot :fillColor="fillColor"></slot>
</template>
