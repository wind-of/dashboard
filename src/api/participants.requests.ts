import type { ParticipantRolesEnum } from "@/types"
import axios from "./axios"

export async function updateParticipantsRole(
  projectId: number,
  userId: number,
  role: ParticipantRolesEnum
) {
  return axios.patch(`participants/${userId}`, { projectId, userId, role })
}
