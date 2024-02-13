<script setup lang="ts">
import { getUserById } from "@/api/user.requests"
import { Comment, User } from "@/types"
import { userFullName } from "@/utils"
import { ref, watchEffect } from "vue"

const props = defineProps<{ comment: Comment }>()

const author = ref<User | null>(null)

watchEffect(async () => {
  const { data: user } = await getUserById(props.comment.userId)
  author.value = user
})
</script>

<template>
  <div class="comment-user-data">
    <VAvatar class="comment-avatar" :image="author?.avatar" />
    <span class="comment-username">{{ userFullName(author) }}</span>
  </div>
  <div class="comment-content">{{ comment.content }}</div>
  <div class="comment-meta">
    <span class="comment-date">Отправлен: ${{ comment.createdAt }}</span>
  </div>
</template>

<style scoped lang="scss"></style>
