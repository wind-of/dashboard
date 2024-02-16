<script setup lang="ts">
import VButton from "@/components/form/VButton.vue"
import InputBlock from "@/components/form/InputBlock.vue"
import { useUserStore } from "@/stores/user"
import { createFormState } from "@/utils/form.state"
import { rules } from "@/utils"
import { computed, ref } from "vue"
import { useRouter } from "vue-router"
import VDivider from "@/components/common/VDivider.vue"
import { useCopyReactive } from "@/composables/copy.reactive"
import { User } from "@/types"

const userStore = useUserStore()
const router = useRouter()

const canEdit = ref(false)
const state = computed(() =>
  createFormState(
    ["email", "firstname", "lastname"],
    {
      email: [rules.required, rules.email],
      firstname: [rules.required, rules.minLength(2), rules.maxLength(64)]
    },
    useCopyReactive(userStore.user as User)
  )
)

const isSaveButtonDisabled = computed(
  () => !!state.value.firstname.error || !!state.value.email.error
)

async function handleUserUpdate() {
  canEdit.value = false
  // TODO:
}
async function handleLogout() {
  await userStore.logout()
  await router.push({ name: "login" })
}
</script>

<template>
  <form class="form" @submit.prevent>
    <section class="input-group">
      <InputBlock
        class="form-input"
        v-model="state.firstname.value"
        label="First Name"
        :disabled="!canEdit"
        :error="state.firstname.error"
      />
      <InputBlock
        class="form-input"
        v-model="state.lastname.value"
        label="Second Name"
        :disabled="!canEdit"
        :error="state.lastname.error"
      />
    </section>
    <VDivider />
    <InputBlock
      class="form-input"
      v-model="state.email.value"
      label="Email"
      :disabled="!canEdit"
      :error="state.email.error"
    />
    <div class="buttons">
      <VButton isDanger @click="handleLogout">Logout</VButton>
      <VButton v-if="canEdit" isPrimary @click="handleUserUpdate" :disabled="isSaveButtonDisabled"
        >Save</VButton
      >
      <VButton v-else @click="canEdit = true">Edit</VButton>
    </div>
  </form>
</template>

<style scoped lang="scss">
.form {
  @include flex-column;
  gap: 20px;
  max-width: 600px;

  .input-group {
    @include flex-row;
    gap: 30px;
  }

  .form-input {
    width: 100%;
  }
}
.buttons {
  @include flex-row;
  gap: 15px;
}
</style>
