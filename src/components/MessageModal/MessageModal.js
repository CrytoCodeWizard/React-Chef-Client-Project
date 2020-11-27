import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { switchModal } from "../../store/messages/messageActions";
import "./MessageModal.css";

function MessageModal() {
  const [message, setMessage] = useState({
    author: 0,
    title: "",
    content: "",
    recipientId: 0,
  });

  const dispatch = useDispatch();

  return (
    <div className="message-modal">
      <div className="message-modal-title-wrapper">
        <input
          onChange={(e) => setMessage({ ...message, title: e.target.value })}
          className="message-modal-input modal-input-title"
          type="text"
        />

        <span onClick={() => dispatch(switchModal())} className="message-modal-close">
          x
        </span>
      </div>
      <textarea
        onChange={(e) => setMessage({ ...message, content: e.target.value })}
        className="message-modal-input"
      ></textarea>

      <button>Send</button>
    </div>
  );
}

export default MessageModal;
