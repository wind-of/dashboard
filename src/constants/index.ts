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

export const HOURS_PER_DAY = 24
export const MILLISECONDS_PER_DAY = 3600000

export const TIMELINE_TABLET_WIDTH = 120
export const TIMELINE_TABLET_HEIGHT = 46
export const TIMELINE_TABLET_PROPORTION = TIMELINE_TABLET_WIDTH / HOURS_PER_DAY

export const DEFAULT_TABLET_COLOR = "#5051f9"
