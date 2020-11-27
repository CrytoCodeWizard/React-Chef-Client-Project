import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { switchModal } from "../../store/messages/messageActions";
import "./MessageModal.css";

function MessageModal() {
  const [message, setMessage] = useState({
    author: 0,
    title: "",
    message: "",
    recipientId: 0,
  });

  const dispatch = useDispatch();

  return (
    <div className="message-modal">
      <div className="message-modal-title-wrapper">
        <input className="message-modal-input modal-input-title" type="text"></input>

        <span onClick={() => dispatch(switchModal())} className="message-modal-close">
          x
        </span>
      </div>
      <textarea className="message-modal-input"></textarea>

      <button>Send</button>
    </div>
  );
}

export default MessageModal;
