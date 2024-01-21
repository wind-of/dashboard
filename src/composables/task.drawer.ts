import { updateTaskFromColumn } from "@/api"
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

  const insertTaskToColumn = (taskId: number, columnId: number, oldColumnId: number) =>
    column(columnId).tasks.push(task(taskId, oldColumnId))
  const removeTaskFromColumn = (taskId: number, columnId: number) => {
    const currentColumn = column(columnId)
    return (currentColumn.tasks = currentColumn.tasks.filter(({ id }) => id !== taskId))
  }

  function handleTaskColumnUpdate(newColumnId: number) {
    insertTaskToColumn(selected.task.id, newColumnId, selected.columnId)
    removeTaskFromColumn(selected.task.id, selected.columnId)
    selected.columnId = newColumnId
  }

  const isDrawerOpen = ref(false)
  const selected = reactive({ task: initializeTask({ title: "", description: "" }), columnId: NaN })

  return {
    async handleTaskChange(updatedTask: UpdatedTask) {
      await updateTaskFromColumn(project.id, selected.columnId, updatedTask)
      projectStore.updateProjectInStore(project.id)
    },
    handleTaskChangeCancel() {
      isDrawerOpen.value = false
      selected.task = initializeTask({ title: "", description: "" })
      selected.columnId = NaN
    },
    handleTaskDelete() {
      const currentColumn = column(selected.columnId)
      currentColumn.tasks = currentColumn.tasks.filter(({ id }) => id !== selected.task.id)
      isDrawerOpen.value = false
    },
    handleTaskSelection(taskId: number, columnId: number) {
      selected.columnId = columnId
      selected.task = task(taskId, columnId)
      isDrawerOpen.value = true
    },
    handleTaskColumnUpdate,
    isDrawerOpen,
    selected
  }
}
