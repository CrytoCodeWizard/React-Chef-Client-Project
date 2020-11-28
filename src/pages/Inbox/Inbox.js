import React, { useEffect, useState } from "react";
import { Container, Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createBooking } from "../../store/bookings/bookingActions";
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
  const [openMessage, setOpenMessage] = useState(false);

  console.log("MESSAGECOUNT", newMessages);

  useEffect(() => {
    dispatch(fetchUserMessages(userId));
  }, [dispatch, userId]);

  const sortedMessages = [...messages].sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );

  const newMessage = {
    background: "#5CB85C",
  };

  const oldMessage = {
    background: "#C1272D",
  };

  const acceptBooking = (date, userId, profileId) => () => {
    console.log("DATE", date, userId, profileId);

    dispatch(createBooking({ date, userId, profileId }));
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
          {sortedMessages.map((x) => (
            <div style={x.new ? newMessage : oldMessage} key={x.id} className="Inbox-message">
              <h5 className="Inbox-message-title">{x.title}</h5>
              <p className="Inbox-message-sender">
                from: {x.user.firstName} {x.user.lastName}
              </p>
              {openMessage ? (
                <div className="Inbox-message-content">
                  {`${x.content.slice(0, 100)}...`}
                  <div style={{ cursor: "pointer" }} onClick={() => setOpenMessage(!openMessage)}>
                    open
                  </div>
                </div>
              ) : (
                <div className="Inbox-message-content">
                  {x.content}
                  <div style={{ cursor: "pointer" }} onClick={() => setOpenMessage(!openMessage)}>
                    close
                  </div>
                </div>
              )}

              <div className="Inbox-message-btn-wrapper">
                <button
                  onClick={acceptBooking(x.date, x.userId, x.recipientUserId)}
                  className="Inbox-message-btn"
                >
                  Accept Booking
                </button>
                <button className="Inbox-message-btn">Reply</button>
                <button className="Inbox-message-btn">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Inbox;
