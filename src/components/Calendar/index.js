import React, { useState, useEffect } from "react";
import moment from "moment";
import Header from "./header";
import buildCalendar from "./build";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { selectAvailableDates } from "../../store/users/userSelectors";

export default function Calendar({ value, onChange }) {
  const dispatch = useDispatch();

  const availableDates = useSelector(selectAvailableDates);
  const [calendar, setCalendar] = useState([]);
  const availableDatesArray = availableDates.map((d) => moment(d.date));

  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value, dispatch]);

  function isSelected(day) {
    return value.isSame(day, "day");
  }

  function beforeToday(day) {
    return moment(day).isBefore(new Date(), "day");
  }

  function isToday(day) {
    return moment(new Date()).isSame(day, "day");
  }

  // eslint-disable-next-line no-unused-vars
  function currMonthName() {
    return value.format("MMMM");
  }

  // eslint-disable-next-line no-unused-vars
  function currYear() {
    return value.format("YYYY");
  }

  function dayStyles(day) {
    if (beforeToday(day)) return "Calendar-day before";
    if (isSelected(day, value)) return "Calendar-day selected";
    if (isToday(day)) return "Calendar-day today";
    return "";
  }

  const available = {
    backgroundColor: "#5CB85C",
  };

  const unAvailable = {
    backgroundColor: "#C1272D",
  };

  return (
    <div className="calendar">
      <Header value={value} onChange={onChange} />

      <div className="body">
        <div className="day-names">
          {["s", "m", "t", "w", "t", "f", "s"].map((d, i) => (
            <div key={i} className="week">
              {d}
            </div>
          ))}
        </div>
        {calendar.map((week, wi) => (
          <div className="Calendar-week" key={wi}>
            {week.map((day, di) => {
              const same = availableDatesArray.find((date) => {
                const match = day.isSame(date, "day");

                return match;
              });

              return (
                <div
                  key={di}
                  style={same ? available : unAvailable}
                  className="day"
                  onClick={() => {
                    if (day < moment(new Date()).startOf("day")) return;
                    onChange(day);
                    console.log(day.format("YYYY-MM-DD"));
                  }}
                >
                  <div className={dayStyles(day)}>{day.format("D").toString()}</div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
