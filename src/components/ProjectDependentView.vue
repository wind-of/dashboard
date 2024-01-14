<script setup lang="ts">
import { computed } from "vue"
import { useProjectStore } from "@/stores/project"
import ProjectsList from "~/common/ProjectsList.vue"
import { getWholeProjectById } from "@/api"
import { ProjectWithoutColumns } from "@/types"

const projectStore = useProjectStore()
const isChosen = computed(() => !!projectStore.project)

async function handleProjectClick(partialProject: ProjectWithoutColumns) {
  const { data: project } = await getWholeProjectById(partialProject.id)
  projectStore.saveProject(project)
}
</script>

<template>
  <ProjectsList v-if="!isChosen" @onProjectClick="handleProjectClick" title="Choose project" />
  <slot v-else />
</template>
