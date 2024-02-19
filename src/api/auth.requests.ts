import type { LoginUser, SignUpUser } from "@/types"
import axios from "./axios"

export async function userRegistrationRequest(user: SignUpUser) {
  return axios.post(`auth/register`, user)
}

export async function userAuthorizationRequest(user: LoginUser) {
  return axios.post(`auth/login`, user)
}

export async function userLogoutRequest() {
  return axios.get(`auth/logout`)
}

export async function checkUserAuthentiocationRequest() {
  return axios.get(`auth/authenticated`)
}
