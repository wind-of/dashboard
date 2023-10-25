import { TAGS } from "@/constants"
import type { Column, Tag, Task } from "@/types"

export const rn = () => (Math.random() * 1000) | 0
export const rs = () =>
  rn()
    .toString()
    .padStart(4, String((Math.random() * 10) | 0))
export const uid = (prefix: string) => `${prefix}-${rs()}-${rs()}-${rs()}-${rs()}`

export const task = ({
  title = "Task #" + rn(),
  description = "Description",
  tags = generateTags()
} = {}): Task => ({ id: uid("task"), title, description, tags })
export const column = ({ title = "Column #" + rn(), tasks = generateTasks() } = {}): Column => ({
  id: uid("table"),
  title,
  tasks
})

export const generateTags = (length: number = 0): Tag[] =>
  [...TAGS].sort((_, __) => Math.random() - Math.random()).slice(0, Math.min(length, TAGS.length))
export const generateTasks = (length: number = 0): Task[] =>
  Array.from({ length }, () => task({ tags: generateTags(1) }))
export const generateColumns = (length: number = 0): Column[] =>
  Array.from({ length }, () => column({ tasks: generateTasks(3) }))
