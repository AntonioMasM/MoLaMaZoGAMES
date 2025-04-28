import { useState, useEffect } from "react";
import {
  getNotificacionesUsuario,
  marcarNotificacionLeida,
  marcarTodasNotificacionesLeidas
} from "../services/notificationsService";

export const useNotifications = (usuarioId) => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cargarNotificaciones = async () => {
    if (!usuarioId) return;

    setLoading(true);
    const { data, error } = await getNotificacionesUsuario(usuarioId);

    if (error) {
      setError(error);
      setNotificaciones([]);
    } else {
      setError(null);
      setNotificaciones(data);
    }
    setLoading(false);
  };

  const marcarComoLeida = async (notificacionId) => {
    const { data, error } = await marcarNotificacionLeida(notificacionId);
    if (!error) {
      // Actualizamos en local para no tener que volver a hacer fetch
      setNotificaciones((prev) =>
        prev.map((n) => (n._id === notificacionId ? { ...n, leido: true } : n))
      );
    }
    return { data, error };
  };

  const marcarTodasComoLeidas = async () => {
    const { data, error } = await marcarTodasNotificacionesLeidas(usuarioId);
    if (!error) {
      setNotificaciones((prev) => prev.map((n) => ({ ...n, leido: true })));
    }
    return { data, error };
  };

  useEffect(() => {
    if (usuarioId) {
      cargarNotificaciones();
    }
  }, [usuarioId]);
  

  return {
    notificaciones,
    loading,
    error,
    cargarNotificaciones,
    marcarComoLeida,
    marcarTodasComoLeidas
  };
};
