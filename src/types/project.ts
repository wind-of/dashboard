import type { Participant } from "@/types"

export interface Tag {
  id: number
  uniqueId: string
  title: string
  color: string
}

export interface Task {
  id: number
  lexorank: string
  columnId: number
  title: string
  shortDescription: string
  description: string
  preview?: string
  tags: Tag[]
  comments: Comment[]
  expirationDate: string
  startDate: string
}

export interface ColumnProto {
  id: number
  title: string
  lexorank: string
}
export interface Column extends ColumnProto {
  tasks: Task[]
}

export interface Project {
  id: number
  title: string
  columns: Column[]
  participants: Participant[]
}
export interface ProjectWithoutColumns extends Omit<Project, "columns"> {}

export interface UpdatedTask extends Task {
  columnId: number
}
