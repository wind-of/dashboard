import { deleteTask, updateTask } from "@/api"
import { useProjectStore } from "@/stores/project"
import type { Project, UpdatedTask } from "@/types"
import { column as initializeColumn, task as initializeTask } from "@/utils"
import { reactive, ref } from "vue"

const projectStore = useProjectStore()

export function useTaskDrawer(project: Project) {
  const binTask = initializeTask()
  const binColumn = initializeColumn()

  const column = (columnId: number) =>
    project.columns.find(({ id }) => id === columnId) || binColumn
  const task = (taskId: number, columnId: number) =>
    column(columnId).tasks.find(({ id }) => id === taskId) || binTask

  const isDrawerOpen = ref(false)
  const selected = reactive({ task: initializeTask({ title: "", description: "" }), columnId: NaN })

  return {
    async handleTaskChange(updatedTask: UpdatedTask) {
      await updateTask(project.id, updatedTask)
      await projectStore.updateProjectInStore(project.id)
    },
    handleTaskChangeCancel() {
      isDrawerOpen.value = false
      selected.task = initializeTask({ title: "", description: "" })
      selected.columnId = NaN
    },
    async handleTaskDelete() {
      await deleteTask(project.id, selected.task.id)
      await projectStore.updateProjectInStore(project.id)
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
