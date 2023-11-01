import { useTabletEdgesCheck } from "@/composables/tablet.edges"
import type { Tablet } from "@/types"
import { computeBorderRadiusStyle, randomRGB } from "@/utils"

export function useComputedTimelineTabletStyles({ task, top, left, width }: Tablet) {
  const { left: doStartsThisMonth, right: doEndsThisMonth } = useTabletEdgesCheck(task)
  const leftBorderRadius = doStartsThisMonth ? {} : computeBorderRadiusStyle("left", 0)
  const rightBorderRadius = doEndsThisMonth ? {} : computeBorderRadiusStyle("right", 0)
  return {
    left: `${left}px`,
    top: `${top}px`,
    width: `${width}px`,
    background: randomRGB(),
    ...leftBorderRadius,
    ...rightBorderRadius
  }
}
