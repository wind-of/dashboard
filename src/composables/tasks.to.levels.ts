import { DEFAULT_PERIOD, PERIOD_UNITS } from "@/constants"
import type { Column, ColumnTask, Tablet } from "@/types"
import {
  doEndAtTheSamePeriod,
  initializeNewTablet,
  initializeNewTabletWithList,
  insertNewTablet
} from "@/utils/timeline"

export function useTasksToLeveledTablets(columns: Column[], period = DEFAULT_PERIOD) {
  const tasks: ColumnTask[] = columns
    .flatMap(({ tasks, id }) => tasks.map((task) => ({ ...task, columnId: id })))
    .sort((a, b) => +a.startDate - +b.startDate)

  const groupedTasks: { [key: number]: ColumnTask[] } = {}
  const singleTasks: ColumnTask[] = []

  for (let i = 0, currentTask = tasks[i]; i < tasks.length; currentTask = tasks[++i]) {
    if (!doEndAtTheSamePeriod(currentTask.startDate, currentTask.expirationDate, period)) {
      singleTasks.push(currentTask)
      continue
    }
    // @ts-ignore
    const unitIndex = currentTask.startDate[PERIOD_UNITS[period]]()
    ;(groupedTasks[unitIndex] || (groupedTasks[unitIndex] = [])).push(currentTask)
  }

  const levels: Tablet[][] = []
  for (let i = 0; i < singleTasks.length; i++)
    insertNewTablet(levels, initializeNewTablet(singleTasks[i], period))
  for (const [key, value] of Object.entries(groupedTasks))
    insertNewTablet(levels, initializeNewTabletWithList(value, +key))

  return levels
}
