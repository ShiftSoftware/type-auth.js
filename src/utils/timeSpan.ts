export const timeSpan = (
  dateOrHours: number | Date,
  minutes?: number,
  seconds?: number
): Date => {
  if (dateOrHours instanceof Date) return dateOrHours

  const currentDate = new Date()

  currentDate.setHours(dateOrHours, minutes, seconds, 0)

  return currentDate
}
