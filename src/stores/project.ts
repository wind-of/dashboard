import type { Project } from "@/types"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useProjectStore = defineStore("project", () => {
  const project = ref<null | Project>(null)
  function saveProject(newProject: Project) {
    project.value = newProject
  }

  return { project, saveProject }
})
