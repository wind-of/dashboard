import { getWholeProjectById } from "@/api"
import type { Project } from "@/types"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useProjectStore = defineStore("project", () => {
  const project = ref<Project>()
  function saveProject(newProject: Project) {
    project.value = newProject
  }
  async function updateProjectInStore(projectId: number) {
    const { data: updated } = await getWholeProjectById(projectId)
    saveProject(updated)
  }

  return { project, saveProject, updateProjectInStore }
})
