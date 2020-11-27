import React, { useEffect } from "react";
import { Container, Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserMessages } from "../../store/messages/messageActions";
import { selectMessages } from "../../store/messages/messageSelectors";
import { selectUser } from "../../store/userLogin/userLoginSelectors";
import "./Inbox.css";

function Inbox() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userId = user.id;
  const messages = useSelector(selectMessages);

  useEffect(() => {
    dispatch(fetchUserMessages(userId));
  }, [dispatch, userId]);

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
              <i className="las la-envelope la-2x"></i>2 new messages
            </div>
          </div>
          {messages.map((x) => (
            <div className="Inbox-message">
              <h5 className="Inbox-message-title">{x.title}</h5>
              <p className="Inbox-message-sender">
                from: {x.user.firstName} {x.user.lastName}
              </p>
              <p className="Inbox-message-content">{x.content}</p>
              <div className="Inbox-message-btn-wrapper">
                <button className="Inbox-message-btn">Accept Booking</button>
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
