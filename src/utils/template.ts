import { MILLISECONDS_PER_DAY, NOW, TAGS } from "@/constants"
import type { Column, Tag, Task } from "@/types"

const randomURL =
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/c84a28d6-25cb-4bb5-80a0-c780a9c982b2/d256hvc-551d4bd0-071b-440a-a33d-d28cad14a33b.jpg/v1/fit/w_700,h_467,q_70,strp/enchantment_by_thomas_koidhis_d256hvc-375w-2x.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NDY3IiwicGF0aCI6IlwvZlwvYzg0YTI4ZDYtMjVjYi00YmI1LTgwYTAtYzc4MGE5Yzk4MmIyXC9kMjU2aHZjLTU1MWQ0YmQwLTA3MWItNDQwYS1hMzNkLWQyOGNhZDE0YTMzYi5qcGciLCJ3aWR0aCI6Ijw9NzAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.nUdXokjPqtXIOXS2yNaOQLs05MTIkaHTPwq84vkLQB4"

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
  shortDescription = "Short description",
  description = "Description",
  tags = generateTags(),
  comments = [],
  preview = Math.random() > 0.8 ? randomURL : "",
  expirationDate = randomDate({ side: "future", period: "month" }),
  startDate = randomDate({ side: "past", period: "month" })
} = {}): Task => ({
  id: rn(10 ** 8),
  title,
  shortDescription,
  description,
  tags,
  comments,
  preview,
  expirationDate,
  startDate
})
export const column = ({ title = "Column #" + rn(), tasks = generateTasks() } = {}): Column => ({
  id: rn(10 ** 8),
  title,
  tasks
})

export const generateTags = (length: number = 0): Tag[] =>
  [...TAGS]
    .sort(() => Math.random() - Math.random())
    .slice(0, Math.min(length, TAGS.length))
    .map((tag) => ({ ...tag, id: Math.random() * 10 ** 8, uniqueId: uid("tag") }))
export const generateTasks = (length: number = 0): Task[] =>
  Array.from({ length }, () => task({ tags: generateTags(1) }))
export const generateColumns = (length: number = 0): Column[] =>
  Array.from({ length }, () => column({ tasks: generateTasks(3) }))
