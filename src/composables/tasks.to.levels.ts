import type { Column, ColumnTask, Tablet } from "@/types"
import {
  doEndAtTheSamePeriod,
  initializeNewTablet,
  initializeNewTabletWithList,
  insertNewTablet
} from "@/utils/timeline"

export function useTasksToLeveledTablets(columns: Column[]) {
  const tasks: ColumnTask[] = columns
    .flatMap(({ tasks, id }) => tasks.map((task) => ({ ...task, columnId: id })))
    .sort((a, b) => +a.startDate - +b.startDate)
  const levels: Tablet[][] = []

  const groupedTasks: { [key: number]: ColumnTask[] } = {}
  const singleTasks: ColumnTask[] = []

  for (let i = 0, currentTask = tasks[i]; i < tasks.length; currentTask = tasks[++i]) {
    if (!doEndAtTheSamePeriod(currentTask.startDate, currentTask.expirationDate)) {
      singleTasks.push(currentTask)
      continue
    }
    const day = currentTask.startDate.getDate()
    ;(groupedTasks[day] || (groupedTasks[day] = [])).push(currentTask)
  }

  for (let i = 0; i < singleTasks.length; i++)
    insertNewTablet(levels, initializeNewTablet(singleTasks[i]))
  for (const [key, value] of Object.entries(groupedTasks))
    insertNewTablet(levels, initializeNewTabletWithList(value, +key))

  return levels
}
