<script setup lang="ts">
import { ref, reactive, computed } from "vue"
import { vOnClickOutside } from "@vueuse/components"
import VueContenteditable from "@/components/common/contenteditable/VueContenteditable.vue"
import IconOptions from "~/icons/IconOptions.vue"
import IconPlus from "~/icons/IconPlus.vue"

const props = defineProps({
  title: {
    type: String,
    default: "Column Header"
  }
})
const emit = defineEmits(["onCreateTask", "onDeleteColumn", "onColumnTitleChange"])
const state = reactive({ title: props.title })

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

const columnTitle = ref<{ element } | null>()
const isEditable = ref(false)
const contenteditableClass = computed(() => ({ editable: isEditable.value }))
const editedTitle = ref(state.title)

function handleUnfocus() {
  const title = editedTitle.value.trim()
  if (title === state.title) {
    return
  }
  if (!title) {
    editedTitle.value = state.title
  }
  state.title = title
  isEditable.value = false
  emit("onColumnTitleChange", state.title)
}
function handleDoubleClick() {
  isEditable.value = true
  columnTitle.value?.element.focus()
}
</script>

<template>
  <header class="header">
    <VueContenteditable
      tag="h3"
      class="title"
      ref="columnTitle"
      :class="contenteditableClass"
      v-model="editedTitle"
      :contenteditable="isEditable"
      :no-nl="true"
      @dblclick="handleDoubleClick"
      @returned="handleUnfocus"
      v-on-click-outside="handleUnfocus"
    />
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
  padding: 0 5px;
  font-size: 16px;
  max-width: 100px;
  text-wrap: nowrap;
  outline: none;
  overflow: hidden;
  border: 1px solid transparent;
  border-radius: 3px;
  transition-property: border-color, box-shadow;
  transition-timing-function: ease-out;
  transition-duration: 0.2s;
  &.editable {
    border-color: #ccc;
    box-shadow: 0 0 5px 0 rgba(34, 60, 80, 0.2);
  }
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
