import type { LoginUser, User } from "@/types"
import axios from "axios"
const { VITE_SERVER_URL: BASE_URL } = import.meta.env

axios.defaults.baseURL = BASE_URL
axios.defaults.withCredentials = true

export async function signUpUser(user: User) {
  return axios.post(`auth/register`, user)
}

export async function signInUser(user: LoginUser) {
  return axios.post(`auth/login`, user)
}

export async function isUserAuthenticated() {
  return axios.get(`auth/authenticated`)
}
