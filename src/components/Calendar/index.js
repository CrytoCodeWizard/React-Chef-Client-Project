import React, { useState, useEffect } from "react";
import moment from "moment";
import Header from "./header";
import buildCalendar from "./build";
import "./styles.css";
import dayStyles from "./styles.js";

import { useDispatch, useSelector } from "react-redux";
import { selectAvailableDates } from "../../store/users/userSelectors";
import { addAvailableDate, removeAvailableDate } from "../../store/users/userActions";

export default function Calendar({ value, onChange }) {
  const dispatch = useDispatch();

  const availableDates = useSelector(selectAvailableDates);
  const [calendar, setCalendar] = useState([]);
  const availableDatesArray = availableDates.map((d) => moment(d.date));

  useEffect(() => {
    setCalendar(buildCalendar(value));
  }, [value, dispatch, availableDates]);

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
                    const availableDate = day.format("YYYY-MM-DD");
                    if (same) {
                      console.log("remove");
                      dispatch(removeAvailableDate(availableDate));
                    } else {
                      console.log("add");
                      dispatch(addAvailableDate(availableDate));
                    }
                  }}
                >
                  <div className={dayStyles(day, value)}>{day.format("D")}</div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
