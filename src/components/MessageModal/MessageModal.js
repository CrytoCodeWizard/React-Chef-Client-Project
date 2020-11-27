import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { switchModal } from "../../store/messages/messageActions";
import { selectUser } from "../../store/userLogin/userLoginSelectors";
import { selectChef } from "../../store/users/userSelectors";
import "./MessageModal.css";

function MessageModal() {
  const profile = useSelector(selectChef);
  const user = useSelector(selectUser);

  const [message, setMessage] = useState({
    author: user.id || 0,
    title: "",
    content: "",
    recipientId: profile.id || 0,
  });

  console.log(message);

  const dispatch = useDispatch();

  return (
    <div className="message-modal">
      <form>
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
