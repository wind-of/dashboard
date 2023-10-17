<script setup>
import { computed } from "vue"
defineProps({
  task: {
    type: Object,
    required: true
  },
  isOpen: {
    type: Boolean
  }
})
const drawerStyles = computed(() => ({}))
</script>

<template>
	<section class="drawer" :style="drawerStyles"></section>
</template>

<style>

</style>
<style lang="scss" scoped>
.drawer {
  position: absolute;
  width: var(--canban-drawer-width);
  height: calc(100vh - var(--header-height));
  // transform: translateX(min(var(--canban-drawer-width)));

  background: white;
  right: 0;
  top: var(--header-height);
  transition: transform .2s ease-in-out;
}
</style>