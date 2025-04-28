import React, { useState } from "react";
import MessageModal from "@/components/message/MessageModal";
import styles from "./SendMessageButton.module.css";

const SendMessageButton = ({ targetUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [opening, setOpening] = useState(false); // 🆕 Para prevenir doble click rápido

  if (!targetUser) return null; // 🔥 Si no hay usuario objetivo, no muestra nada

  const handleOpenModal = () => {
    if (opening) return; // 🛡️ Prevenir doble apertura
    setOpening(true);
    setIsModalOpen(true);
    setTimeout(() => setOpening(false), 300); // Liberar tras pequeña espera
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        className={styles.sendMessageButton}
        onClick={handleOpenModal}
        aria-label={`Enviar mensaje a ${targetUser.nickname}`}
      >
        📩 Enviar Mensaje
      </button>

      {isModalOpen && (
        <div aria-live="polite"> {/* ♿ Mejor accesibilidad modal dinámico */}
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
