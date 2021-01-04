import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, switchModal } from '../../store/messages/messageActions';
import { selectBookingDate } from '../../store/messages/messageSelectors';
import { selectUser } from '../../store/userLogin/userLoginSelectors';
import { selectSingleUser } from '../../store/users/userSelectors';
import moment from 'moment';
import './MessageModal.css';

function MessageModal() {
  const dispatch = useDispatch();
  const profile = useSelector(selectSingleUser);
  const user = useSelector(selectUser);
  const date = useSelector(selectBookingDate);
  const messageDate = !date ? '' : moment(date).format('YYYY-MM-DD');

  const [message, setMessage] = useState({
    userId: user.id,
    title: '',
    content: '',
    recipientUserId: profile.id,
    date: messageDate,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendMessage({ ...message }));
    setMessage({
      userId: user.id,
      title: '',
      content: '',
      recipientUserId: profile.id,
      date: messageDate,
    });
  };

  return (
    <div className='message-modal'>
      <form onSubmit={handleSubmit}>
        <div className='message-modal-title-wrapper'>
          <input
            onChange={(e) => setMessage({ ...message, title: e.target.value })}
            className='message-modal-input modal-input-title'
            type='text'
            defaultValue={`booking for... ${message.date}`}
          />

          <span onClick={() => dispatch(switchModal())} className='message-modal-close'>
            x
          </span>
        </div>
        <textarea
          onChange={(e) => setMessage({ ...message, content: e.target.value })}
          className='message-modal-input'
          placeholder='write a message'
        ></textarea>

        <button>Send</button>
      </form>
    </div>
  );
}

export default MessageModal;
