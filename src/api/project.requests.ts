import axios from "./axios"

export async function getParticipatingProjects() {
  return axios.get(`projects/participating`)
}

export async function getWholeProjectById(projectId: number) {
  return axios.get(`projects/${projectId}`)
}

export async function createProject() {
  return axios.post(`projects/`, { title: "Project Title" })
}

export async function deleteProjectRequest(projectId: number) {
  return axios.delete(`projects/${projectId}`)
}

export async function updateProjectTitle(projectId: number, title: string) {
  return axios.patch(`projects/${projectId}`, { title })
}

export async function getProjectTags(projectId: number) {
  return axios.get(`projects/${projectId}/tags`)
}
