import axios from "./axios"

export async function getParticipatingProjectsRequest() {
  return axios.get(`projects/participating`)
}

export async function getProjectRequest(projectId: number) {
  return axios.get(`projects/${projectId}`)
}

export async function createProjectRequest() {
  return axios.post(`projects/`, { title: "Project Title" })
}

export async function deleteProjectRequest(projectId: number) {
  return axios.delete(`projects/${projectId}`)
}

export async function updateProjectTitleRequest(projectId: number, title: string) {
  return axios.patch(`projects/${projectId}`, { title })
}

export async function getProjectTagsRequest(projectId: number) {
  return axios.get(`projects/${projectId}/tags`)
}
