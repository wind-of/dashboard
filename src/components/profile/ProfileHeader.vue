<script setup lang="ts">
import VAvatar from "@/components/common/VAvatar.vue"
withDefaults(defineProps<{ avatar?: string }>(), {
  avatar: ""
})
</script>

<template>
  <header class="header">
    <VAvatar :image="avatar" />
    <h1>Settings</h1>
  </header>
</template>
