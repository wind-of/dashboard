<script setup lang="ts">
import { ref } from "vue"
import { useProjectStore } from "@/stores/project"
import ProjectsList from "~/common/ProjectsList.vue"

const projectStore = useProjectStore()
const isChosen = ref(!!projectStore.project)
</script>

<template>
  <ProjectsList v-if="!isChosen" @onProjectUpdate="isChosen = true" title="Choose project" />
  <slot v-else />
</template>
