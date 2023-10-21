export interface Tag {
  id: string
  title: string
}

export interface Task {
  id: string
  title: string
  description: string
  tags: Tag[]
}

export interface Column {
  id: string
  title: string
  tasks: Task[]
}

export interface Project {
  id: string
  title: string
  columns: Column[]
}
