<script setup>
import { computed } from "vue"
import VInput from "../form/VInput.vue"
import VTextarea from "../form/VTextarea.vue"

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
  <section class="drawer" :style="drawerStyles">
    <header class="header">
      <h2 class="header-title">Task Modification</h2>
    </header>
    <form class="form">
      <section class="input-block">
        <label class="input-label">
          <p class="input-title">Title</p>
          <VInput />
        </label>
      </section>
      <section class="input-block">
        <label class="input-label">
          <p class="input-title">Description</p>
          <VTextarea />
        </label>
      </section>
    </form>
  </section>
</template>

<style></style>
<style lang="scss" scoped>
.drawer {
  @include flex-column;
  gap: 30px;

  position: absolute;
  width: var(--canban-drawer-width);
  height: calc(100vh - var(--header-height));
  transform: translateX(var(--canban-drawer-width));
  box-shadow: -5px 0px 10px 0px rgba(34, 60, 80, 0.05);
  background: white;

  top: var(--header-height);
  right: 0;
  padding: 20px;
  transition: transform 0.2s ease-out;
}
.header-title {
  font-size: 28px;
}
.form {
  @include flex-column;
  gap: 20px;
}
.input-label {
  @include flex-column;
  font-size: 16px;
  gap: 5px;
}
.input-title {
  padding-right: 10px;
}
</style>
