import { getParticipatingProjects } from "@/api"
import type { ProjectWithoutColumns } from "@/types"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useParticipatingProjectsStore = defineStore("participatingProjects", () => {
  const projects = ref<ProjectWithoutColumns[]>()

  async function updateProjectsList() {
    const { data: list } = await getParticipatingProjects()
    projects.value = list
  }

  return { projects, updateProjectsList }
})
