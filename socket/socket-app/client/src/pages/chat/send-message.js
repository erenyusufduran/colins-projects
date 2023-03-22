import styles from "./styles.module.css";
import React, { useState } from "react";

const SendMessage = ({ socket, username, room }) => {
  const [message, setMessage] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    if (message !== "") {
      const createdAt = Date.now();
      socket.emit("send_message", { username, room, message, createdAt });
      setMessage("");
    }
  };

  return (
    <div className={styles.sendMessageContainer}>
      <form onSubmit={sendMessage}>
        <input
          className={styles.messageInput}
          placeholder="Message..."
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button className="btn btn-primary" type="submit">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default SendMessage;
