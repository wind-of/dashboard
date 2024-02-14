<script setup lang="ts">
import { computed, reactive, ref, toRaw, watch } from "vue"
import VInput from "@/components/form/VInput.vue"
import VButton from "@/components/form/VButton.vue"
import { useUserStore } from "@/stores/user"
import { signInUser } from "@/api"
import { useRouter } from "vue-router"
import { rules } from "@/utils"
import { useParticipatingProjectsStore } from "@/stores/participating.projects"

const serverError = ref(false)
const state = reactive({
  email: {
    value: "",
    error: ""
  },
  password: {
    value: "",
    error: ""
  }
})
const router = useRouter()
const userStore = useUserStore()
const projectsStore = useParticipatingProjectsStore()

watch(state, () => (serverError.value = false))
watch(state.email, () => {
  const value = state.email.value.trim()
  state.email.error = rules.email(value) ? "" : "Invalid email"
})
watch(state.password, () => {
  const value = state.password.value.trim()
  state.password.error =
    rules.minLength(value, 8) && rules.maxLength(value, 64)
      ? ""
      : "Password must be 8 characters at least and no more than 64"
})
const isButtonDisabled = computed(
  () => !state.email.value || !state.password.value || !!state.email.error || !!state.password.error
)

function handleSubmit() {
  const { email, password } = toRaw(state)
  serverError.value = false
  signInUser({ email: email.value.trim(), password: password.value.trim() })
    .then(async ({ data }) => {
      await projectsStore.updateProjectsList()
      userStore.saveUser(data)
      router.push({ name: "home" })
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
        <p>Don't have an account? <RouterLink to="/auth/sign-up">Sign up!</RouterLink></p>
        <p v-if="serverError">Something went wrong. Please try again or check your credentials.</p>
      </form>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "@/components/auth/mixins/auth-form.scss";
</style>
