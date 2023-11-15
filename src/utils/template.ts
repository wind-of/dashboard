import { MILLISECONDS_PER_DAY, NOW, TAGS } from "@/constants"
import type { Column, Tag, Task } from "@/types"

export const rn = (max = 1000) => (Math.random() * max) | 0
export const rs = () =>
  rn()
    .toString()
    .padStart(4, String((Math.random() * 10) | 0))
export const uid = (prefix: string) => `${prefix}-${rs()}-${rs()}-${rs()}-${rs()}`

function randomDate({ period = "day", side = "future", part = 0.5 }) {
  const now = new Date(NOW)
  const millisecondMultiplier = { day: 1, week: 7, month: 30, year: 360 }[period] as number
  const sign = { future: 1, past: -1 }[side] as number
  now.setMilliseconds(sign * (Math.random() * millisecondMultiplier * MILLISECONDS_PER_DAY) * part)
  return now
}

export const task = ({
  title = "Task #" + rn(),
  description = "Description",
  tags = generateTags(),
  expirationDate = randomDate({ side: "future", period: "month" }),
  startDate = randomDate({ side: "past", period: "month" })
} = {}): Task => ({ id: uid("task"), title, description, tags, expirationDate, startDate })
export const column = ({ title = "Column #" + rn(), tasks = generateTasks() } = {}): Column => ({
  id: uid("table"),
  title,
  tasks
})

export const generateTags = (length: number = 0): Tag[] =>
  [...TAGS].sort(() => Math.random() - Math.random()).slice(0, Math.min(length, TAGS.length))
export const generateTasks = (length: number = 0): Task[] =>
  Array.from({ length }, () => task({ tags: generateTags(1) }))
export const generateColumns = (length: number = 0): Column[] =>
  Array.from({ length }, () => column({ tasks: generateTasks(3) }))
