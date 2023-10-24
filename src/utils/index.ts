export * from "./template"
import type { Task } from "@/types"

export const isTaskInList = (list: Task[], taskId: string) => list.find(({ id }) => id === taskId)
