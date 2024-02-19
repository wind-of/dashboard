import { getParticipatingProjectsRequest } from "@/api/project.requests"
import type { Project } from "@/types"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useParticipatingProjectsStore = defineStore("participatingProjects", () => {
  const projects = ref<Project[]>()

  async function updateProjectsList() {
    const { data: list } = await getParticipatingProjectsRequest()
    projects.value = list
  }

  return { projects, updateProjectsList }
})
