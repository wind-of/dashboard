<script setup lang="ts">
import { Comment } from "@/types"
import InputBlock from "@/components/form/InputBlock.vue"
import TaskDrawerCommentsItem from "@/components/task-drawer/TaskDrawerCommentsItem.vue"
import { computed, ref } from "vue"

const props = defineProps<{ comments: Comment[] }>()
const emit = defineEmits(["onCommentSend"])
const newCommentContent = ref("")
const isAddingNewComment = ref(false)

const sortedComments = computed(() => {
  return [...props.comments].sort(
    (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  )
})

function handleCommentSend() {
  newCommentContent.value = newCommentContent.value.trim()
  if (!newCommentContent.value) {
    return
  }
  emit("onCommentSend", newCommentContent.value)
  isAddingNewComment.value = false
  newCommentContent.value = ""
}
</script>

<template>
  <section class="comments-wrapper">
    <h3 class="comments-title">Comments</h3>
    <form class="new-comment-form" @submit.prevent>
      <template v-if="isAddingNewComment">
        <InputBlock
          v-model="newCommentContent"
          isTextarea
          label="New comment"
          placeholder="Enter your comment"
        />
        <div class="button-wrapper">
          <button class="send-comment-button" @click="handleCommentSend">Send</button>
        </div>
      </template>
      <button v-else @click="isAddingNewComment = !isAddingNewComment">Add new comment</button>
    </form>
    <section class="comments">
      <TaskDrawerCommentsItem
        v-for="comment in sortedComments"
        :key="comment.id"
        :comment="comment"
      />
    </section>
  </section>
</template>

<style scoped lang="scss">
.comments-wrapper {
  @include flex-column;
  gap: 20px;
}
.comments-title {
  font-size: 24px;
}
.new-comment-form {
  @include flex-column;
  gap: 15px;
  margin-bottom: 15px;
}
.button-wrapper {
  @include flex-row;
  justify-content: flex-end;
  gap: 5px;
  .send-comment-button {
    min-width: 20%;
    font-size: 14px;
    font-weight: 500;
    background-color: var(--blue);
    color: white;
  }
}
.comments {
  @include flex-column;
  gap: 20px;
}
</style>
