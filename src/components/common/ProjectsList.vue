<script setup lang="ts">
import { reactive, watchEffect } from "vue"
import type { ProjectWithoutColumns } from "@/types"
import { getParticipatingProjects, getWholeProjectById } from "@/api"
import { useProjectStore } from "@/stores/project"

withDefaults(defineProps<{ title?: string }>(), { title: "Projects" })
const emit = defineEmits(["onProjectUpdate"])

const projects = reactive<ProjectWithoutColumns[]>([])
const projectStore = useProjectStore()

watchEffect(() => {
  getParticipatingProjects()
    .then((response) => {
      projects.push(...response.data)
    })
    .catch(console.log)
})

async function handleProjectClick(partialProject: ProjectWithoutColumns) {
  const { data: project } = await getWholeProjectById(partialProject.id)
  projectStore.saveProject(project)
  emit("onProjectUpdate")
}
</script>

<template>
  <section class="projects">
    <h2>{{ title }}</h2>
    <ul class="projects-list">
      <li
        v-for="project in projects"
        :key="project.id"
        class="project-card"
        :class="{ 'active-project': project.id === projectStore.project?.id }"
        @click="handleProjectClick(project)"
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
      </li>
      <li class="project-card project-proto">
        <button>+ Add Project</button>
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
  cursor: pointer;
  transition-property: box-shadow, border;
  transition-timing-function: ease-out;
  transition-duration: 0.2s;
  &-title {
    font-size: 18px;
    font-weight: 600;
  }
  &:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
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
