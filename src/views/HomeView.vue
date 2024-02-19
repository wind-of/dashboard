<script setup lang="ts">
import { useProjectStore } from "@/stores/project"
import { useRouter } from "vue-router"
import ProjectsList from "@/components/common/ProjectsList.vue"
import HomeAssignedTasks from "@/components/home/HomeAssignedTasks.vue"
import ViewWrapper from "@/components/ViewWrapper.vue"
import { CANBAN_ROUTE_NAME } from "@/router"

const router = useRouter()
const projectStore = useProjectStore()

async function handleProjectSelect(projectId: number) {
  await projectStore.updateProjectInStore(projectId)
  router.push({ name: CANBAN_ROUTE_NAME })
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
      <HomeAssignedTasks />
    </main>
  </ViewWrapper>
</template>
