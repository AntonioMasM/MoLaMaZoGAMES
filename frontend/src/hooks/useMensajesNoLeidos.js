import { useEffect, useState } from "react";
import { obtenerMensajesPorDestinatario } from "../services/mensajeService";

export const useMensajesNoLeidos = (userId) => {
  const [mensajesNoLeidos, setMensajesNoLeidos] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchMensajes = async () => {
      if (!userId) return;

      try {
        const mensajes = await obtenerMensajesPorDestinatario(userId);
        const noLeidos = mensajes.filter((m) => !m.leido).length;
        setMensajesNoLeidos(noLeidos);
      } catch (err) {
        console.error("Error al obtener mensajes:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMensajes();
  }, [userId]);

  return { mensajesNoLeidos, loading, error };
};
