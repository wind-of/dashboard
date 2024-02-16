import type { LoginUser, SignUpUser } from "@/types"
import axios from "./axios"

export async function signUpUser(user: SignUpUser) {
  return axios.post(`auth/register`, user)
}

export async function signInUser(user: LoginUser) {
  return axios.post(`auth/login`, user)
}

export async function logoutRequest() {
  return axios.get(`auth/logout`)
}

export async function isUserAuthenticated() {
  return axios.get(`auth/authenticated`)
}
