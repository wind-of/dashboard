import {
  MILLISECONDS_PER_HOUR,
  NOW,
  PERIODS,
  TIMELINE_TABLET_HEIGHT,
  TIMELINE_TABLET_PROPORTION,
  TIMELINE_TABLET_SECTION_WIDTH
} from "@/constants"
import type { ColumnTask, Tablet, TabletList, TabletSignle } from "@/types"
import { getNearbyPeriods } from "@/utils"

export const timelineUnitStyles = {
  "max-width": `${TIMELINE_TABLET_SECTION_WIDTH}px`,
  "min-width": `${TIMELINE_TABLET_SECTION_WIDTH}px`
}

export function doEndAtTheSamePeriod(start: Date, end: Date) {
  // @ts-ignore
  return ["getFullYear", "getMonth", "getDate"].every((method) => start[method]() === end[method]())
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

export function taskDateToTabletOffset(start: Date, end: Date, period: PERIODS = PERIODS.month) {
  let width = 0,
    left = 0
  if (period === PERIODS.month) {
    const { current: currentMonth, next: nextMonth } = getNearbyPeriods(period)
    const startMS = +(start < currentMonth ? currentMonth : start)
    const endMS = +(end >= nextMonth ? nextMonth : end)
    const currentMonthMS = +currentMonth

    width = ((endMS - startMS) / MILLISECONDS_PER_HOUR) * TIMELINE_TABLET_PROPORTION
    left = ((startMS - currentMonthMS) / MILLISECONDS_PER_HOUR) * TIMELINE_TABLET_PROPORTION
  }
  // if(period === PERIODS.year) {

  // }
  return { width, left }
}

export function doesTabletsIntersect(firstTablet: Tablet, secondTablet: Tablet) {
  return (
    !firstTablet ||
    firstTablet.left + firstTablet.width <= secondTablet.left ||
    secondTablet.left + secondTablet.width <= firstTablet.left
  )
}

export function initializeNewTablet(
  task: ColumnTask,
  period: PERIODS = PERIODS.month
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
    const previousTablet = currentTabletLevel.findLast((item: Tablet) => item.left <= tablet.left)
    if (doesTabletsIntersect(previousTablet, tablet)) {
      tablet.top = tabletLevelToTopOffset(tabletsLevelIndex)
      currentTabletLevel.push(tablet)
      break
    }
  }
}
