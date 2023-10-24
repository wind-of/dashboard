<script setup lang="ts">
import { computed, toValue, reactive } from "vue"
import VInput from "~/form/VInput.vue"
import VTextarea from "~/form/VTextarea.vue"
import VButton from "~/form/VButton.vue"
import { useCopyReactive } from "@/composables/copy.reactive"
import { Task } from "@/types"

const props = defineProps<{ task: Task; columnId: string; isOpen: boolean }>()
const emit = defineEmits(["onCommitChanges", "onCancelChanges", "onTaskDelete"])

const drawerStyles = computed(() => ({
  [props.isOpen ? "transform" : ""]: "none"
}))

const form = computed(() => ({ state: reactive(useCopyReactive(props.task)) }))
const state = computed(() => form.value.state)

function handleCommitChanges() {
  emit("onCommitChanges", useCopyReactive(toValue(state)))
}
function handleCancel() {
  emit("onCancelChanges")
}
function handleDelete() {
  emit("onTaskDelete")
}
</script>

<template>
  <section class="drawer" :style="drawerStyles">
    <header class="header">
      <h2 class="header-title">Task</h2>
    </header>
    <form class="form" @submit.prevent>
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
      <section class="form-buttons">
        <VButton @click="handleCommitChanges" isPrimary>Save</VButton>
        <VButton @click="handleCancel">Cancel</VButton>
        <VButton @click="handleDelete" isDanger>Delete</VButton>
      </section>
    </form>
  </section>
</template>

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
.input-label {
  @include flex-column;
  font-size: 16px;
  gap: 5px;
}
.input-title {
  padding-right: 10px;
}
.form-buttons {
  @include flex-row;
  padding-right: 30px;
  gap: 15px;
  align-self: flex-end;
}
</style>
