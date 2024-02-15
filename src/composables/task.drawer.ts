import { deleteTask, updateTask } from "@/api"
import { createCommentRequest } from "@/api/comments.requests"
import { useProjectStore } from "@/stores/project"
import type { Column, Project, Task, UpdatedTask } from "@/types"
import { task as initializeTask } from "@/utils"
import { computed, reactive, ref } from "vue"

export function useTaskDrawer() {
  const projectStore = useProjectStore()
  const project = computed(() => projectStore.project as Project)

  const column = (columnId: number) =>
    project.value.columns.find(({ id }) => id === columnId) as Column
  const task = (taskId: number, columnId: number) =>
    column(columnId).tasks.find(({ id }) => id === taskId) as Task

  const isDrawerOpen = ref(false)
  const selected = reactive({ task: initializeTask({ title: "", description: "" }), columnId: NaN })

  return {
    async handleTaskChange(updatedTask: UpdatedTask) {
      console.log(updatedTask)
      selected.task.performerId = updatedTask.performerId
      await updateTask(project.value.id, updatedTask)
      await projectStore.updateProjectInStore(project.value.id)
    },
    async handleTaskComment(newCommentContent: string) {
      const { data: comment } = await createCommentRequest(project.value.id, selected.task.id, {
        content: newCommentContent
      })
      await projectStore.updateProjectInStore(project.value.id)
      selected.task.comments.push(comment)
    },
    handleTaskChangeCancel() {
      isDrawerOpen.value = false
      selected.task = initializeTask({ title: "", description: "" })
      selected.columnId = NaN
    },
    async handleTaskDelete() {
      await deleteTask(project.value.id, selected.task.id)
      await projectStore.updateProjectInStore(project.value.id)
      isDrawerOpen.value = false
    },
    handleTaskSelection(taskId: number, columnId: number) {
      selected.columnId = columnId
      selected.task = task(taskId, columnId)
      isDrawerOpen.value = true
    },
    isDrawerOpen,
    selected
  }
}
