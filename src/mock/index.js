const rn = () => (Math.random() * 1000) | 0
const rs = () => rn().toString().padStart(4, (Math.random() * 10) | 0)
const uid = (prefix) => `${prefix}-${rs()}-${rs()}-${rs()}-${rs()}`

const tag = (title = "Design #" + rn()) => ({ id: uid("tag"), title })
const task = (title = "Task #" + rn(), description = "Description", tags = generateTags(1)) => ({ id: uid("task"), title, description, tags })
const column = (title = "Column #" + rn(), tasks = generateTasks(3)) => ({ id: uid("table"), title, tasks })

const generateTags = (length) => Array.from({ length }, () => tag()) 
const generateTasks = (length) => Array.from({ length }, () => task()) 
const generateColumns = (length) => Array.from({ length }, () => column()) 

export const project = {
  id: uid("project"),
  title: "Tasks",
  columns: generateColumns(3)
}
