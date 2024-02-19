<script setup lang="ts">
import VInput from "@/components/form/VInput.vue"
import VTextarea from "@/components/form/VTextarea.vue"
import { defineModel } from "vue"
const props = defineProps<{
  label: string
  isTextarea?: boolean
  error?: string
}>()
const modelValue = defineModel<string>()
const component = props.isTextarea ? VTextarea : VInput
</script>

<template>
  <section class="input-block">
    <label class="input-label">
      <p class="input-title">{{ label }}</p>
      <component :is="component" v-model="modelValue" v-bind="$attrs" />
      <p class="input-error-text">{{ error }}</p>
      <slot></slot>
    </label>
  </section>
</template>

<style scoped lang="scss">
.input-label {
  @include flex-column;
  font-size: 16px;
  gap: 5px;
}
.input-title {
  padding-right: 10px;
}
.input-error-text {
  color: red;
}
</style>
