export * from "./template"
import { PERIODS } from "@/constants"
import type { Task } from "@/types"
import { getNearbyDays, getNearbyMonth, getNearbyWeeks, getNearbyYears } from "@/utils/nearby.dates"

export const isTaskInList = (list: Task[], taskId: string) => list.find(({ id }) => id === taskId)

export function getNearbyPeriods(period: PERIODS) {
  return {
    [PERIODS.day]: getNearbyDays,
    [PERIODS.week]: getNearbyWeeks,
    [PERIODS.month]: getNearbyMonth,
    [PERIODS.year]: getNearbyYears
  }[period]()
}

export function computeBorderRadiusStyle(side: "left" | "right", size: number) {
  return {
    [`border-top-${side}-radius`]: `${size}px`,
    [`border-bottom-${side}-radius`]: `${size}px`
  }
}
