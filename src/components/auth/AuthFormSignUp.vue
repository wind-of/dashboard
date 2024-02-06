<script setup lang="ts">
import { reactive, ref, toRaw } from "vue"
import { useRouter } from "vue-router"
import VInput from "@/components/form/VInput.vue"
import VButton from "@/components/form/VButton.vue"
import { signUpUser } from "@/api"

const router = useRouter()
const error = ref(false)
const doAgreedWithTerms = ref(false)
const state = reactive({
  email: "",
  password: "",
  firstname: ""
})

function handleSubmit() {
  error.value = !doAgreedWithTerms.value
  if (error.value) {
    return
  }
  signUpUser(toRaw(state))
    .then(() => router.push({ name: "login" }))
    .catch(() => (error.value = true))
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
          <VInput placeholder="Enter your name" v-model="state.firstname" />
        </label>
        <label class="input-label">
          <p class="input-title">E-mail</p>
          <VInput placeholder="Type your e-mail" v-model="state.email" />
        </label>
        <label class="input-label">
          <p class="input-title">Password</p>
          <VInput placeholder="Type your password" v-model="state.password" />
          <p class="password-hint">Must be 8 characters at least</p>
        </label>
        <label class="checkbox-wrapper">
          <input type="checkbox" v-model="doAgreedWithTerms" />
          <p>
            By creating an account means you agree to the <b>Terms and Conditions</b>, and our
            <b>Privacy Policy</b>
          </p>
        </label>
        <VButton class="form-button" @click="handleSubmit">Sign up</VButton>
        <p>Already have an account? <RouterLink to="/auth/login">Sign in!</RouterLink></p>
        <p v-if="error">Something went wrong. Check credentials.</p>
      </form>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "~/auth/mixins/auth-form.scss";
</style>
