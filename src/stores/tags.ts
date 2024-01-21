import type { Tag } from "@/types"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useTagsStore = defineStore("tags", () => {
  const tags = ref<Tag[]>([])
  function saveTags(newTags: Tag[]) {
    tags.value = newTags
  }

  return { tags, saveTags }
})
