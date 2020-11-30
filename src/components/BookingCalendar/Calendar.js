import React, { useState, useEffect } from "react";
import moment from "moment";
import Header from "./header";
import buildCalendar from "./build";
import "./styles.css";
import { useDispatch, useSelector } from "react-redux";
import { selectAvailableDates } from "../../store/users/userSelectors";
import Day from "./Day";
import SendMessageModal from "../SendMessageModal/SendMessageModal";

export default function Calendar({ selectedDate, onChange }) {
  const [modalShow, setModalShow] = React.useState(false);
  const dispatch = useDispatch();
  const availableDates = useSelector(selectAvailableDates);
  const [calendar, setCalendar] = useState([]);
  const availableDatesArray = availableDates.map((d) => moment(d.date));

  useEffect(() => {
    setCalendar(buildCalendar(selectedDate));
  }, [selectedDate, dispatch, availableDates]);
  return (
    <div className="calendar-booking">
      <Header selectedDate={selectedDate} onChange={onChange} />

      <div className="body">
        <div className="day-names">
          {["s", "m", "t", "w", "t", "f", "s"].map((d, i) => (
            <div key={i} className="week">
              {d}
            </div>
          ))}
        </div>
        {modalShow && <SendMessageModal show={modalShow} onHide={() => setModalShow(false)} />}
        {calendar.map((week, wi) => (
          <div key={wi}>
            {week.map((day, di) => {
              const same = availableDatesArray.find((date) => {
                const match = day.isSame(date, "day");

                return match;
              });

              return (
                <Day
                  key={di}
                  same={same}
                  day={day}
                  selectedDate={selectedDate}
                  setModalShow={setModalShow}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
