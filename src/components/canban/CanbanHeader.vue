<script setup lang="ts">
import EditableH from "@/components/common/contenteditable/EditableH.vue"
withDefaults(defineProps<{ title: string }>(), { title: "Project" })
const emit = defineEmits(["onProjectTitleChange"])

function handleUnfocus(updatedContent: string) {
  emit("onProjectTitleChange", updatedContent)
}
</script>

<template>
  <header class="header">
    <EditableH tag="h1" :content="title" @onContentUpdate="handleUnfocus" class="title" />
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
}
.title {
  font-size: 30px;
  font-weight: 500;
}
</style>
