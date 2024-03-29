import type { UpdatedTask } from "@/types"
import axios from "./axios"

export async function createTaskRequest(projectId: number, columnId: number) {
  return axios.post(`tasks/`, { columnId, projectId, title: "Task" })
}

export async function updateTaskRequest(projectId: number, updatedTask: UpdatedTask) {
  const { comments, columnId, ...task } = updatedTask
  task.tags = task.tags.map((tag) => ({ ...tag, taskId: task.id }))
  await axios.patch(`tasks/${updatedTask.id}`, { ...task, columnId, projectId })
}

export async function deleteTaskRequest(projectId: number, taskId: number) {
  return axios.delete(`tasks/${taskId}`, { data: { projectId } })
}

export async function updateTaskPositionRequest(
  projectId: number,
  taskId: number,
  columnId: number,
  position: number,
  shouldInsertAfter: boolean
) {
  return axios.patch(`tasks/${taskId}/position`, {
    projectId,
    columnId,
    position,
    shouldInsertAfter
  })
}

export async function getAssignedTasksRequest() {
  return axios.get(`tasks/assigned`)
}
