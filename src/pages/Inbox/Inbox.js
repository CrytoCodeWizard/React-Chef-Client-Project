import React, { useEffect, useState } from "react";
import { Container, Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateBooking } from "../../store/bookings/bookingActions";
import { fetchUserMessages } from "../../store/messages/messageActions";
import { newMessageCount, selectMessages } from "../../store/messages/messageSelectors";
import { selectUser } from "../../store/userLogin/userLoginSelectors";
import "./Inbox.css";

function Inbox() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userId = user.id;
  const messages = useSelector(selectMessages);
  const newMessages = useSelector(newMessageCount);

  const sortedMessages = [...messages]
    .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    .map((x) => ({ ...x, open: false }));

  const [storedMessages, setStoredMessages] = useState(sortedMessages);
  console.log(storedMessages);

  useEffect(() => {
    dispatch(fetchUserMessages(userId));
  }, [dispatch, userId]);

  const newMessage = {
    background: "#5CB85C",
  };

  const oldMessage = {
    background: "#C1272D",
  };

  const openMessage = (id) => () => {
    const alteredMessages = storedMessages.map((x) => (x.id === id ? { ...x, open: !x.open } : x));
    setStoredMessages(alteredMessages);
  };

  const acceptBooking = (bookingId) => () => {
    dispatch(updateBooking(bookingId));
  };

  return (
    <div className="Inbox">
      <Jumbotron>
        <h1>Inbox</h1>
      </Jumbotron>
      <Container>
        <div className="Inbox-message-wrapper">
          <div className="Inbox-message-header">
            <div>from:</div>
            <div>
              <i className="las la-envelope la-2x"></i>
              {newMessages} new messages
            </div>
          </div>
          {storedMessages?.map((x) => {
            return (
              <div style={x.new ? newMessage : oldMessage} key={x.id} className="Inbox-message">
                <h5 className="Inbox-message-title">{x.title}</h5>
                <p className="Inbox-message-sender">
                  from: {x.user.firstName} {x.user.lastName}
                </p>
                {x.open ? (
                  <div className="Inbox-message-content">
                    {`${x.content.slice(0, 60)}...`}
                    <div style={{ cursor: "pointer" }} onClick={openMessage(x.id)}>
                      Read more...
                    </div>
                  </div>
                ) : (
                  <div className="Inbox-message-content">
                    {x.content}
                    <div style={{ cursor: "pointer" }} onClick={openMessage(x.id)}>
                      close
                    </div>
                  </div>
                )}

                <div className="Inbox-message-btn-wrapper">
                  {!x.booking.accepted && (
                    <button onClick={acceptBooking(x.booking.id)} className="Inbox-message-btn">
                      Accept Booking
                    </button>
                  )}

                  <button className="Inbox-message-btn">Reply</button>
                  <button className="Inbox-message-btn">Delete</button>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default Inbox;
