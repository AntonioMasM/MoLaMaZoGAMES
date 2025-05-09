import { useState } from "react";
import { actualizarFotoPerfil, actualizarRedesSociales, seguirUsuario, dejarDeSeguirUsuario, obtenerSeguidores, obtenerSiguiendo } from "../services/socialService";

export const useSocial = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const seguir = async (emailObjetivo, emailSeguidor) => {
    setLoading(true);
    setError(null);
    try {
      const data = await seguirUsuario(emailObjetivo, emailSeguidor);
      return data;
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al seguir usuario");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const dejarDeSeguir = async (emailObjetivo, emailSeguidor) => {
    setLoading(true);
    setError(null);
    try {
      const data = await dejarDeSeguirUsuario(emailObjetivo, emailSeguidor);
      return data;
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al dejar de seguir");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const actualizarFoto = async (email, nuevaFotoUrl) => {
    setLoading(true);
    setError(null);
    try {
      const data = await actualizarFotoPerfil(email, nuevaFotoUrl);
      return data;
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al actualizar foto");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const actualizarRedes = async (email, nuevasRedes) => {
    setLoading(true);
    setError(null);
    try {
      const data = await actualizarRedesSociales(email, nuevasRedes);
      return data;
    } catch (err) {
      setError(err.response?.data?.mensaje || "Error al actualizar redes sociales");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const obtenerSeguidores = async (email) => {
    const res = await fetch(`http://localhost:5000/api/usuarios/${email}/seguidores`);
    if (!res.ok) {
      const text = await res.text();
      throw new Error("Error al obtener seguidores: " + text);
    }
    const data = await res.json();
    return data.seguidores;
  };



  return {
    seguir,
    dejarDeSeguir,
    actualizarFoto,
    actualizarRedes,
    obtenerSeguidores,
    obtenerSiguiendo,
    loading,
    error,
  };
};
