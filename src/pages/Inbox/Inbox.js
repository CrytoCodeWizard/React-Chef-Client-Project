import React, { useEffect } from "react";
import { Container, Jumbotron } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserMessages } from "../../store/messages/messageActions";
import { selectUser } from "../../store/userLogin/userLoginSelectors";

function Inbox() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const userId = user.id;

  useEffect(() => {
    dispatch(fetchUserMessages(userId));
  }, [dispatch, userId]);

  return (
    <div className="Inbox">
      <Jumbotron>
        <h1>Inbox</h1>
      </Jumbotron>
      <Container>
        <div>
          <div className="MyProfile-msg">
            <i className="las la-envelope la-2x"></i>2 new messages
          </div>
        </div>
        <div className="Inbox-message-wrapper"></div>
      </Container>
    </div>
  );
}

export default Inbox;
