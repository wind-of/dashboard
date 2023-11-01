import {
  MILLISECONDS_PER_DAY,
  TIMELINE_TABLET_HEIGHT,
  TIMELINE_TABLET_PROPORTION
} from "@/constants"
import type { Column, ColumnTask, Tablet } from "@/types"
import { getClosestMonths } from "@/utils"

function tabletLevelToTopOffset(levelIndex: number) {
  return levelIndex * TIMELINE_TABLET_HEIGHT
}
function taskDateToTabletOffset(start: Date, end: Date) {
  const { current: currentMonth, next: nextMonth } = getClosestMonths()
  start = start < currentMonth ? currentMonth : start
  end = end >= nextMonth ? nextMonth : end

  const width = ((+end - +start) / MILLISECONDS_PER_DAY) * TIMELINE_TABLET_PROPORTION
  const left = ((+start - +currentMonth) / MILLISECONDS_PER_DAY) * TIMELINE_TABLET_PROPORTION
  return { width, left }
}
function shouldInsertTablet(previousTablet: Tablet, newTablet: Tablet) {
  return (
    !previousTablet ||
    previousTablet.left + previousTablet.width <= newTablet.left ||
    newTablet.left + newTablet.width <= previousTablet.left
  )
}
function initializeNewTablet(task: ColumnTask, tabletLevel: number) {
  return {
    task: task,
    top: tabletLevelToTopOffset(tabletLevel),
    ...taskDateToTabletOffset(task.startDate, task.expirationDate)
  }
}

export function useTasksToLeveledTablets(columns: Column[]) {
  const tasks: ColumnTask[] = columns
    .flatMap(({ tasks, id }) => tasks.map((task) => ({ ...task, columnId: id })))
    .sort((a, b) => +a.startDate - +b.startDate)
  const levels: Tablet[][] = []

  for (let i = 0, currentTask = tasks[i]; i < tasks.length; currentTask = tasks[++i]) {
    for (let tabletsLevelIndex = 0; ; tabletsLevelIndex++) {
      if (!levels[tabletsLevelIndex]) {
        levels.push([])
      }
      const currentTabletLevel = levels[tabletsLevelIndex]
      const previousTablet = currentTabletLevel.findLast(
        ({ task }: { task: ColumnTask }) => task.startDate <= currentTask.startDate
      )
      const newTablet = initializeNewTablet(currentTask, tabletsLevelIndex)
      if (shouldInsertTablet(previousTablet, newTablet)) {
        currentTabletLevel.push(newTablet)
        break
      }
    }
  }
  return levels
}
