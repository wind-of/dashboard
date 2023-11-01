import type { Project, Task } from "@/types"
import { column as initializeColumn, task as initializeTask } from "@/utils"
import { reactive, ref } from "vue"

export function useTaskDrawer(project: Project) {
  const binTask = initializeTask()
  const binColumn = initializeColumn()

  const column = (columnId: string) =>
    project.columns.find(({ id }) => id === columnId) || binColumn
  const task = (taskId: string, columnId: string) =>
    column(columnId).tasks.find(({ id }) => id === taskId) || binTask

  const isDrawerOpen = ref(false)
  const selected = reactive({ task: initializeTask({ title: "", description: "" }), columnId: "" })

  return {
    handleTaskChange(updatedTask: Task) {
      const targetTask = task(selected.task.id, selected.columnId)
      // TODO: не обновлять, если ничего не изменилось?
      targetTask.title = updatedTask.title
      targetTask.description = updatedTask.description
      targetTask.tags = updatedTask.tags
    },
    handleTaskChangeCancel() {
      isDrawerOpen.value = false
      selected.task = initializeTask({ title: "", description: "" })
      selected.columnId = ""
    },
    handleTaskDelete() {
      const currentColumn = column(selected.columnId)
      currentColumn.tasks = currentColumn.tasks.filter(({ id }) => id !== selected.task.id)
      isDrawerOpen.value = false
    },
    handleTaskSelection(taskId: string, columnId: string) {
      selected.columnId = columnId
      selected.task = task(taskId, columnId)
      isDrawerOpen.value = true
    },
    isDrawerOpen,
    selected
  }
}
