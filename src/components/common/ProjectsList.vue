<script setup lang="ts">
import { watchEffect } from "vue"
import { useProjectStore } from "@/stores/project"
import { useParticipatingProjectsStore } from "@/stores/participating.projects"

withDefaults(defineProps<{ title?: string }>(), { title: "Projects" })
const emit = defineEmits(["onProjectClick", "onProjectSelect", "onProjectCreate"])

const projectStore = useProjectStore()
const participatingProjectsStore = useParticipatingProjectsStore()

watchEffect(participatingProjectsStore.updateProjectsList)

function handleProjectClick(projectId: number) {
  emit("onProjectClick", projectId)
}
function handleProjectSelect(projectId: number) {
  emit("onProjectSelect", projectId)
}
function handleProjectCreate() {
  emit("onProjectCreate")
}
</script>

<template>
  <section class="projects">
    <h2>{{ title }}</h2>
    <ul class="projects-list">
      <li
        v-for="project in participatingProjectsStore.projects"
        :key="project.id"
        class="project-card"
        :class="{ 'active-project': project.id === projectStore.project?.id }"
        @click="handleProjectClick(project.id)"
      >
        <h3 class="project-card-title">{{ project.title }}</h3>
        <ul class="participants-list">
          <li
            v-for="participant in project.participants.slice(0, 3)"
            :key="participant.id"
            class="participant"
          />
          <li class="participant participant-default" v-if="project.participants.length - 3 > 0">
            {{ project.participants.length - 3 }}
          </li>
        </ul>
        <div class="follow">
          <span @click.stop="handleProjectSelect(project.id)">Follow →</span>
        </div>
      </li>
      <li class="project-card project-proto">
        <button @click="handleProjectCreate">+ Add Project</button>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
.projects {
  @include flex-column;
  gap: 30px;
}
.projects-list {
  @include flex-row;
  gap: 20px;
  padding: 15px;
  padding-left: 0;
  max-width: 100%;
  overflow-x: scroll;
}
.project-card {
  @include flex-column;
  gap: 10px;
  height: 150px;
  min-width: 250px;
  border-radius: 20px;
  padding: 20px;
  border: 1px solid transparent;
  background-color: white;
  transition-property: box-shadow, border;
  transition-timing-function: ease-out;
  transition-duration: 0.2s;
  &-title {
    font-size: 18px;
    font-weight: 600;
  }
  &:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    .follow > span {
      opacity: 1;
    }
  }

  .follow {
    text-align: end;
    > span {
      font-size: 12px;
      padding: 3px 10px;
      border: 1px solid rgb(170, 170, 170);
      border-radius: 6px;
      opacity: 0;
      transition: opacity 0.2s ease-out;
      cursor: pointer;
    }
  }
}
.active-project {
  border-color: var(--blue);
}

.participants-list {
  @include flex-row;
}
.participant {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: grey;
  &:not(:first-child) {
    margin-left: -15px;
  }

  &-default {
    @include flex-row;
    text-align: center;
    justify-content: space-around;
    background-color: rgb(160, 160, 160);
    padding-top: 2px;
  }
}
</style>
