<script setup lang="ts">
import VInput from "@/components/form/VInput.vue"
import VButton from "@/components/form/VButton.vue"
import { computed, ref } from "vue"
import { emailPattern } from "@/utils"
import { addParticipantRequest } from "@/api/participants.requests"
import { useProjectStore } from "@/stores/project"
import { storeToRefs } from "pinia"

const projectStore = useProjectStore()
const { project } = storeToRefs(projectStore)
const email = ref("")
const isValidEmail = computed(() => emailPattern.test(email.value))

async function handleAddParticipant() {
  await addParticipantRequest(email.value, project.value!.id)
  await projectStore.updateProjectInStore(project.value!.id).catch(console.log)
}
</script>

<template>
  <section class="new-participant">
    <h2>Add new participant</h2>
    <section class="field-wrapper">
      <VInput class="input" placeholder="Email" v-model="email" />
      <VButton isPrimary :disabled="!isValidEmail" @click="handleAddParticipant">Add</VButton>
    </section>
  </section>
</template>

<style scoped lang="scss">
.new-participant {
  @include flex-column;
  gap: 20px;
}
.field-wrapper {
  @include flex-row;
  gap: 15px;
}
</style>
