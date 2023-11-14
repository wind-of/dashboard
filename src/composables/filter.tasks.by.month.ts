import { PERIODS } from "@/constants"
import type { Column } from "@/types"
import { getNearbyPeriods } from "@/utils"

export function useFilterTasksByPeriod(columns: Column[], period: PERIODS = PERIODS.month) {
  const { current, next } = getNearbyPeriods(period)
  columns.forEach(
    (column) =>
      (column.tasks = column.tasks.filter(
        ({ startDate, expirationDate }) => startDate < next && expirationDate > current
      ))
  )
  return columns
}
