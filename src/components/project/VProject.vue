<script setup lang="ts">
import { computed, reactive, watchEffect } from "vue"
import { storeToRefs } from "pinia"
import type { UserWithRole } from "@/types"
import { useProjectStore } from "@/stores/project"
import { useCopyReactive } from "@/composables/copy.reactive"
import InputBlock from "@/components/form/InputBlock.vue"
import { getUsersByIds } from "@/api/user.requests"

const projectStore = useProjectStore()
const { project } = storeToRefs(projectStore)
const roles = computed(() =>
  project.value?.participants.reduce((acc, { role, userId }) => {
    acc[userId] = role
    return acc
  }, {})
)
const form = computed(() => ({
  state: reactive({ ...useCopyReactive(project.value), participants: [] })
}))
const state = computed(() => form.value.state)
watchEffect(async () => {
  if (!project.value?.participants) {
    return
  }
  const { data: users } = await getUsersByIds(
    project.value.participants.map(({ userId }) => userId)
  )
  form.value.state.participants = users.map((user) => ({ ...user, role: roles.value![user.id] }))
})
</script>

<template>
  <section class="project">
    <header>
      <h1 class="title">Project's settings</h1>
    </header>
    <form class="form">
      <InputBlock v-model="state.title" label="Title" />
      <section>
        <h2>Users</h2>
        <ul class="user-list">
          <li v-for="participant in state.participants as UserWithRole[]" :key="participant.id">
            {{ participant }}
          </li>
        </ul>
      </section>
    </form>
  </section>
</template>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  gap: 50px;
}
.title {
  font-size: 32px;
  margin-bottom: 50px;
}
</style>
