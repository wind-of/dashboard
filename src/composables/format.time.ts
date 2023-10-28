export function useDateFormat(date: Date) {
  return new Intl.DateTimeFormat("en-EN", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date)
}
