import React from "react";

export default function CalendarHeader({ selectedDate, onChange }) {
  function currMonthName() {
    return selectedDate.format("MMMM");
  }

  function currYear() {
    return selectedDate.format("YYYY");
  }

  function prevMonth() {
    return selectedDate.clone().subtract(1, "month");
  }

  function nextMonth() {
    return selectedDate.clone().add(1, "month");
  }

  function thisMonth() {
    return selectedDate.isSame(new Date(), "month");
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
