import { generateColumns, uid } from "../utils/template" 

export const project = {
  id: uid("project"),
  title: "Tasks",
  columns: generateColumns(3)
}
