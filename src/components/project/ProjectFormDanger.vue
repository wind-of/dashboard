<script setup lang="ts">
import VButton from "@/components/form/VButton.vue"
import { HOME_ROUTE_NAME } from "@/router"
import { useProjectStore } from "@/stores/project"
import { useRouter } from "vue-router"

const router = useRouter()
const projectStore = useProjectStore()

async function handleProjectDeletion() {
  await projectStore.deleteProject()
  router.push({ name: HOME_ROUTE_NAME })
}
</script>

<template>
  <section class="danger-zone">
    <h2>Danger zone</h2>
    <section class="buttons">
      <VButton class="delete-button" @click="handleProjectDeletion" isDanger
        >Delete Project</VButton
      >
    </section>
  </section>
</template>

<style scoped lang="scss">
.danger-zone {
  @include flex-column;
  gap: 20px;
}
.buttons {
  @include flex-row;
  gap: 15px;
}
.delete-button {
  transition-property: color, background-color;
  transition-duration: 0.15s;
  &:hover {
    color: var(--white);
    background-color: var(--red);
  }
}
</style>
