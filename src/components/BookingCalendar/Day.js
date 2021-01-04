import React from 'react';
import moment from 'moment';
import dayStyles, { availableStyles } from './styles.js';
import { useDispatch, useSelector } from 'react-redux';
import { saveBookingDate } from '../../store/messages/messageActions.js';
import { Button } from 'react-bootstrap';
import { selectToken } from '../../store/userLogin/userLoginSelectors.js';
import { showMessageWithTimeout } from '../../store/appState/appStateActions.js';

const Day = (props) => {
  const token = useSelector(selectToken);

  const dispatch = useDispatch();
  const { dayIndex, same, day, selectedDate, setModalShow } = props;

  // TAKES MOMENT DAY OBJECTS AND FORMATS IT TO COMPARABLE DATE
  const dayPast = moment(same).format('YYYY-MM-DD');
  const currDay = moment(selectedDate).format('YYYY-MM-DD');

  const handleBookingClick = (day) => {
    if (token) {
      dispatch(saveBookingDate(day));
      setModalShow(true);
    } else {
      dispatch(showMessageWithTimeout('danger', true, 'Please login to make a booking'));
    }
  };

  return (
    <div
      key={dayIndex}
      style={availableStyles(same)}
      className='day'
      onClick={() => {
        console.log('Click');
      }}
    >
      <div className={dayStyles(day, selectedDate)}>
        {day.format('D')}
        {same && dayPast >= currDay && (
          <Button
            size='sm'
            className='book-btn'
            variant='primary'
            onClick={() => handleBookingClick(day)}
          >
            Book
          </Button>
        )}
      </div>
    </div>
  );
};

export default Day;
