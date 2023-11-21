import type { Project, TaskUpdate } from "@/types"
import { column as initializeColumn, task as initializeTask } from "@/utils"
import { reactive, ref } from "vue"

export function useTaskDrawer(project: Project) {
  const binTask = initializeTask()
  const binColumn = initializeColumn()

  const column = (columnId: string) =>
    project.columns.find(({ id }) => id === columnId) || binColumn
  const task = (taskId: string, columnId: string) =>
    column(columnId).tasks.find(({ id }) => id === taskId) || binTask

  const insertTaskToColumn = (taskId: string, columnId: string, oldColumnId: string) =>
    column(columnId).tasks.push(task(taskId, oldColumnId))
  const removeTaskFromColumn = (taskId: string, columnId: string) => {
    const currentColumn = column(columnId)
    return (currentColumn.tasks = currentColumn.tasks.filter(({ id }) => id !== taskId))
  }

  function handleTaskColumnUpdate(newColumnId: string) {
    insertTaskToColumn(selected.task.id, newColumnId, selected.columnId)
    removeTaskFromColumn(selected.task.id, selected.columnId)
    selected.columnId = newColumnId
  }

  const isDrawerOpen = ref(false)
  const selected = reactive({ task: initializeTask({ title: "", description: "" }), columnId: "" })

  return {
    handleTaskChange({ updatedTask, updatedColumnId }: TaskUpdate) {
      const targetTask = task(selected.task.id, selected.columnId)
      targetTask.title = updatedTask.title
      targetTask.description = updatedTask.description
      targetTask.tags = updatedTask.tags
      if (updatedColumnId !== selected.columnId) {
        handleTaskColumnUpdate(updatedColumnId)
      }
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
    handleTaskColumnUpdate,
    isDrawerOpen,
    selected
  }
}
