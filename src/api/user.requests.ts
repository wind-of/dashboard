import type { User } from "@/types"
import axios from "./axios"

export async function getUserById(userId: number) {
  return axios.get(`users/${userId}`)
}

export async function getUsersByIds(userIds: number[]) {
  return axios.get(`users/list?userIds=${userIds.join(",")}`)
}

export async function getMeRequest() {
  return axios.get(`users/me`)
}

export async function updateUserRequest(userId: number, body: Partial<User>) {
  return axios.patch(`users/${userId}`, body)
}
