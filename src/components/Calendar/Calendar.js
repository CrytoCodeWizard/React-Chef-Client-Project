import React, { useState, useEffect } from "react";
import moment from "moment";
import Header from "./header";
import buildCalendar from "./build";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { selectAvailableDates } from "../../store/users/userSelectors";
import Day from "./Day";

export default function Calendar({ selectedDate, onChange }) {
  const dispatch = useDispatch();
  const availableDates = useSelector(selectAvailableDates);
  const [calendar, setCalendar] = useState([]);
  const availableDatesArray = availableDates.map((d) => moment(d.date));

  useEffect(() => {
    setCalendar(buildCalendar(selectedDate));
  }, [selectedDate, dispatch]);

  return (
    <div className="calendar">
      <Header selectedDate={selectedDate} onChange={onChange} />

      <div className="body">
        <div className="day-names">
          {["s", "m", "t", "w", "t", "f", "s"].map((d, i) => (
            <div key={i} className="week">
              {d}
            </div>
          ))}
        </div>
        {calendar.map((week, wi) => (
          <div key={wi}>
            {week.map((day, di) => {
              const same = availableDatesArray.find((date) => {
                const match = day.isSame(date, "day");

                return match;
              });

              return (
                <Day key={di} same={same} day={day} selectedDate={selectedDate} />
                // <div
                //   key={di}
                //   style={availableStyles(same)}
                //   className="day"
                //   onClick={() => {
                //     const availableDate = day.format("YYYY-MM-DD");
                //     if (same) {
                //       dispatch(removeAvailableDate(availableDate));
                //     } else {
                //       dispatch(addAvailableDate(availableDate));
                //     }
                //   }}
                // >
                //   <div className={dayStyles(day, selectedDate)}>{day.format("D")}</div>
                // </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
