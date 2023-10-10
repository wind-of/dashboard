<script setup>
import CanbanHeader from "./CanbanHeader.vue"
import CanbanTable from "./CanbanTable.vue"
defineProps({
  project: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section class="canban">
    <CanbanHeader :projectTitle="project.title" />
    <CanbanTable :columns="project.columns" />
  </section>
</template>

<style scoped>
.canban {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
</style>
