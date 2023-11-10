export * from "./template"
import type { Task } from "@/types"

export const isTaskInList = (list: Task[], taskId: string) => list.find(({ id }) => id === taskId)

export function getClosestMonths() {
  const date = new Date()
  const [year, month] = [date.getFullYear(), date.getMonth()]
  const previous = new Date(date.getFullYear(), date.getMonth() - 1, 1, 0, 0, 0, 0)
  const current = new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0)
  const next = new Date(year, month + 1, 1, 0, 0, 0, 0)
  return {
    previous,
    current,
    next
  }
}

export function computeBorderRadiusStyle(side: "left" | "right", size: number) {
  return {
    [`border-top-${side}-radius`]: `${size}px`,
    [`border-bottom-${side}-radius`]: `${size}px`
  }
}
