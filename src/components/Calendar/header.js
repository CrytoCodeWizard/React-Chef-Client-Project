import React from "react";

export default function CalendarHeader({ value, onChange }) {
  function currMonthName() {
    return value.format("MMMM");
  }

  function currYear() {
    return value.format("YYYY");
  }

  function prevMonth() {
    return value.clone().subtract(1, "month");
  }

  function nextMonth() {
    return value.clone().add(1, "month");
  }

  function thisMonth() {
    return value.isSame(new Date(), "month");
  }

  return (
    <div className="header">
      <div className="previous" onClick={() => !thisMonth() && onChange(prevMonth())}>
        {!thisMonth() ? String.fromCharCode(171) : null}
      </div>
      <div className="current">
        {currMonthName()} {currYear()}
      </div>
      <div className="next" onClick={() => onChange(nextMonth())}>
        {String.fromCharCode(187)}
      </div>
    </div>
  );
}

// function isSelected(day) {
//   return value.isSame(day, "day");
// }

// function beforeToday(day) {
//   return moment(day).isBefore(new Date(), "day");
// }

// function isToday(day) {
//   return moment(new Date()).isSame(day, "day");
// }

// // eslint-disable-next-line no-unused-vars
// function currMonthName() {
//   return value.format("MMMM");
// }

// // eslint-disable-next-line no-unused-vars
// function currYear() {
//   return value.format("YYYY");
// }
