<script setup>
import { computed } from "vue"
const props = defineProps({
  task: {
    type: Object,
    required: true
  },
  isOpen: {
    type: Boolean,
    default: false
  }
})
const drawerStyles = computed(() => ({
  [props.isOpen && "transform"]: "none"
}))
</script>

<template>
  <section class="drawer" :style="drawerStyles"></section>
</template>

<style></style>
<style lang="scss" scoped>
.drawer {
  position: absolute;
  width: var(--canban-drawer-width);
  height: calc(100vh - var(--header-height));
  transform: translateX(var(--canban-drawer-width));

  background: white;
  top: var(--header-height);
  right: 0;
  transition: transform 0.2s ease-in-out;
}
</style>
