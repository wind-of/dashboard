<script setup lang="ts">
import IconArrowDown from "@/components/icons/IconArrowDown.vue"
defineEmits(["onDropdownClick"])
withDefaults(defineProps<{ withDropdown?: boolean; image?: string }>(), {
  withDropdown: false,
  image: ""
})
</script>

<template>
  <section class="user-profile">
    <div class="profile" :style="`background-image: url(${image})`" />
    <i v-if="withDropdown" class="dropdown" @click="$emit('onDropdownClick')"><IconArrowDown /></i>
  </section>
</template>

<style scoped>
.user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
}
.profile {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background: #ccc;
}
.dropdown,
.profile {
  cursor: pointer;
}
</style>
