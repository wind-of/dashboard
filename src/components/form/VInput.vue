<script setup>
import { defineModel } from "vue"
const modelValue = defineModel()
</script>

<template>
  <input class="input" type="text" v-model="modelValue" />
</template>

<style lang="scss" scoped>
.input {
  @include input;
}
</style>
