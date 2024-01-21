import type { Task } from "@/types"

export interface TabletOffsets {
  top: number
  left: number
  width: number
}

export interface TabletSignle extends TabletOffsets {
  task: Task
}
export interface TabletList extends TabletOffsets {
  task: Task[]
}

export type Tablet = TabletSignle | TabletList

export interface TabletWithList extends TabletOffsets {
  list: Task[]
  isList: boolean
}
