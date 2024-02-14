import { getParticipatingProjects } from "@/api"
import type { Project } from "@/types"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useParticipatingProjectsStore = defineStore("participatingProjects", () => {
  const projects = ref<Project[]>()

  async function updateProjectsList() {
    const { data: list } = await getParticipatingProjects()
    projects.value = list
  }

  return { projects, updateProjectsList }
})
