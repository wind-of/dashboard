const rn = () => ((Math.random() * 1000) | 0).toString().padStart(4, (Math.random() * 10) | 0)
const uid = (prefix) => `${prefix}-${rn()}-${rn()}-${rn()}-${rn()}`

const tag = (title = "Design") => ({ id: uid("tag"), title })
const task = (title = "Task", description = "Description", tags = generateTags(1)) => ({ id: uid("tag"), title, description, tags })
const column = (title = "Column", tasks = generateTasks(3)) => ({ id: uid("tag"), title, tasks })

const generateTags = (length) => Array.from({ length }, () => tag()) 
const generateTasks = (length) => Array.from({ length }, () => task()) 
const generateColumns = (length) => Array.from({ length }, () => column()) 

export const project = {
  id: uid("project"),
  title: "Project Title",
  columns: generateColumns(3)
}
