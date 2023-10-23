<script setup lang="ts">
import { useVModel } from "@vueuse/core"
const props = defineProps<{ modelValue: string }>()
const emit = defineEmits(["update:modelValue"])
const value = useVModel(props, "modelValue", emit)
</script>

<template>
  <input class="input" type="text" v-model="value" />
</template>

<style lang="scss" scoped>
.input {
  @include input;
}
</style>
