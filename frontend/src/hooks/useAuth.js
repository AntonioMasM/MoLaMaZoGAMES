import { useState } from "react";
import { login, logout, solicitarRecuperacion, restablecerContrasena, cambiarContrasena } from "../services/authService";

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const iniciarSesion = async (email, password) => {
    setLoading(true);
    setError(null);
  
    try {
      const data = await login(email, password);
      return data;
    } catch (error) {
      console.error("🔥 Error en iniciarSesion:", error);
      setError(error.response?.data?.mensaje || "Error en el inicio de sesión");
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const cerrarSesion = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("Error al cerrar sesión", err);
    }
  };

  const solicitarRecuperacionContrasena = async (email) => {
    setLoading(true);
    setError(null);
    try {
      await solicitarRecuperacion(email);
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al solicitar recuperación");
    } finally {
      setLoading(false);
    }
  };

  const restablecerPassword = async (token, nuevaPassword) => {
    setLoading(true);
    setError(null);
    try {
      await restablecerContrasena(token, nuevaPassword);
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al restablecer contraseña");
    } finally {
      setLoading(false);
    }
  };

  const cambiarPassword = async (email, passwordActual, nuevaPassword) => {
    setLoading(true);
    setError(null);
    try {
      await cambiarContrasena(email, passwordActual, nuevaPassword);
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al cambiar contraseña");
    } finally {
      setLoading(false);
    }
  };

  return {
    iniciarSesion,
    cerrarSesion,
    solicitarRecuperacionContrasena,
    restablecerPassword,
    cambiarPassword,
    loading,
    error,
  };
};
