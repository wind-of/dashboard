<script setup lang="ts">
import { getWholeProjectById } from "@/api"
import { useProjectStore } from "@/stores/project"
import { ProjectWithoutColumns } from "@/types"
import { useRouter } from "vue-router"
import ProjectsList from "~/common/ProjectsList.vue"
import ViewWrapper from "~/ViewWrapper.vue"

const router = useRouter()
const projectStore = useProjectStore()

async function handleProjectClick(partialProject: ProjectWithoutColumns) {
  const { data: project } = await getWholeProjectById(partialProject.id)
  projectStore.saveProject(project)
}

async function handleProjectSelect(partialProject: ProjectWithoutColumns) {
  await handleProjectClick(partialProject)
  router.push({ name: "canban" })
}
</script>

<template>
  <ViewWrapper>
    <main class="main">
      <ProjectsList @onProjectClick="handleProjectClick" @onProjectSelect="handleProjectSelect" />
    </main>
  </ViewWrapper>
</template>
