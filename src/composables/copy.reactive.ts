import { toRaw } from "vue"

export function useCopyReactive<T>(object: T): T {
  return structuredClone(toRaw(object))
}
