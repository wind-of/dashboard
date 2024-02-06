import axios from "./axios"

export async function getUsersByIds(userIds: number[]) {
  return axios.get(`users/project?userIds=${userIds.join(",")}`)
}

export async function getMeRequest() {
  return axios.get(`users/me`)
}
