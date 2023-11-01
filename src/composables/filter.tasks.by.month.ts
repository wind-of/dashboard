import type { Task } from "@/types"

export function useFilterTasksByMonth(tasks: Task[]) {
  const date = new Date()
  const [year, month] = [date.getFullYear(), date.getMonth()]
  const nextMonthDate = new Date(year, month + 1, 1, 0, 0, 0, 0)
  const previousMonthDate = new Date(year, month, 1, 0, 0, 0, 0)

  return tasks.filter(
    ({ startDate }) => startDate < nextMonthDate && startDate >= previousMonthDate
  )
}
