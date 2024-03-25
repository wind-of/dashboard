<script setup lang="ts">
import { computed, ref, toRaw, watch } from "vue"
import VInput from "@/components/form/VInput.vue"
import VButton from "@/components/form/VButton.vue"
import { useUserStore } from "@/stores/user"
import { userAuthorizationRequest } from "@/api/auth.requests"
import { useRouter } from "vue-router"
import { rules } from "@/utils"
import { useParticipatingProjectsStore } from "@/stores/participating.projects"
import { createFormState } from "@/utils/form.state"
import { HOME_ROUTE_NAME, REGISTER_ROUTE_NAME } from "@/router"

const router = useRouter()
const userStore = useUserStore()
const projectsStore = useParticipatingProjectsStore()

const serverError = ref(false)
const state = createFormState(["email", "password"], {
  email: [rules.required, rules.email],
  password: [rules.required, rules.minLength(8), rules.maxLength(64)]
})
watch(state, () => (serverError.value = false))
const isButtonDisabled = computed(
  () => !state.email.value || !state.password.value || !!state.email.error || !!state.password.error
)

function handleSubmit() {
  const { email, password } = toRaw(state)
  serverError.value = false
  userAuthorizationRequest({ email: email.value.trim(), password: password.value.trim() })
    .then(async ({ data }) => {
      await projectsStore.updateProjectsList()
      userStore.saveUser(data)
      router.push({ name: HOME_ROUTE_NAME })
    })
    .catch(() => (serverError.value = true))
}
</script>

<template>
  <section class="form-wrapper">
    <div class="form-inner-wrapper">
      <header class="form-header">
        <h2 class="form-title">Sign in to your accont</h2>
        <p class="form-subtitle">Free to use</p>
      </header>
      <form class="form" @submit.prevent>
        <label class="input-label">
          <p class="input-title">E-mail</p>
          <VInput placeholder="Type your e-mail" v-model="state.email.value" />
          <p class="input-error-text">{{ state.email.error }}</p>
        </label>
        <label class="input-label">
          <p class="input-title">Password</p>
          <VInput placeholder="Type your password" v-model="state.password.value" />
          <p class="input-error-text">{{ state.password.error }}</p>
          <p class="password-hint">Must be 8 characters at least</p>
        </label>
        <VButton class="form-button" :disabled="isButtonDisabled" @click="handleSubmit"
          >Sign in</VButton
        >
        <p>Don't have an account? <RouterLink :to="REGISTER_ROUTE_NAME">Sign up!</RouterLink></p>
        <p v-if="serverError" class="server-error">
          Something went wrong. Please try again or check your credentials.
        </p>
      </form>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "@/components/auth/mixins/auth-form.scss";
</style>
