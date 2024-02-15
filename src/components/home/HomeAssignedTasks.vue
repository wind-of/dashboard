<script setup lang="ts">
import { ref, watchEffect } from "vue"
import { getAssignedTasksRequest } from "@/api/task.requests"
import { Task } from "@/types"
import { useRouter } from "vue-router"
import { useProjectStore } from "@/stores/project"

const router = useRouter()
const projectStore = useProjectStore()
const assignedTasks = ref<
  {
    task: Task
    project: {
      id: number
      title: string
    }
  }[]
>([])

watchEffect(async () => {
  const { data } = await getAssignedTasksRequest().catch(() => ({ data: [] }))
  assignedTasks.value = data
})

async function handleProjectUpdate(projectId: number, taskId: number) {
  await projectStore.updateProjectInStore(projectId)
  router.push({ name: "canban", query: { taskId } })
}
</script>

<template>
  <section class="home-tasks">
    <h2>Assigned tasks</h2>
    <section class="tasks">
      <div class="task" v-for="{ task, project } in assignedTasks" :key="task.id">
        <section class="task-content">
          <h3 class="task-title">{{ task.title }}</h3>
          <p class="task-description">{{ task.shortDescription }}</p>
        </section>
        <div class="follow">
          <p class="task-project">
            From: <span>{{ project.title }}</span>
          </p>
          <span @click.stop="handleProjectUpdate(project.id, task.id)">Follow →</span>
        </div>
      </div>
    </section>
  </section>
</template>

<style scoped lang="scss">
.home-tasks {
  @include flex-column;
  gap: 20px;
}
.tasks {
  @include flex-row;
  width: 100%;
  padding: 15px;
  gap: 20px;
  overflow: scroll;
}
.task {
  @include flex-column;
  justify-content: space-between;
  min-width: 250px;
  min-height: 150px;
  overflow: hidden;
  padding: 15px;
  border-radius: 15px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  background-color: white;
  transition: box-shadow 0.2s ease-out;
  cursor: pointer;
  &-title,
  &-description,
  &-project {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  &-description {
    color: #aaa;
  }
  &-project span {
    color: var(--blue);
    font-weight: 600;
  }

  &:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    .follow > span {
      opacity: 1;
    }
  }
}

.follow {
  @include flex-row;
  justify-content: space-between;
  align-items: center;
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
</style>
