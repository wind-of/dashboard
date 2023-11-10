import type { ColumnTask } from "@/types"

export interface TabletOffsets {
  top: number
  left: number
  width: number
}

export interface TabletSignle extends TabletOffsets {
  task: ColumnTask
}
export interface TabletList extends TabletOffsets {
  task: ColumnTask[]
}

export type Tablet = TabletSignle | TabletList

export interface TabletWithList extends TabletOffsets {
  list: ColumnTask[]
  isList: boolean
}
