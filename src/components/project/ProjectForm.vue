<script setup lang="ts">
import { computed, ref } from "vue"
import { storeToRefs } from "pinia"
import { useProjectStore } from "@/stores/project"
import InputBlock from "@/components/form/InputBlock.vue"
import ProjectFormParticipants from "@/components/project/ProjectFormParticipants.vue"
import { updateProjectTitle } from "@/api"

const projectStore = useProjectStore()
const { project } = storeToRefs(projectStore)

const title = ref(project.value?.title || "")
const doesTitleChanged = computed(() => title.value !== project.value?.title)
async function handleFormSubmit() {
  await updateProjectTitle(project.value?.id as number, title.value)
  await projectStore.updateProjectInStore(project.value?.id as number)
}
</script>

<template>
  <form class="form" @submit.prevent="handleFormSubmit">
    <section class="title-section">
      <InputBlock class="input" v-model="title" label="Title" />
      <button :class="{ disabled: !doesTitleChanged }" :disabled="!doesTitleChanged">Save</button>
    </section>
    <ProjectFormParticipants />
  </form>
</template>

<style scoped lang="scss">
.form {
  width: 80vw;
  max-width: 800px;
  display: flex;
  flex-direction: column;
}
.title-section {
  @include flex-row;
  gap: 30px;
  align-items: flex-end;
  margin-bottom: 40px;
  button {
    font-size: 14px;
    font-weight: 500;
    background-color: var(--blue);
    color: white;
    &.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
}
</style>
