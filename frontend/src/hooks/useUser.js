import { useState } from "react";
import {
  crearUsuario,
  getAllUsuarios,
  getUsuarioPorEmail,
  getUsuarioPorNickname,
  getUsuarioPorId, // 🔥 Nuevo
  actualizarUsuario,
  eliminarUsuario,
  buscarUsuarios
} from "../services/userService";

export const useUser = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const registrarUsuario = async (datosUsuario) => {
    setLoading(true);
    setError(null);
    try {
      const data = await crearUsuario(datosUsuario);
      return data;
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al registrar usuario");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const actualizarPerfil = async (email, datosActualizados) => {
    setLoading(true);
    setError(null);
    try {
      const data = await actualizarUsuario(email, datosActualizados);
      return data;
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al actualizar perfil");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const eliminarPerfil = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const data = await eliminarUsuario(email);
      return data;
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al eliminar usuario");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const buscar = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const resultados = await buscarUsuarios(query);
      return resultados;
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al buscar usuarios");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    registrarUsuario,
    actualizarPerfil,
    eliminarPerfil,
    buscar,
    loading,
    error,
    getAllUsuarios,
    getUsuarioPorEmail,
    getUsuarioPorNickname,
    getUsuarioPorId, // 🔥 Lo añadimos aquí para poder usarlo directamente
  };
};
