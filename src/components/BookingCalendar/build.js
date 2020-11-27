// Pure function that creates a DATE matrix.
// Clone so the initial date objects don't get modified.

export default function buildCalendar(selectedDate) {
  const startDay = selectedDate.clone().startOf("month").startOf("week");
  const endDay = selectedDate.clone().endOf("month").endOf("week");
  const day = startDay.clone().subtract(1, "day");
  const calendar = [];
  while (day.isBefore(endDay, "day")) {
    calendar.push(
      Array(7)
        .fill(0)
        .map(() => day.add(1, "day").clone())
    );
  }

  return calendar;
}
