import { createProject, getProjectTags, getWholeProjectById } from "@/api"
import { useTagsStore } from "@/stores/tags"
import type { Project } from "@/types"
import { defineStore } from "pinia"
import { ref } from "vue"
import { useParticipatingProjectsStore } from "./participating.projects"

export const useProjectStore = defineStore("project", () => {
  const project = ref<Project>()
  const tagsStore = useTagsStore()
  const participatingProjectsStore = useParticipatingProjectsStore()

  async function updateProjectInStore(projectId: number) {
    const { data: newProject } = await getWholeProjectById(projectId)
    const { data: tags = [] } = await getProjectTags(projectId)
    tagsStore.saveTags(tags)
    project.value = newProject
  }

  async function createNewProject() {
    const { data: newProject } = await createProject()
    const { data: tags = [] } = await getProjectTags(newProject.id)
    await participatingProjectsStore.updateProjectsList()
    tagsStore.saveTags(tags)
    project.value = newProject
  }

  return { project, updateProjectInStore, createNewProject }
})
