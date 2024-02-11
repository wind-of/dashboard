export const draggingTaskDataDefaults = {
  data: {},
  update: ({
    element = undefined,
    columnId = undefined,
    newIndex = undefined,
    willInsertAfter = false
  }: any) => {}
}

export const draggingColumnDataDefaults = {
  data: {},
  update: ({ element = undefined, newIndex = undefined, willInsertAfter = false }: any) => {}
}
