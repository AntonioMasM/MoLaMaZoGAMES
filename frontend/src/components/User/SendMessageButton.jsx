import React, { useState } from "react";
import { FiMail } from "react-icons/fi";
import MessageModal from "@/components/Message/MessageModal";
import styles from "./SendMessageButton.module.css";

const SendMessageButton = ({ targetUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [opening, setOpening] = useState(false);

  if (!targetUser) return null;

  const handleOpenModal = () => {
    if (opening) return;
    setOpening(true);
    setIsModalOpen(true);
    setTimeout(() => setOpening(false), 300);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        type="button"
        className={styles.sendMessageButton}
        onClick={handleOpenModal}
        aria-label={`Enviar mensaje directo a ${targetUser.nickname}`}
        title={`Enviar mensaje directo a ${targetUser.nickname}`}
        disabled={opening}
      >
        <FiMail className={styles.icon} />
        <span>Enviar Mensaje</span>
      </button>

      {isModalOpen && (
        <div aria-live="polite">
          <MessageModal
            destinatario={targetUser}
            onClose={handleCloseModal}
          />
        </div>
      )}
    </>
  );
};

export default React.memo(SendMessageButton);
