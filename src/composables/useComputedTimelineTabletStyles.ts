import { useTabletEdgesCheck } from "@/composables/useTabletEdgesCheck"
import { PERIODS } from "@/constants"
import type { TabletList, TabletSignle } from "@/types"
import { computeBorderRadiusStyle } from "@/utils"

export function useComputedTimelineTabletStyles(
  { task, top, left, width }: TabletSignle,
  period: PERIODS
) {
  const { left: doStartsThisMonth, right: doEndsThisMonth } = useTabletEdgesCheck(task, period)
  const leftBorderRadius = doStartsThisMonth ? {} : computeBorderRadiusStyle("left", 0)
  const rightBorderRadius = doEndsThisMonth ? {} : computeBorderRadiusStyle("right", 0)
  return {
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`,
    ...leftBorderRadius,
    ...rightBorderRadius
  }
}

export function useComputedTimelineTabletListStyles({ top, left, width }: TabletList) {
  return {
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`
  }
}
