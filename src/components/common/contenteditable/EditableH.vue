<script setup lang="ts">
import { ref, reactive, computed } from "vue"
import { vOnClickOutside } from "@vueuse/components"
import VueContenteditable from "@/components/common/contenteditable/VueContenteditable.vue"
const props = defineProps<{ content: string; tag: string }>()
const emit = defineEmits(["onContentUpdate"])

const state = reactive({ content: props.content })

const elementRef = ref<{ element } | null>()
const isEditable = ref(false)
const contenteditableClass = computed(() => ({ editable: isEditable.value }))
const editedTitle = ref(state.content)

function handleUnfocus() {
  const content = editedTitle.value.trim()
  if (content === state.content) {
    isEditable.value = false
    return
  }
  if (!content) {
    editedTitle.value = state.content
  }
  state.content = content
  isEditable.value = false
  emit("onContentUpdate", state.content)
}
function handleDoubleClick() {
  isEditable.value = true
}
</script>

<template>
  <VueContenteditable
    :tag="tag"
    class="content"
    ref="elementRef"
    :class="contenteditableClass"
    v-model="editedTitle"
    :contenteditable="isEditable"
    :no-nl="true"
    @dblclick="handleDoubleClick"
    @returned="handleUnfocus"
    v-on-click-outside="handleUnfocus"
  />
</template>

<style scoped lang="scss">
.content {
  text-wrap: nowrap;
  outline: none;
  overflow: hidden;
  border: 1px solid transparent;
  border-radius: 3px;
  transition-property: border-color, box-shadow, padding;
  transition-timing-function: ease-out;
  transition-duration: 0.2s;
  &.editable {
    padding: 0 2px;
    border-color: #ccc;
    box-shadow: 0 0 5px 0 rgba(34, 60, 80, 0.2);
  }
}
</style>
