export const rn = () => (Math.random() * 1000) | 0
export const rs = () => rn().toString().padStart(4, (Math.random() * 10) | 0)
export const uid = (prefix) => `${prefix}-${rs()}-${rs()}-${rs()}-${rs()}`

export const tag = ({ title = "Design #" + rn() }) => ({ id: uid("tag"), title })
export const task = ({ title = "Task #" + rn(), description = "Description", tags = generateTags() }) => ({ id: uid("task"), title, description, tags })
export const column = ({ title = "Column #" + rn(), tasks = generateTasks() }) => ({ id: uid("table"), title, tasks })

export const generateTags = (length) => Array.from({ length }, () => tag({})) 
export const generateTasks = (length) => Array.from({ length }, () => task({ tags: generateTags(1) })) 
export const generateColumns = (length) => Array.from({ length }, () => column({ tasks: generateTasks(3) })) 