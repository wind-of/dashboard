import {
  createProjectRequest,
  deleteProjectRequest,
  getProjectRequest,
  getProjectTagsRequest
} from "@/api/project.requests"
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
    const { data: newProject } = await getProjectRequest(projectId)
    const { data: tags = [] } = await getProjectTagsRequest(projectId)
    tagsStore.saveTags(tags)
    project.value = newProject
  }

  async function createNewProject() {
    const { data: newProject } = await createProjectRequest()
    const { data: tags = [] } = await getProjectTagsRequest(newProject.id)
    await participatingProjectsStore.updateProjectsList()
    tagsStore.saveTags(tags)
    project.value = newProject
  }

  async function deleteProject() {
    if (!project.value) {
      return
    }
    await deleteProjectRequest(project.value.id)
    await participatingProjectsStore.updateProjectsList()
    project.value = undefined
  }

  return { project, updateProjectInStore, createNewProject, deleteProject }
})
