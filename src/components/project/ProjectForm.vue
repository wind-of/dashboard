<script setup lang="ts">
import { computed, reactive, watchEffect } from "vue"
import { storeToRefs } from "pinia"
import type { UserWithRole } from "@/types"
import { ParticipantRolesEnum } from "@/types"
import { useProjectStore } from "@/stores/project"
import { useCopyReactive } from "@/composables/copy.reactive"
import { getUsersByIds } from "@/api/user.requests"
import InputBlock from "@/components/form/InputBlock.vue"
import VAvatar from "@/components/common/VAvatar.vue"
import VSelect from "@/components/form/VSelect.vue"
import { ParticipantRoles } from "@/constants"
import { keyMapper } from "@/utils"
import { deleteParticipantRequest, updateParticipantsRole } from "@/api/participants.requests"
import { useUserStore } from "@/stores/user"

const userStore = useUserStore()
const projectStore = useProjectStore()
const { project } = storeToRefs(projectStore)

const plainParticipants = computed(() => project.value?.participants)

const roles = computed(
  () => plainParticipants.value && keyMapper(plainParticipants.value, "userId", "role")
)
const form = computed(() => ({
  state: reactive({
    ...useCopyReactive(project.value),
    participants: [],
    participantRoles: {}
  })
}))
const state = computed(() => form.value.state)

watchEffect(async () => {
  if (!plainParticipants.value) {
    return
  }
  const { data: users } = await getUsersByIds(plainParticipants.value.map(({ userId }) => userId))
  state.value.participants = users.map((user) => ({ ...user, role: roles.value![user.id] }))
  state.value.participantRoles = keyMapper(plainParticipants.value, "userId", "role")
})

function shouldDisableRolesSelect(role: ParticipantRolesEnum) {
  const currentUserRole = roles.value?.[userStore.user?.id as number] as ParticipantRolesEnum
  return (
    currentUserRole === ParticipantRolesEnum.Member ||
    role === ParticipantRolesEnum.Owner ||
    (role === ParticipantRolesEnum.Admin && currentUserRole !== ParticipantRolesEnum.Owner)
  )
}
function isRolesOperationPermissible(role: ParticipantRolesEnum) {
  const currentUserRole = roles.value?.[userStore.user?.id as number] as ParticipantRolesEnum
  return (
    currentUserRole === ParticipantRolesEnum.Owner ||
    (currentUserRole === ParticipantRolesEnum.Admin && role === ParticipantRolesEnum.Admin)
  )
}
function isUserDeletionPermissible(role: ParticipantRolesEnum) {
  const currentUserRole = roles.value?.[userStore.user?.id as number] as ParticipantRolesEnum
  return (
    currentUserRole === ParticipantRolesEnum.Owner ||
    (currentUserRole === ParticipantRolesEnum.Admin && role === ParticipantRolesEnum.Member)
  )
}

async function handleParticipantsRoleUpdate(participantId: number) {
  await updateParticipantsRole(
    project.value?.id as number,
    participantId,
    state.value.participantRoles[participantId]
  )
  await projectStore.updateProjectInStore(project.value?.id as number)
}
async function handleParticipantsDeletion(participantId: number) {
  await deleteParticipantRequest(project.value?.id as number, participantId)
  await projectStore.updateProjectInStore(project.value?.id as number)
}
</script>

<template>
  <form class="form" @submit.prevent>
    <InputBlock class="input" v-model="state.title" label="Title" />
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
          <VSelect
            v-model="state.participantRoles[participant.id]"
            :defaultTitle="participant.role"
            :disabled="shouldDisableRolesSelect(participant.role)"
          >
            <option v-for="role in ParticipantRoles" :key="role" :value="role">
              {{ role }}
            </option>
          </VSelect>
          <section class="user-data button-wrapper">
            <button
              v-if="state.participantRoles[participant.id] !== participant.role"
              class="button"
              :class="{
                'button-disabled': !isRolesOperationPermissible(
                  state.participantRoles[participant.id]
                )
              }"
              @click="handleParticipantsRoleUpdate(participant.id)"
              :disabled="!isRolesOperationPermissible(state.participantRoles[participant.id])"
            >
              Save
            </button>
          </section>
          <section class="user-data button-wrapper">
            <button
              class="button button-delete"
              :class="{
                'button-disabled': !isUserDeletionPermissible(participant.role)
              }"
              :disabled="!isUserDeletionPermissible(participant.role)"
              @click="handleParticipantsDeletion(participant.id)"
            >
              Delete
            </button>
          </section>
        </li>
      </ul>
    </section>
  </form>
</template>

<style scoped lang="scss">
.form {
  width: 80vw;
  max-width: 700px;
  display: flex;
  flex-direction: column;
}
.input {
  margin-bottom: 40px;
}

.users-wrapper {
  display: flex;
  flex-direction: column;
  gap: 40px;
  margin-bottom: 30px;
}

.user-list {
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
    width: 25%;
  }
  &.user-email {
    width: 50%;
  }
  &.button-wrapper {
    width: 15%;
  }
}

.button {
  width: 100%;
  font-size: 14px;
  border-radius: 10px;
  background: var(--blue);
  color: white;

  &.button-disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &.button-delete {
    border: 1px solid var(--red);
    border-radius: 5px;
    background: transparent;
    color: var(--red);
  }
}
</style>
