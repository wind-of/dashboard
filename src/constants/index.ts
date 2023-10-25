import type { Tag } from "@/types"
import { uid } from "@/utils"

export const DARK_THEME = "dark-theme" as const
export const LIGHT_THEME = "light-theme" as const

export const TAGS: Tag[] = [
  ["Design", "#5051F9"],
  ["Research", "#1EA7FF"],
  ["Planning", "#E97342"],
  ["Content", "#F59E0B"]
].map(([title, color]) => ({ title, color, id: uid("tag") }))
