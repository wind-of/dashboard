import {
  DEFAULT_PERIOD,
  MILLISECONDS_PER_DAY,
  MILLISECONDS_PER_HOUR,
  MILLISECONDS_PER_MINUTE,
  NOW,
  PERIODS,
  TIMELINE_DAILY_TABLET_PROPORTION,
  TIMELINE_HOURLY_TABLET_PROPORTION,
  TIMELINE_MONTHLY_TABLET_PROPORTION,
  TIMELINE_TABLET_HEIGHT,
  TIMELINE_TABLET_SECTION_WIDTH
} from "@/constants"
import type { ColumnTask, Tablet, TabletList, TabletSignle } from "@/types"
import { getNearbyPeriods } from "@/utils"

export const timelineUnitStyles = {
  "max-width": `${TIMELINE_TABLET_SECTION_WIDTH}px`,
  "min-width": `${TIMELINE_TABLET_SECTION_WIDTH}px`
}

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

export function taskDateToTabletOffset(start: Date, end: Date, period: PERIODS = DEFAULT_PERIOD) {
  const { current, next } = getNearbyPeriods(period)
  const { milliseconds, proportion } = {
    [PERIODS.day]: {
      milliseconds: MILLISECONDS_PER_MINUTE,
      proportion: TIMELINE_HOURLY_TABLET_PROPORTION
    },
    [PERIODS.week]: {
      milliseconds: MILLISECONDS_PER_HOUR,
      proportion: TIMELINE_DAILY_TABLET_PROPORTION
    },
    [PERIODS.month]: {
      milliseconds: MILLISECONDS_PER_HOUR,
      proportion: TIMELINE_DAILY_TABLET_PROPORTION
    },
    [PERIODS.year]: {
      milliseconds: MILLISECONDS_PER_DAY,
      proportion: TIMELINE_MONTHLY_TABLET_PROPORTION
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
  period: PERIODS = DEFAULT_PERIOD
): TabletSignle {
  return {
    task,
    top: 0,
    ...taskDateToTabletOffset(task.startDate, task.expirationDate, period)
  }
}

export function initializeNewTabletWithList(list: ColumnTask[], offsetIndex: number): TabletList {
  return {
    task: list,
    top: tabletLevelToTopOffset(0),
    width: TIMELINE_TABLET_SECTION_WIDTH,
    left: offsetIndex * TIMELINE_TABLET_SECTION_WIDTH
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
    // console.log(currentTabletLevel)
    console.log(previousTablet?.left, tablet?.left)
    if (doesTabletsIntersect(previousTablet, tablet)) {
      tablet.top = tabletLevelToTopOffset(tabletsLevelIndex)
      currentTabletLevel.push(tablet)
      break
    }
  }
}
