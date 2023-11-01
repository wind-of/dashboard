import type { Task } from "@/types"
import { getClosestMonths } from "@/utils"

export function useFilterTasksByMonth(tasks: Task[]) {
  const { next: nextMonth } = getClosestMonths()

  return tasks.filter(({ startDate }) => startDate < nextMonth)
}
