export function useTimeFormat(date: Date, isDetailed: boolean = false) {
  return new Intl.DateTimeFormat("ru-RU", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...(isDetailed ? { hour: "2-digit", minute: "2-digit" } : {})
  }).format(date)
}
