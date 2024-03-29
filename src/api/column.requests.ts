import type { ColumnProto } from "@/types"
import axios from "./axios"

export async function createProjectColumnRequest(projectId: number) {
  return axios.post(`columns/`, { projectId, title: "Column" })
}

export async function deleteProjectColumnRequest(projectId: number, columnId: number) {
  return axios.delete(`columns/${columnId}`, { data: { projectId } })
}

export async function updateColumnRequest(
  projectId: number,
  columnId: number,
  data: Partial<Omit<ColumnProto, "id">>
) {
  return axios.patch(`columns/${columnId}`, { ...data, projectId })
}

export async function updateColumnPositionRequest(
  projectId: number,
  columnId: number,
  position: number,
  shouldInsertAfter: boolean
) {
  return axios.patch(`columns/${columnId}/position`, {
    projectId,
    position,
    shouldInsertAfter
  })
}
