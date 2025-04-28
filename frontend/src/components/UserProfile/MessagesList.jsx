import React from "react";
import MessageItem from "./MessageItem";
import styles from "./MessagesList.module.css";

const MessagesList = ({ mensajes = [] }) => {
  return (
    <ul className={styles.messagesList} aria-label="Lista de mensajes" role="list">
      {mensajes.map((mensaje) => (
        <li key={mensaje._id} className={styles.messageItem}>
          <MessageItem mensaje={mensaje} />
        </li>
      ))}
    </ul>
  );
};

export default React.memo(MessagesList);
