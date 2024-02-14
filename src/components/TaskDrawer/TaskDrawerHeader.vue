<script setup lang="ts">
import { computed, ref, watchEffect } from "vue"

import VAvatar from "@/components/common/VAvatar.vue"
import VSelect from "@/components/form/VSelect.vue"
import { User } from "@/types"
import { getUserById, getUsersByIds } from "@/api/user.requests"
import { useProjectStore } from "@/stores/project"
import { isNullable, userFullName } from "@/utils"

const props = defineProps<{ creatorId?: number; performerId?: number; canEdit: boolean }>()
const emit = defineEmits(["onPerformerUpdate"])

const projectStore = useProjectStore()
const projectParticipantsData = computed(() => projectStore.project!.participants)
const { data: participants } = await getUsersByIds(
  projectParticipantsData.value.map(({ userId }) => userId)
)

const creator = ref<User | null>(null)
const performer = ref<User | null>(null)
const creatorName = computed(() => userFullName(creator.value))
const performerName = computed(() => userFullName(performer.value))
const performerId = computed({
  get() {
    return props.performerId
  },
  async set(newPerformerId) {
    emit("onPerformerUpdate", newPerformerId)
  }
})

watchEffect(async () => {
  if (isNullable(props.creatorId)) {
    return (creator.value = null)
  }
  const { data } = await getUserById(props.creatorId as number).catch(() => ({ data: null }))
  creator.value = data
})
watchEffect(async () => {
  if (isNullable(props.performerId)) {
    return (performer.value = null)
  }
  const { data } = await getUserById(props.performerId as number).catch(() => ({ data: null }))
  performer.value = data
})
</script>

<template>
  <header class="header">
    <h2 class="header-title">Task</h2>
    <section class="header-meta">
      <div class="header-creator">
        <p>Created by: {{ creatorName }}</p>
        <VAvatar class="avatar" :image="creator?.avatar" />
      </div>
      <div class="header-performer">
        <template v-if="performer">
          <p>Assigned to: {{ performerName }}</p>
          <VAvatar class="avatar" :image="performer.avatar" />
        </template>
      </div>
      <section v-if="canEdit" class="assign-performer">
        <p>Assign to:</p>
        <VSelect v-model="performerId" defaultTitle="Update performer">
          <option v-for="user in participants" :key="user.id" :value="user.id">
            {{ userFullName(user) }}
          </option>
        </VSelect>
      </section>
    </section>
  </header>
</template>

<style scoped lang="scss">
.header {
  @include flex-row;
  gap: 20px;
  justify-content: space-between;
  align-items: flex-start;
}
.header-title {
  font-size: 28px;
}
.header-meta {
  @include flex-column;
  align-items: flex-end;
}
.header-creator,
.header-performer {
  @include flex-row;
  gap: 5px;
  align-items: center;
  p {
    font-size: 14px;
  }
  .avatar {
    scale: 0.7;
  }
}

.assign-performer {
  @include flex-row;
  gap: 10px;
  align-items: center;
  font-size: 14px;
}
</style>
