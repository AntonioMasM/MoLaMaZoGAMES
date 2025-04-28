import { Link } from "react-router-dom";
import styles from "./NotificationDropdown.module.css";

const NotificationDropdown = ({ notificaciones, loading, onClose, onMarkAllRead }) => {
  const isLoading = loading && notificaciones.length === 0;

  return (
    <div className={styles.dropdown}>
      {isLoading ? (
        <p className={styles.loadingText}>Cargando notificaciones...</p>
      ) : (
        <>
          <div className={styles.header}>
            <span>Notificaciones</span>
            {notificaciones.length > 0 && (
              <button className={styles.markAllButton} onClick={onMarkAllRead}>
                Marcar todas como leídas
              </button>
            )}
          </div>

          <ul className={styles.list}>
            {notificaciones.length === 0 ? (
              <li className={styles.emptyState}>No tienes notificaciones.</li>
            ) : (
              notificaciones.slice(0, 5).map((notificacion) => (
                <li
                  key={notificacion._id}
                  className={`${styles.item} ${!notificacion.leido ? styles.unread : ""}`}
                >
                  <Link to="/notifications" className={styles.itemLink} onClick={onClose}>
                    <p className={styles.contenido}>{notificacion.contenido}</p>
                    <p className={styles.fecha}>
                      {new Date(notificacion.fechaCreacion).toLocaleString("es-ES", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </Link>
                </li>
              ))
            )}
          </ul>

          <div className={styles.footer}>
            <Link to="/notifications" onClick={onClose} className={styles.viewAll}>
              Ver todas
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationDropdown;
