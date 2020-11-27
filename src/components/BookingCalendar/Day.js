import React from "react";
import dayStyles, { availableStyles } from "./styles.js";
// import { addAvailableDate, removeAvailableDate } from "../../store/users/userActions";
import { useDispatch } from "react-redux";
import { switchModal } from "../../store/messages/messageActions.js";

const Day = (props) => {
  const { dayIndex, same, day, selectedDate } = props;

  const dispatch = useDispatch();
  return (
    <div
      key={dayIndex}
      style={availableStyles(same)}
      className="day"
      onClick={() => {
        // const availableDate = day.format("YYYY-MM-DD");
        // if (same) {
        //   dispatch(removeAvailableDate(availableDate));
        // } else {
        //   dispatch(addAvailableDate(availableDate));
        // }
      }}
    >
      <div className={dayStyles(day, selectedDate)}>
        {day.format("D")}
        {same && (
          <button onClick={() => dispatch(switchModal())} className="book-btn">
            book
          </button>
        )}
      </div>
    </div>
  );
};

export default Day;
