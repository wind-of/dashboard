<script setup lang="ts">
import { computed } from "vue"
import { useTimeFormat } from "@/composables/format.time"
import type { Task } from "@/types"

const props = defineProps<{ task: Task }>()

const expirationDate = computed(() => {
  return useTimeFormat({ date: props.task.expirationDate })
})
</script>

<template>
  <section class="item">
    <header class="header">
      <section class="tags">
        <div
          class="tag"
          v-for="{ id, title, color } in task.tags"
          :key="id"
          :style="{ 'background-color': color }"
        >
          {{ title }}
        </div>
      </section>
      <div class="preview-wrapper" v-if="task.preview">
        <img :src="task.preview" alt="preview image" class="preview-image" />
      </div>
    </header>
    <section class="item-content">
      <h3 class="title">{{ task.title }}</h3>
      <p class="description">{{ task.shortDescription }}</p>
    </section>
    <section class="item-date">
      {{ expirationDate }}
    </section>
  </section>
</template>

<style lang="scss" scoped>
.item {
  @include flex-column;
  gap: 12px;
  padding: 16px;
  border-radius: 12px;
  background-color: var(--white);
}
.header {
  @include flex-column;
  gap: 15px;
}
.tags {
  @include flex-row;
  flex-wrap: wrap;
  gap: 6px;
}
.tag {
  display: inline-block;
  padding: 3px 9px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
  color: var(--white);
  cursor: pointer;
}
.preview-image {
  width: 100%;
  height: 110px;
  object-fit: cover;
  border-radius: 12px;
}
.item-content {
  @include flex-column;
  font-weight: 500;
  gap: 7px;
}
.title,
.description {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.title {
  font-size: 13px;
}
.description {
  font-size: 12px;
  color: var(--subtitle);
}

.item-date {
  @include taskDateTag;
}
</style>
