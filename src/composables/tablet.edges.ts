import type { Task } from "@/types"
import { getClosestMonths } from "@/utils"

export function useTabletEdgesCheck(task: Task) {
  const { current, next } = getClosestMonths()
  const { startDate, expirationDate } = task

  return {
    left: current <= startDate,
    right: next > expirationDate
  }
}
