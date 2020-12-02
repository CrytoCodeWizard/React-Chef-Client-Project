import React, { useEffect, useState } from "react";
import { Button, Container, FormControl, InputGroup, Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { updateBooking } from "../../store/bookings/bookingActions";
import {
  deleteMessage,
  fetchUserMessages,
  sendMessage,
  updateMessageReadStatus,
} from "../../store/messages/messageActions";
import { newMessageCount, selectMessagesSortedByDate } from "../../store/messages/messageSelectors";
import { selectToken, selectUser } from "../../store/userLogin/userLoginSelectors";
import moment from "moment";
import "./Inbox.css";
import { useHistory } from "react-router-dom";

function Inbox() {
  const history = useHistory();
  const token = useSelector(selectToken);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userId = user.id;
  const messages = useSelector(selectMessagesSortedByDate);
  const newMessages = useSelector(newMessageCount);
  const [openMessages, setOpenMessages] = useState([]);
  const [replyMessages, setReplyMessages] = useState([]);
  const [reply, setReply] = useState({
    userId: "",
    recipientUserId: "",
    title: "",
    content: "",
    date: "",
  });

  if (!token || token === null) {
    history.push("/");
  }

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserMessages(userId));
    }
  }, [dispatch, userId]);

  const newMessage = {
    background: "#5CB85C",
  };

  const oldMessage = {
    background: "#C1272D",
  };

  const handleAcceptBooking = (bookingId, bookingDate) => () => {
    dispatch(updateBooking(bookingId, bookingDate));
  };

  const handleDeleteMessage = (messageId, userId) => () => {
    dispatch(deleteMessage(messageId, userId));
  };

  const openMessageToggle = (messageId) => {
    if (openMessages.includes(messageId)) {
      const updatedMessages = openMessages.filter((x) => x.id === messageId);
      setOpenMessages([...updatedMessages]);
      dispatch(updateMessageReadStatus(messageId, userId));
    } else {
      setOpenMessages([...openMessages, messageId]);
    }
  };

  const replyMessageToggle = (messageId) => {
    if (replyMessages.includes(messageId)) {
      const updatedMessages = replyMessages.filter((x) => x.id === messageId);
      setReplyMessages([...updatedMessages]);
    } else {
      setReplyMessages([...replyMessages, messageId]);
    }
  };
  const replyInputActive = (messageId, x) => () => {
    if (x) {
      setReply({
        bookingId: x.booking ? x.booking.id : null,
        userId: x.recipientUserId,
        recipientUserId: x.userId,
        title: x.booking
          ? `Reply to booking #${x.booking.id} - ${x.title}`
          : `Reply to: ${x.title}`,
        date: x.date,
      });
    }

    replyMessageToggle(messageId);
  };

  const sendReply = (reply, messageId) => (e) => {
    const isReply = true;

    if (e.key === "Enter" || e.type === "click") {
      dispatch(sendMessage(reply, isReply));
      replyMessageToggle(messageId);
    }
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
          {messages?.map((x) => {
            return (
              <div key={x.id} className="Inbox-message">
                <h5 style={x.new ? newMessage : oldMessage} className="Inbox-message-title">
                  {x.title}
                </h5>
                <p className="Inbox-message-sender">
                  {x.user.firstName} {x.user.lastName}
                </p>
                <p>{moment(x.createdAt).format("YYYY-MM-DD")}</p>
                {!openMessages.includes(x.id) ? (
                  <div className="Inbox-message-content">
                    {`${x.content?.slice(0, 60)}...`}
                    <div style={{ cursor: "pointer" }} onClick={() => openMessageToggle(x.id)}>
                      Read more...
                    </div>
                  </div>
                ) : (
                  <div className="Inbox-message-content">
                    {x.content}
                    <div style={{ cursor: "pointer" }} onClick={() => openMessageToggle(x.id)}>
                      close
                    </div>
                  </div>
                )}

                <div className="Inbox-message-btn-wrapper">
                  {!x.booking ? null : x.booking.accepted ? (
                    <Button
                      onClick={handleAcceptBooking(x.booking.id, x.booking.date)}
                      className="Inbox-message-btn"
                    >
                      Cancel Booking
                    </Button>
                  ) : (
                    <Button
                      variant="success"
                      onClick={handleAcceptBooking(x.booking.id, x.booking.date)}
                      className="Inbox-message-btn"
                    >
                      Accept Booking
                    </Button>
                  )}

                  <Button className="Inbox-message-btn" onClick={replyInputActive(x.id, x)}>
                    Reply
                  </Button>
                  <Button
                    onClick={handleDeleteMessage(x.id, userId)}
                    variant="danger"
                    className="Inbox-message-btn"
                  >
                    Delete
                  </Button>
                </div>
                {replyMessages.includes(x.id) && (
                  <InputGroup className="mb-3 mt-2">
                    <FormControl
                      onChange={(e) => setReply({ ...reply, content: e.target.value })}
                      onKeyPress={sendReply(reply, x.id)}
                      placeholder="write a reply..."
                      aria-label="add tag"
                      aria-describedby="basic-addon"
                    />
                    <InputGroup.Append>
                      <Button onClick={sendReply(reply, x.id)} variant="outline-secondary">
                        <i className="las la-check"></i>
                      </Button>
                    </InputGroup.Append>
                  </InputGroup>
                )}
                <hr></hr>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}

export default Inbox;
