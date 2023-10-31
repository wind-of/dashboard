export * from "./template"
import type { Task } from "@/types"

export const isTaskInList = (list: Task[], taskId: string) => list.find(({ id }) => id === taskId)

export function randomRGB() {
  const r = () => (Math.random() * 255) | 0
  return `rgb(${r()}, ${r()}, ${r()})`
}
