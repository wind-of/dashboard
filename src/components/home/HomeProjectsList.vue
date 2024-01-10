<script setup lang="ts">
import type { ProjectWithParticipants } from "@/types"
import { reactive, watchEffect } from "vue"
import { getParticipatingProjects } from "@/api"
const projects = reactive<ProjectWithParticipants[]>([])

watchEffect(() => {
  getParticipatingProjects()
    .then((response) => {
      projects.push(...response.data)
    })
    .catch(console.log)
})
</script>

<template>
  <section class="projects">
    <h2>Projects</h2>
    <ul class="projects-list">
      <li v-for="project in projects" :key="project.id" class="project-card">
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
}
.project-card {
  @include flex-column;
  gap: 10px;
  height: 150px;
  width: 250px;
  border-radius: 20px;
  padding: 20px;
  background-color: white;
  &-title {
    font-size: 18px;
  }
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
