import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMensajes } from "../hooks/useMensajes";
import { useUser } from "../context/UserContext";
import MessageModal from "../components/Message/MessageModal";
import LoadingScreen from "../components/ui/LoadingScreen";
import styles from "../styles/MessageDetailPage.module.css";
import { aceptarInvitacion } from "../services/grupoService";
import { eliminarMensaje } from "../services/mensajeService";

const MessageDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useUser();
  const { obtenerMensajePorIdHook, marcarMensajeComoLeidoHook } = useMensajes();

  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);
  const [localLoading, setLocalLoading] = useState(true);
  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

  const replyButtonRef = useRef(null);
  const titleRef = useRef(null);

  const handleAceptarInvitacion = async () => {
    try {
      if (!mensaje || !mensaje.contenido || !currentUser) return;

      const regex = /groups\/([a-fA-F0-9]{24})/;
      const match = mensaje.contenido.match(regex);

      if (!match) {
        alert("No se pudo encontrar el grupo en la invitación.");
        return;
      }

      const grupoId = match[1];

      await aceptarInvitacion(grupoId, currentUser._id);
      await eliminarMensaje(mensaje._id); // 🗑️ Borrar el mensaje tras aceptar
      alert("¡Te has unido al grupo correctamente!");
      navigate(`/groups/${grupoId}`);
    } catch (error) {
      console.error("Error al aceptar invitación:", error);
      alert("Hubo un problema al aceptar la invitación.");
    }
  };

  useEffect(() => {
    if (!id || !localLoading) return;

    const cargarDetalle = async () => {
      try {
        const mensajeData = await obtenerMensajePorIdHook(id);
        setMensaje(mensajeData);

        if (!mensajeData.leido) {
          await marcarMensajeComoLeidoHook(id);
        }
      } catch (err) {
        console.error("Error cargando mensaje:", err);
        setError(err.response?.status === 404 ? "Mensaje no encontrado." : "Error al cargar el mensaje.");
      } finally {
        setLocalLoading(false);
      }
    };

    cargarDetalle();
  }, [id, localLoading, obtenerMensajePorIdHook, marcarMensajeComoLeidoHook]);

  useEffect(() => {
    if (replyButtonRef.current) replyButtonRef.current.focus();
    if (titleRef.current) titleRef.current.focus();
  }, [mensaje]);

  useEffect(() => {
    document.body.style.overflow = isReplyModalOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isReplyModalOpen]);

  const handleReply = () => {
    setIsReplyModalOpen(true);
  };

  const handleCloseReplyModal = () => {
    setIsReplyModalOpen(false);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (localLoading) return <LoadingScreen />;

  if (error) {
    return (
      <main className={styles.detailContainer} role="main">
        <h2 ref={titleRef} tabIndex="-1" className={styles.title}>Detalle del Mensaje</h2>
        <p className={styles.error}>{error}</p>
        <button className={styles.backButton} onClick={handleGoBack} aria-label="Volver atrás">
          Volver atrás
        </button>
      </main>
    );
  }

  if (!mensaje) {
    return (
      <main className={styles.detailContainer} role="main">
        <h2 ref={titleRef} tabIndex="-1" className={styles.title}>Mensaje no encontrado</h2>
        <button className={styles.backButton} onClick={handleGoBack} aria-label="Volver atrás">
          Volver atrás
        </button>
      </main>
    );
  }

  return (
    <main className={`${styles.detailContainer} ${styles.fadeIn}`} role="main">
      <div className={styles.header}>
        {mensaje.remitente?.fotoPerfil?.secure_url && (
          <img
            src={mensaje.remitente.fotoPerfil.secure_url}
            alt={`Foto de ${mensaje.remitente.nickname}`}
            className={styles.avatar}
            loading="lazy"
            decoding="async"
            width="64"
            height="64"
          />
        )}
        <h2 ref={titleRef} tabIndex="-1" className={styles.title}>
          De: {mensaje.remitente?.nickname || "Remitente desconocido"}
        </h2>
      </div>

      <p className={styles.date}>
        Enviado el:{" "}
        {new Date(mensaje.fechaEnvio).toLocaleString("es-ES", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>

      <div className={styles.contentCard}>
        <p>{mensaje.contenido}</p>
      </div>

      <div className={styles.buttons}>
        <button
          ref={replyButtonRef}
          className={styles.replyButton}
          onClick={handleReply}
          aria-label="Responder al mensaje"
        >
          Responder
        </button>

        <button
          className={styles.backButton}
          onClick={handleGoBack}
          aria-label="Volver atrás"
        >
          Volver
        </button>

        {mensaje.tipoMensaje === "grupo" && (
          <button
            className={styles.acceptButton}
            onClick={handleAceptarInvitacion}
            aria-label="Aceptar invitación al grupo"
          >
            Aceptar Invitación
          </button>
        )}
      </div>

      {isReplyModalOpen && (
        <MessageModal
          destinatario={mensaje.remitente}
          onClose={handleCloseReplyModal}
        />
      )}
    </main>
  );
};

export default MessageDetailPage;
