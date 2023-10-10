const rn = () => ((Math.random() * 1000) | 0).toString().padStart(4, (Math.random() * 10) | 0)
const uid = (prefix) => `${prefix}-${rn()}-${rn()}-${rn()}-${rn()}`
export const project = {
  id: uid("project"),
  title: "Project Title",
  columns: [
    {
      id: uid("column"),
      title: "Column Title",
      tasks: [
        {
          id: uid("task"),
          title: "Task title",
          description: "Tasks description",
          tags: [
            {
              id: uid("tag"),
              title: "Design"
            },
            {
              id: uid("tag"),
              title: "Frontend"
            }
          ]
        }
      ]
    }
  ]
}
