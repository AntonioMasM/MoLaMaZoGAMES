import { useEffect, useState } from "react";
import { obtenerMensajesPorDestinatario } from "../../services/mensajeService";
import styles from "./UserWelcome.module.css";

const UserWelcome = ({ nickname, ultimoInicioSesion, userId }) => {
  const [mensajesNoLeidos, setMensajesNoLeidos] = useState(0);
  const [loadingMensajes, setLoadingMensajes] = useState(true);

  useEffect(() => {
    const fetchMensajes = async () => {
      try {
        if (!userId) return;
        const mensajes = await obtenerMensajesPorDestinatario(userId);

        const noLeidos = mensajes.filter(mensaje => !mensaje.leido).length;
        setMensajesNoLeidos(noLeidos);
      } catch (error) {
        console.error("Error al cargar mensajes:", error);
      } finally {
        setLoadingMensajes(false);
      }
    };

    fetchMensajes();
  }, [userId]);

  return (
    <div className={styles.welcomeBox}>
      <h2 className={styles.welcomeTitle}>Bienvenido de nuevo, {nickname}</h2>

      <p className={styles.welcomeText}>
        <em>Última vez conectado:</em>{" "}
        {ultimoInicioSesion
          ? new Date(ultimoInicioSesion).toLocaleString("es-ES", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })
          : "Nunca"}
      </p>

      {/* Mensajes nuevos */}
      {loadingMensajes ? (
        <p className={styles.welcomeNote}><em>Cargando mensajes...</em></p>
      ) : mensajesNoLeidos > 0 ? (
        <p className={styles.newMessages}>
          ✉️ <strong>{mensajesNoLeidos}</strong> nuevo(s) mensaje(s) sin leer.
        </p>
      ) : (
        <p className={styles.welcomeNote}>
          <em>No tienes nuevos mensajes.</em>
        </p>
      )}
    </div>
  );
};

export default UserWelcome;
