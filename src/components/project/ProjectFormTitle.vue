<script setup lang="ts">
import { computed, ref } from "vue"
import { storeToRefs } from "pinia"
import { useProjectStore } from "@/stores/project"
import { updateProjectTitleRequest } from "@/api/project.requests"
import VInput from "@/components/form/VInput.vue"
import VButton from "@/components/form/VButton.vue"

const projectStore = useProjectStore()
const { project } = storeToRefs(projectStore)

const title = ref(project.value?.title || "")
const doesTitleChanged = computed(() => title.value !== project.value?.title)
async function handleTitleSave() {
  await updateProjectTitleRequest(project.value?.id as number, title.value)
  await projectStore.updateProjectInStore(project.value?.id as number)
}
</script>

<template>
  <section class="title-section">
    <h2>Title</h2>
    <section class="field-wrapper">
      <VInput class="input" v-model="title" />
      <VButton :disabled="!doesTitleChanged" isPrimary @click="handleTitleSave">Save</VButton>
    </section>
  </section>
</template>

<style scoped lang="scss">
.title-section {
  @include flex-column;
  gap: 15px;
}
.field-wrapper {
  @include flex-row;
  gap: 15px;
  align-items: flex-end;
  margin-bottom: 20px;
}
</style>
