import type { User } from "@/types"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useUserStore = defineStore("user", () => {
  const user = ref<null | User>(null)
  function saveUser(newUser: User) {
    user.value = newUser
  }

  return { user, saveUser }
})
