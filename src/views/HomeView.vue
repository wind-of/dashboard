<script setup lang="ts">
import { useProjectStore } from "@/stores/project"
import { useRouter } from "vue-router"
import ProjectsList from "@/components/common/ProjectsList.vue"
import ViewWrapper from "@/components/ViewWrapper.vue"

const router = useRouter()
const projectStore = useProjectStore()

async function handleProjectSelect(projectId: number) {
  await projectStore.updateProjectInStore(projectId)
  router.push({ name: "canban" })
}
</script>

<template>
  <ViewWrapper>
    <main class="main">
      <ProjectsList
        @onProjectClick="projectStore.updateProjectInStore"
        @onProjectSelect="handleProjectSelect"
        @onProjectCreate="projectStore.createNewProject"
      />
    </main>
  </ViewWrapper>
</template>
