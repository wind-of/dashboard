<script setup lang="ts">
import { ref, watchEffect } from "vue"
import VAvatar from "@/components/common/VAvatar.vue"
import { getUserRequest } from "@/api/user.requests"
import { Comment, User } from "@/types"
import { userFullName } from "@/utils"
import { useTimeFormat } from "@/composables/useTimeFormat"

const props = defineProps<{ comment: Comment }>()

const author = ref<User | null>(null)

watchEffect(async () => {
  const { data: user } = await getUserRequest(props.comment.userId)
  author.value = user
})
</script>

<template>
  <section class="comment">
    <div class="comment-user-data">
      <VAvatar class="comment-avatar" :image="author?.avatar" width="30px" height="30px" />
      <span class="comment-username">{{ userFullName(author) }}</span>
      <span class="comment-date">{{
        useTimeFormat({ date: new Date(comment.createdAt), isDetailed: true })
      }}</span>
    </div>
    <div class="comment-content">{{ comment.content }}</div>
  </section>
</template>

<style scoped lang="scss">
.comment {
  @include flex-column;
  gap: 10px;
}
.comment-date {
  font-size: 12px;
  color: var(--gray);
}
.comment-user-data {
  @include flex-row;
  align-items: center;
  gap: 10px;
  .comment-username {
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
@/composables/useTimeFormat
