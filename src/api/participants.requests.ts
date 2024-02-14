import type { ParticipantRolesEnum } from "@/types"
import axios from "./axios"

export async function addParticipantRequest(email: string, projectId: number) {
  return axios.post(`participants`, { email, projectId })
}

export async function updateParticipantsRole(
  projectId: number,
  userId: number,
  role: ParticipantRolesEnum
) {
  return axios.patch(`participants/${userId}`, { projectId, userId, role })
}

export async function deleteParticipantRequest(projectId: number, participantId: number) {
  return axios.delete(`participants/${participantId}`, { data: { projectId } })
}
