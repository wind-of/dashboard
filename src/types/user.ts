export interface User {
  id: number
  firstname: string
  lastname?: string
  email: string
  avatar?: string
}

export interface LoginUser {
  email: string
  password: string
}
