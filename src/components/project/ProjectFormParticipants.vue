<script setup lang="ts">
import { computed, reactive, watchEffect } from "vue"
import { storeToRefs } from "pinia"
import type { UserWithRole } from "@/types"
import { ParticipantRolesEnum } from "@/types"
import { useProjectStore } from "@/stores/project"
import { getUsersByIds } from "@/api/user.requests"
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
  const currentUserRole = roles.value?.[userStore.user!.id] as ParticipantRolesEnum
  return (
    currentUserRole === ParticipantRolesEnum.Member ||
    role === ParticipantRolesEnum.Owner ||
    (role === ParticipantRolesEnum.Admin && currentUserRole !== ParticipantRolesEnum.Owner)
  )
}
function isRolesOperationPermissible(role: ParticipantRolesEnum) {
  const currentUserRole = roles.value?.[userStore.user!.id] as ParticipantRolesEnum
  return (
    currentUserRole === ParticipantRolesEnum.Owner ||
    (currentUserRole === ParticipantRolesEnum.Admin && role === ParticipantRolesEnum.Admin)
  )
}
function isUserDeletionPermissible(role: ParticipantRolesEnum, userId: number) {
  const currentUserRole = roles.value![userStore.user!.id]
  return (
    userId !== userStore.user!.id &&
    (currentUserRole === ParticipantRolesEnum.Owner ||
      (currentUserRole === ParticipantRolesEnum.Admin && role === ParticipantRolesEnum.Member))
  )
}

async function handleParticipantsRoleUpdate(participantId: number) {
  await updateParticipantsRole(
    project.value?.id as number,
    participantId,
    state.value.participantRoles[participantId]
  )
  await projectStore.updateProjectInStore(project.value!.id)
}
async function handleParticipantsDeletion(participantId: number) {
  await deleteParticipantRequest(project.value!.id, participantId)
  await projectStore.updateProjectInStore(project.value!.id)
}
</script>

<template>
  <section class="participants-wrapper">
    <h2>Participants</h2>
    <ul class="participants-list">
      <li
        v-for="participant in state.participants as UserWithRole[]"
        :key="participant.id"
        class="participants-list-item"
      >
        <VAvatar class="participants-data" :image="participant.avatar" />
        <section class="participants-data participants-name">
          {{ participant.firstname }} {{ participant.lastname }}
        </section>
        <section class="participants-data participants-email">{{ participant.email }}</section>
        <VSelect
          v-model="state.participantRoles[participant.id]"
          :defaultTitle="participant.role"
          :disabled="shouldDisableRolesSelect(participant.role)"
        >
          <option v-for="role in ParticipantRoles" :key="role" :value="role">
            {{ role }}
          </option>
        </VSelect>
        <section class="participants-data button-wrapper">
          <button
            v-if="state.participantRoles[participant.id] !== participant.role"
            class="button"
            @click="handleParticipantsRoleUpdate(participant.id)"
            :disabled="!isRolesOperationPermissible(state.participantRoles[participant.id])"
          >
            Save
          </button>
        </section>
        <section class="participants-data button-wrapper">
          <button
            class="button button-delete"
            :disabled="!isUserDeletionPermissible(participant.role, participant.id)"
            @click="handleParticipantsDeletion(participant.id)"
          >
            Delete
          </button>
        </section>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.participants-wrapper {
  @include flex-column;
  gap: 20px;
  margin-bottom: 30px;
}
.participants-list {
  @include flex-column;
}
.participants-list-item {
  width: 100%;
  padding: 20px 0;
  @include flex-row;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  border-bottom: 1px solid #ccc;
  &:first-child {
    border-top: 1px solid #ccc;
  }
}
.participants-data {
  @include flex-row;
  align-items: center;
  justify-content: space-around;
  font-size: 18px;
  &.participants-role {
    width: 10%;
  }
  &.participants-name {
    width: 25%;
  }
  &.participants-email {
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

  &.button-delete {
    border: 1px solid var(--red);
    border-radius: 5px;
    background: transparent;
    color: var(--red);
  }
}
</style>
