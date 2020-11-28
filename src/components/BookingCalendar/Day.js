import React from "react";
import dayStyles, { availableStyles } from "./styles.js";
import { useDispatch } from "react-redux";
import { saveBookingDate, switchModal } from "../../store/messages/messageActions.js";

const Day = (props) => {
  const dispatch = useDispatch();
  const { dayIndex, same, day, selectedDate } = props;

  const handleBookingClick = (day) => {
    dispatch(saveBookingDate(day));
    dispatch(switchModal());
  };

  return (
    <div
      key={dayIndex}
      style={availableStyles(same)}
      className="day"
      onClick={() => {
        console.log("click");
        console.log("DAY", day);
      }}
    >
      <div className={dayStyles(day, selectedDate)}>
        {day.format("D")}
        {same && (
          <button onClick={() => handleBookingClick(day)} className="book-btn">
            book
          </button>
        )}
      </div>
    </div>
  );
};

export default Day;
