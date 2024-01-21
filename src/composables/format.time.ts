export function useTimeFormat({ date, isDetailed = false }: { date: Date; isDetailed?: boolean }) {
  return new Intl.DateTimeFormat("ru-RU", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...(isDetailed ? { hour: "2-digit", minute: "2-digit" } : {})
  }).format(new Date(date))
}
