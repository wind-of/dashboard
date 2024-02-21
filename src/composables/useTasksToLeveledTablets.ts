import { DEFAULT_PERIOD, DEFAULT_TIMELINE_TABLET_UNIT_WIDTH, PERIOD_UNITS } from "@/constants"
import type { Tablet, Task } from "@/types"
import {
  doEndAtTheSamePeriod,
  initializeNewTablet,
  initializeNewTabletWithList,
  insertNewTablet
} from "@/utils/timeline"

export function useTasksToLeveledTablets(
  initialTasks: Task[],
  period = DEFAULT_PERIOD,
  timelineUnitWidth: number = DEFAULT_TIMELINE_TABLET_UNIT_WIDTH
) {
  const tasks: Task[] = initialTasks
    .filter(({ startDate, expirationDate }) => startDate && expirationDate)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())

  const groupedTasks: { [key: number]: Task[] } = {}
  const singleTasks: Task[] = []

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
    insertNewTablet(levels, initializeNewTabletWithList(value, +key - 1, timelineUnitWidth))

  return levels
}
