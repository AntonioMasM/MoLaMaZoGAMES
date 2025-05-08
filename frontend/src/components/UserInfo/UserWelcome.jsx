import styles from "./UserWelcome.module.css";
import { useMensajesNoLeidos } from "../../hooks/useMensajesNoLeidos";
import { Link } from "react-router-dom";

const UserWelcome = ({ nickname, ultimoInicioSesion, userId }) => {
  const { mensajesNoLeidos, loading, error } = useMensajesNoLeidos(userId);

  const fechaFormateada = ultimoInicioSesion
    ? new Date(ultimoInicioSesion).toLocaleString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Nunca";

  return (
    <section className={styles.container} aria-labelledby="welcome-title">
      <h2 id="welcome-title" className={styles.title}>
        Bienvenido de nuevo, <span className={styles.nickname}>{nickname}</span>
      </h2>

      <p className={styles.timestamp}>Última conexión: {fechaFormateada}</p>

      <div
        className={styles.messageStatus}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {loading && <p className={styles.loading}>⏳ Cargando mensajes...</p>}

        {!loading && error && (
          <p className={styles.error}>
            ❗ Ocurrió un error al cargar tus mensajes.
          </p>
        )}

        {!loading && !error && mensajesNoLeidos > 0 && (
          <Link to="/messages" className={styles.unread} role="link">
            ✉️ Tienes <strong>{mensajesNoLeidos}</strong> mensaje(s) sin leer.
          </Link>
        )}

        {!loading && !error && mensajesNoLeidos === 0 && (
          <p className={styles.empty}>No tienes mensajes nuevos.</p>
        )}
      </div>
    </section>
  );
};

export default UserWelcome;
