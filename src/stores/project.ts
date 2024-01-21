import { getProjectTags, getWholeProjectById } from "@/api"
import { useTagsStore } from "@/stores/tags"
import type { Project } from "@/types"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useProjectStore = defineStore("project", () => {
  const project = ref<Project>()
  const tagsStore = useTagsStore()

  async function updateProjectInStore(projectId: number) {
    const { data: newProject } = await getWholeProjectById(projectId)
    const { data: tags = [] } = await getProjectTags(projectId)
    tagsStore.saveTags(tags)
    project.value = newProject
  }

  return { project, updateProjectInStore }
})
