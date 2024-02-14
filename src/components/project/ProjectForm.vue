<script setup lang="ts">
import ProjectFormParticipants from "@/components/project/ProjectFormParticipants.vue"
import ProjectFormNewParticipant from "@/components/project/ProjectFormNewParticipant.vue"
import ProjectFormTitle from "@/components/project/ProjectFormTitle.vue"
import ProjectFormDanger from "@/components/project/ProjectFormDanger.vue"
import { useProjectStore } from "@/stores/project"
import { useUserStore } from "@/stores/user"
import { storeToRefs } from "pinia"
import { computed } from "vue"

const { project } = storeToRefs(useProjectStore())
const { user } = storeToRefs(useUserStore())

const isOwner = computed(() => project.value?.ownerId === user.value?.id)
</script>

<template>
  <form class="form" @submit.prevent>
    <ProjectFormTitle />
    <ProjectFormParticipants />
    <ProjectFormNewParticipant />
    <ProjectFormDanger v-if="isOwner" />
  </form>
</template>

<style scoped lang="scss">
.form {
  @include flex-column;
  gap: 30px;
  width: 80vw;
  max-width: 800px;
}
</style>
