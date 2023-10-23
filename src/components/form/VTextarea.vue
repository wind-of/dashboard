<script setup lang="ts">
import { useVModel } from "@vueuse/core"
const props = defineProps<{ modelValue: string }>()
const emit = defineEmits(["update:modelValue"])
const value = useVModel(props, "modelValue", emit)
</script>

<template>
  <textarea class="textarea" v-model="value" />
</template>

<style lang="scss" scoped>
.textarea {
  @include textarea;
}
</style>
