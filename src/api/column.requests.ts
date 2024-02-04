import type { ColumnProto } from "@/types"
import axios from "./axios"

export async function createColumnInProject(projectId: number) {
  return axios.post(`columns/`, { projectId, title: "Column" })
}

export async function deleteColumnFromProject(projectId: number, columnId: number) {
  return axios.delete(`columns/${columnId}`, { data: { projectId } })
}

export async function updateColumn(
  projectId: number,
  columnId: number,
  data: Partial<Omit<ColumnProto, "id">>
) {
  return axios.patch(`columns/${columnId}`, { ...data, projectId })
}
