<script setup lang="ts">
import { computed } from "vue"
import { useProjectStore } from "@/stores/project"
import ProjectsList from "~/common/ProjectsList.vue"

const projectStore = useProjectStore()
const isChosen = computed(() => !!projectStore.project)
</script>

<template>
  <ProjectsList
    v-if="!isChosen"
    @onProjectClick="projectStore.updateProjectInStore"
    @onProjectSelect="projectStore.updateProjectInStore"
    @onProjectCreate="projectStore.createNewProject"
    title="Choose project"
  />
  <slot v-else />
</template>
