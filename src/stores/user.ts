import { userLogoutRequest } from "@/api/auth.requests"
import { getMeRequest } from "@/api/user.requests"
import type { User } from "@/types"
import { defineStore } from "pinia"
import { ref } from "vue"

export const useUserStore = defineStore("user", () => {
  const user = ref<null | User>(null)

  function saveUser(newUser: User) {
    user.value = newUser
  }
  async function updateByAuthenticatedUser() {
    const { data: user } = await getMeRequest()
    saveUser(user)
  }
  function resetUser() {
    user.value = null
  }
  async function logout() {
    await userLogoutRequest()
    resetUser()
  }

  return { user, saveUser, updateByAuthenticatedUser, resetUser, logout }
})
