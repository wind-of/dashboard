<script setup lang="ts">
import { computed } from "vue"
import { useTimeFormat } from "@/composables/format.time"
import type { Task } from "@/types"

const props = defineProps<{ task: Task }>()

const expirationDate = computed(() => {
  return useTimeFormat(props.task.expirationDate)
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
  gap: 15px;
  padding: 16px;
  border-radius: 12px;
  background-color: var(--white);
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
