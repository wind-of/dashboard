<script setup lang="ts">
import { computed, reactive, watchEffect } from "vue"
import { storeToRefs } from "pinia"
import type { UserWithRole } from "@/types"
import { useProjectStore } from "@/stores/project"
import { useCopyReactive } from "@/composables/copy.reactive"
import { getUsersByIds } from "@/api/user.requests"
import InputBlock from "@/components/form/InputBlock.vue"
import VAvatar from "@/components/common/VAvatar.vue"

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
      <section class="users-wrapper">
        <h2>Users</h2>
        <ul class="user-list">
          <li
            v-for="participant in state.participants as UserWithRole[]"
            :key="participant.id"
            class="user-list-item"
          >
            <VAvatar class="user-data" :image="participant.avatar" />
            <section class="user-data user-name">
              {{ participant.firstname }} {{ participant.lastname }}
            </section>
            <section class="user-data user-email">{{ participant.email }}</section>
            <section class="user-data user-role">{{ participant.role }}</section>
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

.users-wrapper {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.user-list {
  width: 80vw;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.user-list-item {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}
.user-data {
  display: flex;
  align-items: center;
  justify-content: space-around;
  font-size: 18px;
  &.user-role {
    width: 10%;
  }
  &.user-name {
    width: 20%;
  }
  &.user-email {
    width: 50%;
  }
}
</style>
