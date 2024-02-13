<script setup lang="ts">
import { computed, reactive, ref, toRaw } from "vue"
import { vOnClickOutside } from "@vueuse/components"
import VueDatePicker from "@vuepic/vue-datepicker"
import "@vuepic/vue-datepicker/dist/main.css"

import VButton from "@/components/form/VButton.vue"
import VSelect from "@/components/form/VSelect.vue"
import InputBlock from "@/components/form/InputBlock.vue"
import TaskDrawerHeader from "@/components/TaskDrawer/TaskDrawerHeader.vue"
import { useCopyReactive } from "@/composables/copy.reactive"
import { Tag, Task, ColumnProto } from "@/types"
import { useUserStore } from "@/stores/user"

const props = defineProps<{
  task: Task
  columnId: number
  columns: ColumnProto[]
  isOpen: boolean
  tags: Tag[]
}>()
const emit = defineEmits(["onCommitChanges", "onCancelChanges", "onTaskDelete"])

const userStore = useUserStore()
const canEdit = ref(false)
const isOwner = computed(() => props.task.creatorId === userStore.user?.id)
const drawerStyles = computed(() => ({
  [props.isOpen ? "transform" : ""]: "none"
}))

const form = computed(() => ({
  state: reactive({ ...useCopyReactive(props.task), columnId: props.columnId })
}))
const state = computed(() => form.value.state)

function handleCommitChanges() {
  canEdit.value = false
  emit("onCommitChanges", useCopyReactive(state.value))
}
function handleCancel() {
  canEdit.value = false
  emit("onCancelChanges")
}
function handleDelete() {
  emit("onTaskDelete")
}

function getColumnTitleById(columnId: number) {
  return props.columns.find(({ id }) => id === columnId)?.title
}
function isActiveTag(tagId: string) {
  return state.value.tags.some(({ uniqueId }) => uniqueId === tagId) || false
}
function computeTagStyles(backgroundColor: string, tagId: string) {
  return {
    "background-color": backgroundColor,
    "--active-tag-scale": Number(isActiveTag(tagId))
  }
}
function handleTagClick(tag: Tag) {
  if (!canEdit.value) {
    return
  }
  if (isActiveTag(tag.uniqueId)) {
    state.value.tags = toRaw(state.value.tags).filter(({ uniqueId }) => uniqueId !== tag.uniqueId)
    return
  }
  state.value.tags.push(tag)
}
function handlePerformerUpdate(newPerformerId: number) {
  state.value.performerId = newPerformerId
}
function handleEditButtonClick() {
  canEdit.value = true
}
</script>

<template>
  <section class="drawer-wrapper" :class="{ open: isOpen }">
    <section class="drawer" :style="drawerStyles" v-on-click-outside="handleCancel">
      <div class="preview-wrapper">
        <img :src="state.preview" alt="preview image" class="preview-image" v-if="task.preview" />
        <div class="preview-button">Update preview</div>
      </div>
      <div class="drawer-content">
        <Suspense>
          <TaskDrawerHeader
            :creatorId="task.creatorId"
            :performerId="task.performerId"
            @onPerformerUpdate="handlePerformerUpdate"
            :canEdit="canEdit"
          />
        </Suspense>
        <form class="form" @submit.prevent>
          <section class="tags">
            <div
              class="tag"
              v-for="tag in tags"
              :key="tag.id"
              :style="computeTagStyles(tag.color, tag.uniqueId)"
              @click="handleTagClick(tag)"
            >
              {{ tag.title }}
            </div>
          </section>
          <InputBlock v-model="state.title" label="Title" :disabled="!canEdit" />
          <InputBlock
            v-model="state.shortDescription"
            label="Short Description"
            :disabled="!canEdit"
          />
          <InputBlock
            v-model="state.description"
            label="Description"
            isTextarea
            :disabled="!canEdit"
          />
          <VSelect
            v-model="state.columnId"
            :defaultTitle="getColumnTitleById(columnId) || ''"
            :disabled="!canEdit"
          >
            <option v-for="{ id, title } in columns" :key="id" :value="id">
              {{ title }}
            </option>
          </VSelect>
          <section class="dates">
            <VueDatePicker v-model="state.startDate" locale="en" :disabled="!canEdit" /> —
            <VueDatePicker v-model="state.expirationDate" locale="en" :disabled="!canEdit" />
          </section>
          <section v-if="canEdit" class="form-buttons">
            <VButton @click="handleCommitChanges" isPrimary>Save</VButton>
            <VButton @click="handleCancel">Cancel</VButton>
            <VButton @click="handleDelete" isDanger>Delete</VButton>
          </section>
          <section v-else class="form-buttons">
            <VButton @click="handleEditButtonClick">Edit</VButton>
          </section>
        </form>
      </div>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.drawer-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  @include flex-row;
  z-index: 3;
  transition-property: height, background-color;
  transition-duration: 0.2s;
  transition-timing-function: ease-out;
  &.open {
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.4);
  }
}
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
.edit-button-wrapper {
  @include flex-row;
  justify-content: flex-end;
}

.form {
  @include flex-column;
  gap: 20px;
}
.tags {
  @include flex-row;
  flex-wrap: wrap;
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

.dates {
  @include flex-row;
  gap: 10px;
  align-items: center;
}
.form-buttons {
  @include flex-row;
  gap: 15px;
  align-self: flex-end;
}
</style>
