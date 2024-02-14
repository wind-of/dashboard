<script setup lang="ts">
import ProjectFormParticipants from "@/components/project/ProjectFormParticipants.vue"
import ProjectFormNewParticipant from "@/components/project/ProjectFormNewParticipant.vue"
import ProjectFormTitle from "@/components/project/ProjectFormTitle.vue"
</script>

<template>
  <form class="form" @submit.prevent>
    <ProjectFormTitle />
    <ProjectFormParticipants />
    <ProjectFormNewParticipant />
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
