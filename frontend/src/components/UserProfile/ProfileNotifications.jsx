import { useNotifications } from "../../hooks/useNotifications";
import { useUser } from "../../context/UserContext";
import styles from "./ProfileNotifications.module.css";
import { FaBell, FaCheckCircle } from "react-icons/fa";

const ProfileNotifications = () => {
  const { user } = useUser();
  const { notificaciones, loading, marcarTodasComoLeidas } = useNotifications(user?._id);

  return (
    <section
      className={styles.profileNotifications}
      aria-label="Últimas notificaciones"
      role="region"
    >
      <header className={styles.header}>
        <h3 className={styles.title}>
          <FaBell className={styles.icon} /> Últimas Notificaciones
        </h3>
        {notificaciones.length > 0 && (
          <button
            className={styles.markAllButton}
            onClick={marcarTodasComoLeidas}
            aria-label="Marcar todas como leídas"
          >
            <FaCheckCircle className={styles.iconSmall} /> Marcar todas como leídas
          </button>
        )}
      </header>

      <ul className={styles.list}>
        {loading ? (
          <li className={styles.loading}>Cargando notificaciones...</li>
        ) : notificaciones.length === 0 ? (
          <li className={styles.empty}>No tienes notificaciones aún.</li>
        ) : (
          notificaciones.slice(0, 5).map((n) => (
            <li
              key={n._id}
              className={`${styles.item} ${!n.leido ? styles.unread : ""}`}
            >
              <p className={styles.content}>{n.contenido}</p>
              <p className={styles.timestamp}>
                {new Date(n.fechaCreacion).toLocaleString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </li>
          ))
        )}
      </ul>
    </section>
  );
};

export default ProfileNotifications;
