export enum ParticipantRolesEnum {
  Owner = "owner",
  Admin = "admin",
  Member = "member"
}

export interface Participant {
  id: number
  userId: number
  projectId: number
  role: ParticipantRolesEnum
}
