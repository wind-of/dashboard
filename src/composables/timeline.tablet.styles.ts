import { useTabletEdgesCheck } from "@/composables/tablet.edges"
import { DEFAULT_TABLET_COLOR } from "@/constants"
import type { Tablet } from "@/types"
import { computeBorderRadiusStyle } from "@/utils"

export function useComputedTimelineTabletStyles({ task, top, left, width }: Tablet) {
  const { left: doStartsThisMonth, right: doEndsThisMonth } = useTabletEdgesCheck(task)
  const leftBorderRadius = doStartsThisMonth ? {} : computeBorderRadiusStyle("left", 0)
  const rightBorderRadius = doEndsThisMonth ? {} : computeBorderRadiusStyle("right", 0)
  const background = task.tags[0]?.color || DEFAULT_TABLET_COLOR
  return {
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`,
    background,
    ...leftBorderRadius,
    ...rightBorderRadius
  }
}
