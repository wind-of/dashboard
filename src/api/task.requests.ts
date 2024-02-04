import type { UpdatedTask } from "@/types"
import axios from "./axios"

export async function createTaskInColumn(projectId: number, columnId: number) {
  return axios.post(`tasks/`, { columnId, projectId, title: "Task" })
}

export async function updateTask(projectId: number, updatedTask: UpdatedTask) {
  const { comments, columnId, ...task } = updatedTask
  task.tags = task.tags.map((tag) => ({ ...tag, taskId: task.id }))
  await axios.patch(`tasks/${updatedTask.id}`, { ...task, columnId, projectId })
}

export async function deleteTask(projectId: number, taskId: number) {
  return axios.delete(`tasks/${taskId}`, { data: { projectId } })
}
