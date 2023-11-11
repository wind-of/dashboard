import type { PERIODS } from "@/constants"
import type { Task } from "@/types"
import { getNearbyPeriods } from "@/utils"

export function useTabletEdgesCheck(task: Task, period: PERIODS) {
  const { current, next } = getNearbyPeriods(period)
  const { startDate, expirationDate } = task

  return {
    left: current <= startDate,
    right: next > expirationDate
  }
}
