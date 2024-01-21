import { getProjectTags, getWholeProjectById } from "@/api"
import type { Project, Tag } from "@/types"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useProjectStore = defineStore("project", () => {
  const project = ref<Project>()
  const tags = ref<Tag[]>([])
  function saveProject(newProject: Project) {
    project.value = newProject
  }
  function saveTags(newTags: Tag[]) {
    tags.value = newTags
  }
  async function updateProjectInStore(projectId: number) {
    const { data: project } = await getWholeProjectById(projectId)
    const { data: tags } = await getProjectTags(projectId)
    saveTags(tags || [])
    saveProject(project)
  }

  return { project, tags, saveProject, saveTags, updateProjectInStore }
})
