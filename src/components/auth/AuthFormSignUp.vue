<script setup lang="ts">
import { computed, reactive, ref, toRaw, watch } from "vue"
import { useRouter } from "vue-router"
import VInput from "@/components/form/VInput.vue"
import VButton from "@/components/form/VButton.vue"
import { signUpUser } from "@/api"
import { rules } from "@/utils"

const router = useRouter()
const serverError = ref(false)
const doAgreedWithTerms = ref(false)
const state = reactive({
  email: {
    value: "",
    error: ""
  },
  password: {
    value: "",
    error: ""
  },
  firstname: {
    value: "",
    error: ""
  }
})

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
watch(state.firstname, () => {
  const value = state.firstname.value.trim()
  state.firstname.error =
    rules.minLength(value, 2) && rules.maxLength(value, 64)
      ? ""
      : "Name must be 2 characters at least and no more than 64"
})
const isButtonDisabled = computed(
  () =>
    !state.email.value ||
    !state.password.value ||
    !state.firstname.value ||
    state.email.error ||
    state.password.error ||
    state.firstname.error ||
    !doAgreedWithTerms.value
)
function handleSubmit() {
  const { email, password, firstname } = toRaw(state)
  if (serverError.value) {
    return
  }
  signUpUser({
    email: email.value.trim(),
    password: password.value.trim(),
    firstname: firstname.value.trim()
  })
    .then(() => router.push({ name: "login" }))
    .catch(() => (serverError.value = true))
}
</script>

<template>
  <section class="form-wrapper">
    <div class="form-inner-wrapper">
      <header class="form-header">
        <h2 class="form-title">Create your accont</h2>
        <p class="form-subtitle">Free to use</p>
      </header>
      <form class="form" @submit.prevent>
        <label class="input-label">
          <p class="input-title">First Name</p>
          <VInput placeholder="Enter your name" v-model="state.firstname.value" />
          <p class="input-error-text">{{ state.firstname.error }}</p>
        </label>
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
        <label class="checkbox-wrapper">
          <input type="checkbox" v-model="doAgreedWithTerms" />
          <p>
            By creating an account means you agree to the <b>Terms and Conditions</b>, and our
            <b>Privacy Policy</b>
          </p>
        </label>
        <VButton class="form-button" :disabled="isButtonDisabled" @click="handleSubmit"
          >Sign up</VButton
        >
        <p>Already have an account? <RouterLink to="/auth/login">Sign in!</RouterLink></p>
        <p v-if="serverError">Something went wrong. Please try again or check your credentials.</p>
      </form>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "@/components/auth/mixins/auth-form.scss";
</style>
