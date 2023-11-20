import type { Tag } from "@/types"
import { uid } from "@/utils"

export const NOW = new Date()

export const DARK_THEME = "dark-theme" as const
export const LIGHT_THEME = "light-theme" as const

export const TAGS: Tag[] = [
  ["Design", "#5051F9"],
  ["Research", "#1EA7FF"],
  ["Planning", "#E97342"],
  ["Content", "#F59E0B"]
].map(([title, color]) => ({ title, color, id: uid("tag") }))

export const MINUTES_PER_HOUR = 60
export const HOURS_PER_DAY = 24
export const DAYS_PER_MONTH = 30.4167

export const MILLISECONDS_PER_DAY = 86_400_000
export const MILLISECONDS_PER_HOUR = 3_600_000
export const MILLISECONDS_PER_MINUTE = 60_000

export const TIMELINE_TABLET_HEIGHT = 46
export const DEFAULT_TIMELINE_TABLET_UNIT_WIDTH = 120

export const DEFAULT_SINGLE_TABLET_COLOR = "#5051f9" as const
export const DEFAULT_GROUPED_TABLET_COLOR = "#1EA7FF" as const

export enum PERIODS {
  day = "day",
  week = "week",
  month = "month",
  year = "year"
}

export const DEFAULT_PERIOD = PERIODS.month

export const PERIOD_UNITS = {
  [PERIODS.day]: "getHours",
  [PERIODS.week]: "getDate",
  [PERIODS.month]: "getDate",
  [PERIODS.year]: "getMonth"
}
