import type { Column } from "@/types"
import { getClosestMonths } from "@/utils"

export function useFilterTasksByMonth(columns: Column[]) {
  const { next: nextMonth } = getClosestMonths()
  columns.forEach(
    (column) => (column.tasks = column.tasks.filter(({ startDate }) => startDate < nextMonth))
  )
  return columns
}
