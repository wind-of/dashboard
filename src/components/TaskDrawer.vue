<script setup lang="ts">
import { computed, reactive, toRaw } from "vue"
import VInput from "~/form/VInput.vue"
import VTextarea from "~/form/VTextarea.vue"
import VButton from "~/form/VButton.vue"
import { useCopyReactive } from "@/composables/copy.reactive"
import { useTimeFormat } from "@/composables/format.time"
import { Tag, Task } from "@/types"
import { TAGS } from "@/constants"

const props = defineProps<{ task: Task; columnId: string; isOpen: boolean }>()
const emit = defineEmits(["onCommitChanges", "onCancelChanges", "onTaskDelete"])

const drawerStyles = computed(() => ({
  [props.isOpen ? "transform" : ""]: "none"
}))

const form = computed(() => ({ state: reactive(useCopyReactive(props.task)) }))
const state = computed(() => form.value.state)

function handleCommitChanges() {
  emit("onCommitChanges", useCopyReactive(state.value))
}
function handleCancel() {
  emit("onCancelChanges")
}
function handleDelete() {
  emit("onTaskDelete")
}

function isActiveTag(tagId: string) {
  return state.value.tags.some(({ id }) => id === tagId)
}
function computeTagStyles(backgroundColor: string, tagId: string) {
  return {
    "background-color": backgroundColor,
    "--active-tag-scale": Number(isActiveTag(tagId))
  }
}
function handleTagClick(tag: Tag) {
  if (isActiveTag(tag.id)) {
    state.value.tags = toRaw(state.value.tags).filter(({ id }) => id !== tag.id)
    return
  }
  state.value.tags.push(tag)
}
</script>

<template>
  <section class="drawer" :style="drawerStyles">
    <header class="header">
      <h2 class="header-title">Task</h2>
    </header>
    <form class="form" @submit.prevent>
      <section class="tags">
        <div
          class="tag"
          v-for="tag in TAGS"
          :key="tag.id"
          :style="computeTagStyles(tag.color, tag.id)"
          @click="handleTagClick(tag)"
        >
          {{ tag.title }}
        </div>
      </section>
      <section class="input-block">
        <label class="input-label">
          <p class="input-title">Title</p>
          <VInput v-model="state.title" />
        </label>
      </section>
      <section class="input-block">
        <label class="input-label">
          <p class="input-title">Description</p>
          <VTextarea v-model="state.description" />
        </label>
      </section>
      <section class="date">Конец: {{ useTimeFormat(state.expirationDate, true) }}</section>
      <section class="form-buttons">
        <VButton @click="handleCommitChanges" isPrimary>Save</VButton>
        <VButton @click="handleCancel">Cancel</VButton>
        <VButton @click="handleDelete" isDanger>Delete</VButton>
      </section>
    </form>
  </section>
</template>

<style lang="scss">
.active::after {
  transform: scale(1);
}
</style>
<style lang="scss" scoped>
.drawer {
  @include flex-column;
  gap: 30px;

  position: absolute;
  width: var(--canban-drawer-width);
  height: calc(100vh - var(--header-height));
  transform: translateX(var(--canban-drawer-width));
  box-shadow: -5px 0px 10px 0px rgba(34, 60, 80, 0.05);
  background: white;

  top: var(--header-height);
  right: 0;
  padding: 20px;
  transition: transform 0.2s ease-out;
}
.header-title {
  font-size: 28px;
}
.form {
  @include flex-column;
  gap: 20px;
}
.tags {
  @include flex-row;
  gap: 6px;
}
.tag {
  position: relative;
  display: inline-block;
  padding: 3px 9px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  color: var(--white);
  cursor: pointer;
  &::after {
    transform: scale(var(--active-tag-scale));
    position: absolute;
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 6px;
    background-color: rgb(0, 231, 116);
    top: -3px;
    right: -3px;
    transition: transform 0.1s;
  }
}
.input-label {
  @include flex-column;
  font-size: 16px;
  gap: 5px;
}
.input-title {
  padding-right: 10px;
}
.date {
  @include taskDateTag;
  font-size: 14px;
  cursor: pointer;
}
.form-buttons {
  @include flex-row;
  padding-right: 30px;
  gap: 15px;
  align-self: flex-end;
}
</style>
