function isSelected(day, value) {
  return value.isSame(day, "day");
}

export function beforeToday(day) {
  return day.isBefore(new Date(), "day");
}

function isToday(day) {
  return day.isSame(new Date(), "day");
}

export default function dayStyles(day, value) {
  if (beforeToday(day)) return "Calendar-day before";
  if (isSelected(day, value)) return "Calendar-day selected";
  if (isToday(day)) return "Calendar-day today";
  return "";
}

// function dayStyles(day) {
//   if (beforeToday(day)) return "Calendar-day before";
//   if (isSelected(day, value)) return "Calendar-day selected";
//   if (isToday(day)) return "Calendar-day today";
//   return "";
// }
