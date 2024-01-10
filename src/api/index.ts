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
