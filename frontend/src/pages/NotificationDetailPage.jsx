import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getNotificacionPorId, marcarNotificacionLeida } from "../services/notificationsService";
import generateNotificationLink from "@/utils/generateNotificationLink";

import styles from "../styles/NotificationDetailPage.module.css";

const NotificationsDetailPage = () => {
  const { id } = useParams();
  const [notificacion, setNotificacion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarNotificacion = async () => {
      setLoading(true);
      const { data, error } = await getNotificacionPorId(id);
      if (error) {
        setError(error);
      } else {
        setNotificacion(data);

        // 🔥 Además la marcamos como leída si no lo estaba
        if (!data.leido) {
          await marcarNotificacionLeida(id);
        }
      }
      setLoading(false);
    };

    cargarNotificacion();
  }, [id]);

  if (loading) {
    return <div className={styles.loading}>Cargando notificación...</div>;
  }

  if (error || !notificacion) {
    return <div className={styles.error}>No se encontró la notificación.</div>;
  }

  const linkRecurso = generateNotificationLink(notificacion);

  return (
    <main className={styles.notificationsDetailPage}>
      <h1 className={styles.title}>Detalle de la Notificación</h1>

      <div className={styles.notificationCard}>
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

        {/* Mostramos el botón solo si hay enlace válido */}
        {linkRecurso !== '/notifications' && (
          <Link
            to={linkRecurso}
            className={styles.linkButton}
          >
            Ir al recurso relacionado →
          </Link>
        )}
      </div>
    </main>
  );
};

export default NotificationsDetailPage;
