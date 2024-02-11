import type { Project } from "@/types"
import { generateColumns, uid } from "@/utils/template"

export const project: Project = {
  id: uid("project"),
  title: "Tasks",
  columns: generateColumns(3)
}

export const mockColumn = {
  id: 999919191919.111,
  title: "Create column",
  lexorank: "aaa",
  tasks: []
}
