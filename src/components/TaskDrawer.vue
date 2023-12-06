<script setup lang="ts">
import { computed, reactive, toRaw } from "vue"
import VInput from "~/form/VInput.vue"
import VTextarea from "~/form/VTextarea.vue"
import VButton from "~/form/VButton.vue"
import { useCopyReactive } from "@/composables/copy.reactive"
import { useTimeFormat } from "@/composables/format.time"
import { Tag, Task, ColumnProto } from "@/types"
import { TAGS } from "@/constants"

const props = defineProps<{
  task: Task
  columnId: string
  columns: ColumnProto[]
  isOpen: boolean
}>()
const emit = defineEmits(["onCommitChanges", "onCancelChanges", "onTaskDelete"])

const drawerStyles = computed(() => ({
  [props.isOpen ? "transform" : ""]: "none"
}))

const form = computed(() => ({
  state: reactive({ ...useCopyReactive(props.task), columnId: props.columnId })
}))
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

function getColumnTitleById(columnId: string) {
  return props.columns.find(({ id }) => id === columnId)?.title
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
    <div class="preview-wrapper">
      <img :src="state.preview" alt="preview image" class="preview-image" v-if="task.preview" />
      <div class="preview-button">Update preview</div>
    </div>
    <div class="drawer-content">
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
            <p class="input-title">Short Description</p>
            <VInput v-model="state.shortDescription" />
          </label>
        </section>
        <section class="input-block">
          <label class="input-label">
            <p class="input-title">Description</p>
            <VTextarea v-model="state.description" />
          </label>
        </section>
        <select class="columns-select" v-model="state.columnId">
          <option value="" selected disabled hidden>{{ getColumnTitleById(columnId) }}</option>
          <option v-for="{ id, title } in columns" :key="id" :value="id">
            {{ title }}
          </option>
        </select>
        <section class="date">Конец: {{ useTimeFormat(state.expirationDate, true) }}</section>
        <section class="form-buttons">
          <VButton @click="handleCommitChanges" isPrimary>Save</VButton>
          <VButton @click="handleCancel">Cancel</VButton>
          <VButton @click="handleDelete" isDanger>Delete</VButton>
        </section>
      </form>
    </div>
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

  position: absolute;
  width: var(--canban-drawer-width);
  height: calc(100vh - var(--header-height));
  transform: translateX(var(--canban-drawer-width));
  box-shadow: -5px 0px 10px 0px rgba(34, 60, 80, 0.05);
  background: white;
  overflow: scroll;

  top: var(--header-height);
  right: 0;
  transition: transform 0.2s ease-out;
}
.preview-wrapper,
.preview-image {
  width: 100%;
  height: 18vh;
}
.preview-wrapper {
  position: relative;
  background: #ddd;
  overflow: hidden;
  &:hover .preview-button {
    margin-bottom: 0;
  }
}
.preview-image {
  object-fit: cover;
  object-position: center;
}
.preview-button {
  @include flex-row;
  width: 100%;
  justify-content: space-around;
  position: absolute;
  bottom: 0;
  padding: 10px;
  color: rgba(255, 255, 255, 1);
  background-color: rgba(84, 84, 84, 0.7);
  cursor: pointer;

  margin-bottom: -8vh;
  transition: margin 0.5s;
}
.drawer-content {
  @include flex-column;
  gap: 30px;
  padding: 20px;
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

.columns-select {
  align-self: flex-start;
  padding: 10px 6em 10px 10px;
  border: 1px solid #eee;
  color: #777;
  border-radius: 0.25rem;
  outline: none;
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
