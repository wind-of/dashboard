import axios from "./axios"

export async function createCommentRequest(
  projectId: number,
  taskId: number,
  data: { content: string; attachment?: string }
) {
  return axios.post(`/comments`, { ...data, taskId, projectId })
}
