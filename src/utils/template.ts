import { TAGS } from "@/constants"
import type { Column, Tag, Task } from "@/types"

export const rn = (max = 1000) => (Math.random() * max) | 0
export const rs = () =>
  rn()
    .toString()
    .padStart(4, String((Math.random() * 10) | 0))
export const uid = (prefix: string) => `${prefix}-${rs()}-${rs()}-${rs()}-${rs()}`

const now = new Date()
export const randomFutureDate = () =>
  new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDay() + rn(15)))
export const randomPastDate = () =>
  new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDay() - rn(15)))

export const task = ({
  title = "Task #" + rn(),
  description = "Description",
  tags = generateTags(),
  expirationDate = randomFutureDate(),
  startDate = randomPastDate()
} = {}): Task => ({ id: uid("task"), title, description, tags, expirationDate, startDate })
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
