import type { Project } from "@/types"
import { generateColumns, uid } from "../utils/template"

export const project: Project = {
  id: uid("project"),
  title: "Tasks",
  columns: generateColumns(3)
}
