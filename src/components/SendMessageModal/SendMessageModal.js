import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage } from '../../store/messages/messageActions';
import { selectBookingDate } from '../../store/messages/messageSelectors';
import { selectUser } from '../../store/userLogin/userLoginSelectors';
import { selectSingleUser } from '../../store/users/userSelectors';
import moment from 'moment';
import { Button, Form, Modal } from 'react-bootstrap';
import { selectCurrentDate } from '../../store/appState/appStateSelectors';

function SendMessageModal(props) {
  const dispatch = useDispatch();
  const profile = useSelector(selectSingleUser);
  const user = useSelector(selectUser);
  const date = useSelector(selectBookingDate);
  const currentDate = useSelector(selectCurrentDate);
  const messageDate = !date ? '' : moment(date).format('YYYY-MM-DD');

  const [message, setMessage] = useState({
    userId: user.id,
    title: `Message sent on ${currentDate}`,
    content: '',
    recipientUserId: profile.id,
    date: messageDate,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(sendMessage({ ...message }));
    setMessage('');
  };

  console.log('MESSAGE', message);

  return (
    <Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Bookings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Please include booking date and other relevant details...</h4>
        <Form onSubmit={handleSubmit}>
          <Form.Control
            onChange={(e) => setMessage({ ...message, title: e.target.value })}
            defaultValue={`booking for... ${message.date}`}
            type='text'
            placeholder='Normal text'
          />
          <Form.Group controlId='exampleForm.ControlTextarea1'>
            <Form.Label>Booking details</Form.Label>
            <Form.Control
              onChange={(e) => setMessage({ ...message, content: e.target.value })}
              as='textarea'
              rows={3}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit}>Send</Button>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SendMessageModal;
