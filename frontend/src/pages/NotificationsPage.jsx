import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNotifications } from "../hooks/useNotifications";
import { useUser } from "../context/UserContext";
import styles from "../styles/NotificationsPage.module.css";

const NotificationsPage = () => {
  const { user } = useUser();
  const { notificaciones, loading, error, cargarNotificaciones, marcarTodasComoLeidas, marcarComoLeida } = useNotifications(user?._id);
  const [notRead, setNotRead] = useState([]);
  const [read, setRead] = useState([]);

  useEffect(() => {
    if (user?._id) {
      cargarNotificaciones();
    }
  }, [user?._id]);

  useEffect(() => {
    // ⚡ Cada vez que cargan las notificaciones, separarlas
    setNotRead(notificaciones.filter((n) => !n.leido));
    setRead(notificaciones.filter((n) => n.leido));
  }, [notificaciones]);

  if (loading) {
    return (
      <main className={styles.notificationsPage}>
        <h2 className={styles.title}>Notificaciones</h2>
        <div className={styles.spinner}></div> {/* Spinner en vez de solo texto */}
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.notificationsPage}>
        <h2 className={styles.title}>Notificaciones</h2>
        <p className={styles.error}>Error al cargar: {error}</p>
      </main>
    );
  }

  return (
    <main className={styles.notificationsPage}>
      <div className={styles.header}>
        <h2 className={styles.title}>Tus Notificaciones</h2>
        {notificaciones.length > 0 && (
          <button className={styles.markAllButton} onClick={marcarTodasComoLeidas}>
            Marcar todas como leídas
          </button>
        )}
      </div>

      {notificaciones.length === 0 ? (
        <p className={styles.emptyState}>No tienes notificaciones aún.</p>
      ) : (
        <div className={styles.notificationsContainer}>
          {/* 📩 No leídas */}
          {notRead.length > 0 && (
            <>
              <h3 className={styles.sectionTitle}>No leídas</h3>
              <ul className={styles.notificationsList} role="list">
                {notRead.map((notif) => (
                  <li key={notif._id} className={`${styles.notificationItem} ${styles.unread}`} role="listitem">
                    <Link
                      to={`/notifications/${notif._id}`}
                      className={styles.notificationLink}
                      aria-label={`Ver notificación: ${notif.contenido}`}
                    >
                      <div className={styles.notificationContent}>
                        <span className={styles.unreadDot}></span>
                        <div>
                          <p className={styles.contenido}>{notif.contenido}</p>
                          <p className={styles.fecha}>
                            {new Date(notif.fechaCreacion).toLocaleString("es-ES", {
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* ✅ Leídas */}
          {read.length > 0 && (
            <>
              <h3 className={styles.sectionTitle}>Leídas</h3>
              <ul className={styles.notificationsList} role="list">
                {read.map((notif) => (
                  <li key={notif._id} className={styles.notificationItem} role="listitem">
                    <Link
                      to={`/notifications/${notif._id}`}
                      className={styles.notificationLink}
                      aria-label={`Ver notificación: ${notif.contenido}`}
                    >
                      <div className={styles.notificationContent}>
                        <p className={styles.contenido}>{notif.contenido}</p>
                        <p className={styles.fecha}>
                          {new Date(notif.fechaCreacion).toLocaleString("es-ES", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </main>
  );
};

export default NotificationsPage;
