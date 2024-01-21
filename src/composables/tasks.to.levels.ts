import { DEFAULT_PERIOD, DEFAULT_TIMELINE_TABLET_UNIT_WIDTH, PERIOD_UNITS } from "@/constants"
import type { Column, ColumnTask, Tablet } from "@/types"
import {
  doEndAtTheSamePeriod,
  initializeNewTablet,
  initializeNewTabletWithList,
  insertNewTablet
} from "@/utils/timeline"

export function useTasksToLeveledTablets(
  columns: Column[],
  period = DEFAULT_PERIOD,
  timelineUnitWidth: number = DEFAULT_TIMELINE_TABLET_UNIT_WIDTH
) {
  const tasks: ColumnTask[] = columns
    .flatMap(({ tasks, id }) => tasks.map((task) => ({ ...task, columnId: id })))
    .filter(({ startDate, expirationDate }) => startDate && expirationDate)
    .sort((a, b) => +a.startDate - +b.startDate)

  const groupedTasks: { [key: number]: ColumnTask[] } = {}
  const singleTasks: ColumnTask[] = []

  for (let i = 0, currentTask = tasks[i]; i < tasks.length; currentTask = tasks[++i]) {
    const startDate = new Date(currentTask.startDate)
    const expirationDate = new Date(currentTask.expirationDate)
    if (!doEndAtTheSamePeriod(startDate, expirationDate, period)) {
      singleTasks.push(currentTask)
      continue
    }
    // @ts-ignore
    const unitIndex = startDate[PERIOD_UNITS[period]]()
    ;(groupedTasks[unitIndex] || (groupedTasks[unitIndex] = [])).push(currentTask)
  }

  const levels: Tablet[][] = []
  for (let i = 0; i < singleTasks.length; i++)
    insertNewTablet(levels, initializeNewTablet(singleTasks[i], period, timelineUnitWidth))
  for (const [key, value] of Object.entries(groupedTasks))
    insertNewTablet(levels, initializeNewTabletWithList(value, +key, timelineUnitWidth))

  return levels
}
