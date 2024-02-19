import { DEFAULT_PERIOD, PERIODS } from "@/constants"
import type { Column } from "@/types"
import { getNearbyPeriods } from "@/utils"

export function useFilterTasksByPeriod(columns: Column[], period: PERIODS = DEFAULT_PERIOD) {
  const { current, next } = getNearbyPeriods(period)
  return columns.map((column) => ({
    ...column,
    tasks: column.tasks.filter(
      ({ startDate, expirationDate }) =>
        new Date(startDate) < next && new Date(expirationDate) > current
    )
  }))
}
