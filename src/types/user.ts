import type { ParticipantRolesEnum } from "."

export interface User {
  id: number
  firstname: string
  lastname?: string
  email: string
  avatar?: string
}

export interface UserWithRole extends User {
  role: ParticipantRolesEnum
}

export interface SignUpUser {
  firstname: string
  email: string
  password: string
}

export interface LoginUser {
  email: string
  password: string
}
