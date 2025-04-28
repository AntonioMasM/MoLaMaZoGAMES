// src/hooks/useMensajes.js
import { useState } from "react";
import {
  crearMensaje,
  obtenerMensajes,
  obtenerMensajePorId,
  actualizarMensaje,
  eliminarMensaje,
  marcarMensajeComoLeido,
  buscarMensajes,
  obtenerMensajesPorRemitente,
  obtenerMensajesPorDestinatario,
} from "../services/mensajeService";

export const useMensajes = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔵 Enviar un nuevo mensaje
  const enviarMensaje = async (mensajeData) => {
    setLoading(true);
    setError(null);
    try {
      return await crearMensaje(mensajeData);
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al enviar el mensaje");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔵 Obtener todos los mensajes
  const obtenerTodosMensajes = async () => {
    setLoading(true);
    setError(null);
    try {
      return await obtenerMensajes();
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al obtener mensajes");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔵 Obtener mensaje por ID
  const obtenerMensajePorIdHook = async (id) => {
    setLoading(true);
    setError(null);
    try {
      return await obtenerMensajePorId(id);
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al obtener el mensaje");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔵 Editar contenido de un mensaje
  const actualizarContenidoMensaje = async (id, nuevoContenido) => {
    setLoading(true);
    setError(null);
    try {
      return await actualizarMensaje(id, nuevoContenido);
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al actualizar el mensaje");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔵 Eliminar mensaje
  const eliminarMensajePorId = async (id) => {
    setLoading(true);
    setError(null);
    try {
      return await eliminarMensaje(id);
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al eliminar el mensaje");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔵 Marcar como leído
  const marcarMensajeComoLeidoHook = async (id) => {
    setLoading(true);
    setError(null);
    try {
      return await marcarMensajeComoLeido(id);
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al marcar como leído");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔵 Buscar mensajes
  const buscarMensajesHook = async (query) => {
    setLoading(true);
    setError(null);
    try {
      return await buscarMensajes(query);
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al buscar mensajes");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔵 Obtener mensajes enviados por un usuario
  const obtenerMensajesEnviados = async (remitenteId) => {
    setLoading(true);
    setError(null);
    try {
      return await obtenerMensajesPorRemitente(remitenteId);
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al obtener mensajes enviados");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔵 Obtener mensajes recibidos por un usuario
  const obtenerMensajesRecibidos = async (destinatarioId) => {
    setLoading(true);
    setError(null);
    try {
      return await obtenerMensajesPorDestinatario(destinatarioId);
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al obtener mensajes recibidos");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    enviarMensaje,
    obtenerTodosMensajes,
    obtenerMensajePorIdHook,
    actualizarContenidoMensaje,
    eliminarMensajePorId,
    marcarMensajeComoLeidoHook,
    buscarMensajesHook,
    obtenerMensajesEnviados,
    obtenerMensajesRecibidos,
    loading,
    error,
  };
};
