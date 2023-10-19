<script setup>
import { defineModel } from "vue"
const modelValue = defineModel()
</script>

<template>
  <textarea class="textarea" v-model="modelValue" />
</template>

<style lang="scss" scoped>
.textarea {
  @include textarea;
}
</style>
