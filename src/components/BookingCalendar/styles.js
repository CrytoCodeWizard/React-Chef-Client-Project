export function isSelected(day, selectedDate) {
  return selectedDate.isSame(day, "day");
}

export function beforeToday(day) {
  return day.isBefore(new Date(), "day");
}

function isToday(day) {
  return day.isSame(new Date(), "day");
}

export const availableStyles = (same, hover) => {
  if (same) {
    return {
      backgroundColor: "#5CB85C",
    };
  } else {
    return { backgroundColor: "#C1272D" };
  }
};

export default function dayStyles(day, selectedDate) {
  if (beforeToday(day)) return "date-box before";
  if (isSelected(day, selectedDate)) return "date-box selected";
  if (isToday(day)) return "date-box today";
  return "";
}
