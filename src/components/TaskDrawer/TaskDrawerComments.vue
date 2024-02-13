<script setup lang="ts">
import { Comment } from "@/types"
import InputBlock from "@/components/form/InputBlock.vue"
import { ref } from "vue"

defineProps<{ comments: Comment[] }>()
const newCommentContent = ref("")

function handleCommentSend() {}
</script>

<template>
  <section class="comments-wrapper">
    <h3 class="comments-title">Comments</h3>
    <section class="new-comment">
      <InputBlock
        v-model="newCommentContent"
        isTextarea
        label="New comment"
        placeholder="Enter your comment"
      />
      <button class="send-comment-button" @click="handleCommentSend">Send</button>
    </section>
    <section class="comments">
      <TaskDrawerCommentsItem v-for="comment in comments" :key="comment.id" :comment="comment" />
    </section>
  </section>
</template>

<style scoped lang="scss"></style>
