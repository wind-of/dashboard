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
