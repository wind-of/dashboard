export interface Tag {
  id: string
  title: string
  color: string
}

export interface Task {
  id: string
  title: string
  shortDescription: string
  description: string
  preview?: string
  tags: Tag[]
  expirationDate: Date
  startDate: Date
}
export interface ColumnTask extends Task {
  columnId: string
}

export interface ColumnProto {
  id: string
  title: string
}
export interface Column extends ColumnProto {
  tasks: Task[]
}

export interface Project {
  id: string
  title: string
  columns: Column[]
}

export interface UpdatedTask extends Task {
  columnId: string
}
