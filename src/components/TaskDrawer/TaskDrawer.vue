<script setup lang="ts">
import { computed, ref, toRaw } from "vue"
import { vOnClickOutside } from "@vueuse/components"
import VueDatePicker from "@vuepic/vue-datepicker"
import "@vuepic/vue-datepicker/dist/main.css"

import VButton from "@/components/form/VButton.vue"
import VSelect from "@/components/form/VSelect.vue"
import InputBlock from "@/components/form/InputBlock.vue"
import TaskDrawerHeader from "@/components/TaskDrawer/TaskDrawerHeader.vue"
import TaskDrawerComments from "@/components/TaskDrawer/TaskDrawerComments.vue"
import { useCopyReactive } from "@/composables/useCopyReactive"
import { Tag, Task, ColumnProto } from "@/types"
import { useUserStore } from "@/stores/user"
import { rules } from "@/utils"
import { createFormState } from "@/utils/form.state"

const props = defineProps<{
  task: Task
  columns: ColumnProto[]
  isOpen: boolean
  tags: Tag[]
}>()
const emit = defineEmits(["onCommitChanges", "onCancelChanges", "onTaskDelete", "onCommentSend"])

const userStore = useUserStore()
const canEdit = ref(false)
const isOwner = computed(() => props.task.creatorId === userStore.user?.id)
const drawerStyles = computed(() => ({
  [props.isOpen ? "transform" : ""]: "none"
}))

const state = computed(() =>
  createFormState(
    Object.keys(props.task),
    {
      title: [rules.required],
      columnId: [rules.required],
      expirationDate: [
        (end: Date) => {
          const start = state.value.startDate.value
          return !start || end > new Date(start) || "Task should end after it starts"
        }
      ],
      startDate: [
        (start: Date) => {
          const end = state.value.expirationDate.value
          return !end || start < new Date(end) || "Task should start before it ends"
        }
      ]
    },
    useCopyReactive(props.task)
  )
)
const isSaveButtonDisabled = computed(
  () =>
    !state.value.title.value ||
    !state.value.columnId.value ||
    !!state.value.expirationDate.error ||
    !!state.value.startDate.error
)

function handleCommitChanges() {
  canEdit.value = false
  emit("onCommitChanges", state.value.plain())
}
function handleCancel() {
  canEdit.value = false
  emit("onCancelChanges")
}
function handleDelete() {
  emit("onTaskDelete")
}

function getColumnTitleById(columnId: number) {
  return props.columns.find(({ id }) => id === columnId)?.title || "Column"
}
function isActiveTag(tagId: string) {
  return state.value.tags.value.some(({ uniqueId }) => uniqueId === tagId) || false
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
    state.value.tags.value = toRaw(state.value.tags.value).filter(
      ({ uniqueId }) => uniqueId !== tag.uniqueId
    )
    return
  }
  state.value.tags.value.push(tag)
}
function handleEditButtonClick() {
  canEdit.value = true
}
function handleCommentSend(newCommentContent) {
  if (isSaveButtonDisabled.value) {
    return
  }
  emit("onCommentSend", newCommentContent)
}
</script>

<template>
  <section class="drawer-wrapper" :class="{ open: isOpen }">
    <section class="drawer" :style="drawerStyles" v-on-click-outside="handleCancel">
      <div class="preview-wrapper">
        <img
          :src="state.preview.value"
          alt="preview image"
          class="preview-image"
          v-if="task.preview"
        />
        <div class="preview-button">Update preview</div>
      </div>
      <div class="drawer-content">
        <Suspense>
          <TaskDrawerHeader
            :creatorId="task.creatorId"
            v-model:performerId="state.performerId.value"
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
          <InputBlock
            v-model="state.title.value"
            label="Title"
            :disabled="!canEdit"
            :error="state.title.error"
          />
          <InputBlock
            v-model="state.shortDescription.value"
            label="Short Description"
            :disabled="!canEdit"
            :error="state.shortDescription.error"
          />
          <InputBlock
            v-model="state.description.value"
            label="Description"
            isTextarea
            :disabled="!canEdit"
            :error="state.description.error"
          />
          <VSelect
            v-model="state.columnId.value"
            :defaultTitle="getColumnTitleById(task.columnId)"
            :disabled="!canEdit"
          >
            <option v-for="{ id, title } in columns" :key="id" :value="id">
              {{ title }}
            </option>
          </VSelect>
          <section class="dates-wrapper">
            <section class="dates">
              <VueDatePicker v-model="state.startDate.value" locale="en" :disabled="!canEdit" /> —
              <VueDatePicker
                v-model="state.expirationDate.value"
                locale="en"
                :disabled="!canEdit"
              />
            </section>
            <p class="dates-error">{{ state.startDate.error || state.expirationDate.error }}</p>
          </section>

          <section v-if="canEdit" class="form-buttons">
            <VButton @click="handleCommitChanges" isPrimary :disabled="isSaveButtonDisabled"
              >Save</VButton
            >
            <VButton @click="handleCancel">Cancel</VButton>
            <VButton @click="handleDelete" isDanger>Delete</VButton>
          </section>
          <section v-else-if="isOwner" class="form-buttons">
            <VButton @click="handleEditButtonClick">Edit</VButton>
          </section>
        </form>
        <div class="divider" />
        <TaskDrawerComments :comments="task.comments" @onCommentSend="handleCommentSend" />
      </div>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.divider {
  width: 100%;
  height: 1px;
  background: #ddd;
}
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
  height: 100vh;
  transform: translateX(var(--canban-drawer-width));
  box-shadow: -5px 0px 10px 0px rgba(34, 60, 80, 0.05);
  background: white;
  overflow: scroll;
  right: 0;
  transition: transform 0.2s ease-out;
}
.preview-wrapper,
.preview-image {
  width: 100%;
  min-height: 20vh;
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
.dates-error {
  color: red;
}
.form-buttons {
  @include flex-row;
  gap: 15px;
  align-self: flex-end;
}
</style>
@/composables/useCopyReactive
