import {
  DAYS_PER_MONTH,
  DEFAULT_PERIOD,
  DEFAULT_TIMELINE_TABLET_UNIT_WIDTH,
  HOURS_PER_DAY,
  MILLISECONDS_PER_DAY,
  MILLISECONDS_PER_HOUR,
  MILLISECONDS_PER_MINUTE,
  MINUTES_PER_HOUR,
  NOW,
  PERIODS,
  TIMELINE_TABLET_HEIGHT
} from "@/constants"
import type { ColumnTask, Tablet, TabletList, TabletSignle } from "@/types"
import { getNearbyPeriods } from "@/utils"

export const computedTimelineUnitStyles = (width: number) => ({
  "max-width": `${width}px`,
  "min-width": `${width}px`
})

export function doEndAtTheSamePeriod(start: Date, end: Date, period: PERIODS) {
  const methods = {
    [PERIODS.day]: ["getFullYear", "getMonth", "getDate", "getHours"],
    [PERIODS.week]: ["getFullYear", "getMonth", "getDate"],
    [PERIODS.month]: ["getFullYear", "getMonth", "getDate"],
    [PERIODS.year]: ["getFullYear", "getMonth"]
  }[period]
  // @ts-ignore
  return methods.every((method) => start[method]() === end[method]())
}

export function getDaysCountInCurrentMonth() {
  return new Date(NOW.getFullYear(), NOW.getMonth() + 1, 0).getDate()
}

export function unitsCountInPeriod(period: PERIODS) {
  return {
    [PERIODS.day]: 24,
    [PERIODS.week]: 7,
    [PERIODS.month]: getDaysCountInCurrentMonth(),
    [PERIODS.year]: 12
  }[period]
}

export function tabletLevelToTopOffset(levelIndex: number) {
  return levelIndex * TIMELINE_TABLET_HEIGHT
}

export function taskDateToTabletOffset(
  start: Date,
  end: Date,
  period: PERIODS = DEFAULT_PERIOD,
  timelineUnitWidth: number = DEFAULT_TIMELINE_TABLET_UNIT_WIDTH
) {
  const { current, next } = getNearbyPeriods(period)
  const { milliseconds, proportion } = {
    [PERIODS.day]: {
      milliseconds: MILLISECONDS_PER_MINUTE,
      proportion: timelineUnitWidth / MINUTES_PER_HOUR
    },
    [PERIODS.week]: {
      milliseconds: MILLISECONDS_PER_HOUR,
      proportion: timelineUnitWidth / HOURS_PER_DAY
    },
    [PERIODS.month]: {
      milliseconds: MILLISECONDS_PER_HOUR,
      proportion: timelineUnitWidth / HOURS_PER_DAY
    },
    [PERIODS.year]: {
      milliseconds: MILLISECONDS_PER_DAY,
      proportion: timelineUnitWidth / DAYS_PER_MONTH
    }
  }[period]
  const startMS = +(start < current ? current : start)
  const endMS = +(end >= next ? next : end)
  const currentMS = +current

  const width = ((endMS - startMS) / milliseconds) * proportion
  const left = ((startMS - currentMS) / milliseconds) * proportion

  return { width, left }
}

export function doesTabletsIntersect(firstTablet: Tablet | undefined, secondTablet: Tablet) {
  return (
    !firstTablet ||
    firstTablet.left + firstTablet.width <= secondTablet.left ||
    secondTablet.left + secondTablet.width <= firstTablet.left
  )
}

export function initializeNewTablet(
  task: ColumnTask,
  period: PERIODS = DEFAULT_PERIOD,
  timelineUnitWidth: number
): TabletSignle {
  return {
    task,
    top: 0,
    ...taskDateToTabletOffset(task.startDate, task.expirationDate, period, timelineUnitWidth)
  }
}

export function initializeNewTabletWithList(
  list: ColumnTask[],
  offsetIndex: number,
  timelineUnitWidth: number
): TabletList {
  const unitWidth = Math.max(timelineUnitWidth, DEFAULT_TIMELINE_TABLET_UNIT_WIDTH)
  return {
    task: list,
    top: tabletLevelToTopOffset(0),
    width: unitWidth,
    left: offsetIndex * unitWidth
  }
}

export function insertNewTablet(levels: Tablet[][], tablet: Tablet) {
  for (let tabletsLevelIndex = 0; ; tabletsLevelIndex++) {
    if (!levels[tabletsLevelIndex]) {
      levels.push([])
    }
    const currentTabletLevel = levels[tabletsLevelIndex]
    // @ts-ignore
    const previousTablet = currentTabletLevel.at(-1)
    if (doesTabletsIntersect(previousTablet, tablet)) {
      tablet.top = tabletLevelToTopOffset(tabletsLevelIndex)
      currentTabletLevel.push(tablet)
      break
    }
  }
}
