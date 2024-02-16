<script setup lang="ts">
import ViewWrapper from "@/components/ViewWrapper.vue"
import VButton from "@/components/form/VButton.vue"
import VAvatar from "@/components/common/VAvatar.vue"
import InputBlock from "@/components/form/InputBlock.vue"
import ProfileHeader from "@/components/profile/ProfileHeader.vue"
import ProfileForm from "@/components/profile/ProfileForm.vue"
import { useUserStore } from "@/stores/user"

const userStore = useUserStore()
</script>

<template>
  <ViewWrapper>
    <section class="profile">
      <ProfileHeader :avatar="userStore.user?.avatar" />
      <ProfileForm />
    </section>
  </ViewWrapper>
</template>

<style scoped lang="scss">
.profile {
  @include flex-column;
  gap: 30px;
}
</style>
