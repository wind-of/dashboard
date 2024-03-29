export * from "./rules"
export * from "./template"
import { PERIODS } from "@/constants"
import type { Task, User } from "@/types"
import { getNearbyDays, getNearbyMonth, getNearbyWeeks, getNearbyYears } from "@/utils/nearby.dates"

export const isTaskInList = (list: Task[], taskId: number) => list.find(({ id }) => id === taskId)

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

export function keyMapper(arrayOfObjects: object[], key: string, value: string) {
  return arrayOfObjects.reduce((acc, obj) => ((acc[obj[key]] = obj[value]), acc), {})
}

export function userFullName(user: User | null | undefined) {
  return `${user?.firstname || ""} ${user?.lastname || ""}`.trim()
}
export function isNullable(value: any) {
  return value === null || value === undefined
}
