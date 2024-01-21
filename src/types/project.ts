import type { User } from "@/types"

export interface Tag {
  id: number
  uniqueId: string
  title: string
  color: string
}

export interface Task {
  id: number
  title: string
  shortDescription: string
  description: string
  preview?: string
  tags: Tag[]
  comments: Comment[]
  expirationDate: Date
  startDate: Date
}
export interface ColumnTask extends Task {
  columnId: number
}

export interface ColumnProto {
  id: number
  title: string
}
export interface Column extends ColumnProto {
  tasks: Task[]
}

export interface Project {
  id: number
  title: string
  columns: Column[]
  participants: User[]
}
export interface ProjectWithoutColumns extends Omit<Project, "columns"> {}

export interface UpdatedTask extends Task {
  columnId: number
}
