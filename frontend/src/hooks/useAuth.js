// src/hooks/useAuth.js
import { useState } from "react";
import {
  login,
  logout,
  solicitarRecuperacion,
  restablecerContrasena,
  cambiarContrasena,
} from "@/services/auth"; // ✅ Ruta centralizada

export const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔐 Iniciar sesión
  const iniciarSesion = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await login(email, password);
      console.log(data);
      return data;
    } catch (err) {
      console.error("🔥 Error en iniciarSesion:", err);
      setError(err.response?.data?.mensaje || "Error en el inicio de sesión");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔐 Cerrar sesión
  const cerrarSesion = async () => {
    try {
      await logout();
    } catch (err) {
      console.error("❌ Error al cerrar sesión", err);
    }
  };

  // 📩 Solicitar recuperación
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

  // 🔄 Restablecer contraseña
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

  // 🔒 Cambiar contraseña autenticado
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
