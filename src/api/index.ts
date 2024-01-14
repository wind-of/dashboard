import type { LoginUser, SignUpUser } from "@/types"
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

export async function getWholeProjectById(id: number) {
  return axios.get(`projects/${id}`)
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
