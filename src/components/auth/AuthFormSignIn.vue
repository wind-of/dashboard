<script setup lang="ts">
import { reactive, ref, toRaw } from "vue"
import VInput from "~/form/VInput.vue"
import VButton from "~/form/VButton.vue"
import { useUserStore } from "@/stores/user"
import { signInUser } from "@/api"
import { useRouter } from "vue-router"

const error = ref(false)
const state = reactive({
  email: "",
  password: ""
})
const router = useRouter()
const userStore = useUserStore()

function handleSubmit() {
  error.value = false
  signInUser(toRaw(state))
    .then(({ data }) => {
      userStore.saveUser(data)
      router.push({ name: "home" })
    })
    .catch(() => (error.value = true))
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
          <VInput placeholder="Type your e-mail" v-model="state.email" />
        </label>
        <label class="input-label">
          <p class="input-title">Password</p>
          <VInput placeholder="Type your password" v-model="state.password" />
        </label>
        <VButton class="form-button" @click="handleSubmit">Sign in</VButton>
        <p>Don't have an account? <RouterLink to="/auth/sign-up">Sign up!</RouterLink></p>
        <p v-if="error">Something went wrong. Check credentials.</p>
      </form>
    </div>
  </section>
</template>

<style scoped lang="scss">
@import "~/auth/mixins/auth-form.scss";
</style>
