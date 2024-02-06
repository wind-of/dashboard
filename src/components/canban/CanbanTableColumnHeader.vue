<script setup lang="ts">
import { ref } from "vue"
import { vOnClickOutside } from "@vueuse/components"
import IconOptions from "@/components/icons/IconOptions.vue"
import IconPlus from "@/components/icons/IconPlus.vue"
import EditableH from "../common/contenteditable/EditableH.vue"

defineProps({
  title: {
    type: String,
    default: "Column Header"
  }
})
const emit = defineEmits(["onCreateTask", "onDeleteColumn", "onColumnTitleChange"])

const isOptionsOpened = ref(false)

function handleOptionsClick() {
  isOptionsOpened.value = !isOptionsOpened.value
}
function closeOptions() {
  isOptionsOpened.value = false
}
function handleColumnDeletion() {
  closeOptions()
  emit("onDeleteColumn")
}

function handleUnfocus(updatedContent: string) {
  emit("onColumnTitleChange", updatedContent)
}
</script>

<template>
  <header class="header">
    <EditableH tag="h3" class="title" :content="title" @onContentUpdate="handleUnfocus" />
    <section class="settings">
      <i class="options-icon" @click="handleOptionsClick">
        <IconOptions />
        <ul class="options" v-if="isOptionsOpened" v-on-click-outside="closeOptions">
          <li class="delete-option" @click.stop="handleColumnDeletion">Delete</li>
        </ul>
      </i>
      <i class="add-icon" @click="emit('onCreateTask')"><IconPlus /></i>
    </section>
  </header>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 16px;
  border-radius: 10px;
  background: var(--vt-c-white);
}
.title {
  font-size: 16px;
  max-width: 100px;
}
.settings {
  display: flex;
  align-items: center;
  gap: 14px;
}
.settings > i {
  position: relative;
  cursor: pointer;
}
.options-icon {
  margin-top: -6px;
}
.add-icon {
  padding: 3px 10px;
  border-radius: 10px;
  background-color: var(--blue-soft);
}

.options {
  @include flex-column;
  position: absolute;
  left: -15px;
  top: 30px;
  background: white;
  box-shadow: 0px 0px 5px 0px rgba(34, 60, 80, 0.2);
  > li {
    min-width: 80px;
    padding: 5px 5px;
    text-align: center;
    &:not(:first-child) {
      border-top: 1px solid var(--blue-soft);
    }
  }
}
</style>
