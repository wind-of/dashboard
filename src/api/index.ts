import type { LoginUser, SignUpUser, Task } from "@/types"
import axios from "axios"
const { VITE_SERVER_URL: BASE_URL } = import.meta.env

axios.defaults.baseURL = BASE_URL
axios.defaults.withCredentials = true

export async function signUpUser(user: SignUpUser) {
  return axios.post(`auth/register`, user)
}

export async function signInUser(user: LoginUser) {
  return axios.post(`auth/login`, user)
}

export async function isUserAuthenticated() {
  return axios.get(`auth/authenticated`)
}

export async function getUserProjects() {
  return axios.get(`projects`)
}

export async function getParticipatingProjects() {
  return axios.get(`projects/participating`)
}

export async function getWholeProjectById(projectId: number) {
  return axios.get(`projects/${projectId}`)
}

export async function getProjectTags(projectId: number) {
  return axios.get(`projects/${projectId}/tags`)
}

export async function createColumnInProject(projectId: number) {
  return axios.post(`columns/`, { projectId, title: "Column" })
}

export async function deleteColumnFromProject(projectId: number, columnId: number) {
  return axios.delete(`columns/${columnId}`, { data: { projectId } })
}

export async function createTaskInColumn(projectId: number, columnId: number) {
  return axios.post(`tasks/`, { columnId, projectId, title: "Task" })
}

export async function updateTaskFromColumn(projectId: number, columnId: number, updatedTask: Task) {
  const { comments, ...task } = updatedTask
  task.tags = task.tags.map((tag) => ({ ...tag, taskId: task.id }))
  return axios.patch(`tasks/${updatedTask.id}`, { ...task, columnId, projectId })
}

export async function deleteTaskFromColumn(projectId: number, columnId: number, taskId: number) {
  return axios.delete(`tasks/${taskId}`, { data: { columnId, projectId } })
}
