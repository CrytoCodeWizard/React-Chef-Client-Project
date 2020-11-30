import React from "react";
import dayStyles, { availableStyles } from "./styles.js";
import { useDispatch } from "react-redux";
import { saveBookingDate } from "../../store/messages/messageActions.js";
import { Button } from "react-bootstrap";

const Day = (props) => {
  const dispatch = useDispatch();
  const { dayIndex, same, day, selectedDate, setModalShow } = props;

  const handleBookingClick = (day) => {
    dispatch(saveBookingDate(day));
    setModalShow(true);
  };

  return (
    <div
      key={dayIndex}
      style={availableStyles(same)}
      className="day"
      onClick={() => {
        console.log("Click");
      }}
    >
      <div className={dayStyles(day, selectedDate)}>
        {day.format("D")}
        {same && (
          <Button size="sm" className="book-btn" variant="primary" onClick={handleBookingClick}>
            Book
          </Button>
        )}
      </div>
    </div>
  );
};

export default Day;
