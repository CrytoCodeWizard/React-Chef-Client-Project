import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage, switchModal } from "../../store/messages/messageActions";
import { selectUser } from "../../store/userLogin/userLoginSelectors";
import { selectChef } from "../../store/users/userSelectors";
import "./MessageModal.css";

function MessageModal() {
  const dispatch = useDispatch();
  const profile = useSelector(selectChef);
  const user = useSelector(selectUser);

  const [message, setMessage] = useState({
    userId: user.id || 0,
    title: "",
    content: "",
    recipientUserId: profile.id || 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(sendMessage({ ...message }));
  };

  return (
    <div className="message-modal">
      <form onSubmit={handleSubmit}>
        <div className="message-modal-title-wrapper">
          <input
            onChange={(e) => setMessage({ ...message, title: e.target.value })}
            className="message-modal-input modal-input-title"
            type="text"
            placeholder="booking for..."
          />

          <span onClick={() => dispatch(switchModal())} className="message-modal-close">
            x
          </span>
        </div>
        <textarea
          onChange={(e) => setMessage({ ...message, content: e.target.value })}
          className="message-modal-input"
          placeholder="write a message"
        ></textarea>

        <button>Send</button>
      </form>
    </div>
  );
}

export default MessageModal;
