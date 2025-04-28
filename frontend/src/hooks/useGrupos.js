// src/hooks/useGrupos.js
import { useState } from "react";
import {
  crearGrupo,
  obtenerGrupoPorId,
  actualizarGrupo,
  eliminarGrupo,
  invitarUsuarioAlGrupo,
  aceptarInvitacion,
  rechazarInvitacion,
  agregarAssetAlGrupo,
  eliminarAssetDelGrupo,
} from "../services/grupoService";

export const useGrupos = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 🔵 Crear un nuevo grupo
  const crearNuevoGrupo = async (grupoData) => {
    setLoading(true);
    setError(null);
    try {
      return await crearGrupo(grupoData);
    } catch (err) {
      setError(err.response?.data?.message || "Error al crear el grupo");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔵 Obtener un grupo por ID
  const obtenerGrupo = async (id) => {
    setLoading(true);
    setError(null);
    try {
      return await obtenerGrupoPorId(id);
    } catch (err) {
      setError(err.response?.data?.message || "Error al obtener el grupo");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔵 Actualizar un grupo
  const actualizarDatosGrupo = async (id, grupoData) => {
    setLoading(true);
    setError(null);
    try {
      return await actualizarGrupo(id, grupoData);
    } catch (err) {
      setError(err.response?.data?.message || "Error al actualizar el grupo");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔵 Eliminar un grupo
  const eliminarGrupoPorId = async (id) => {
    setLoading(true);
    setError(null);
    try {
      return await eliminarGrupo(id);
    } catch (err) {
      setError(err.response?.data?.message || "Error al eliminar el grupo");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔵 Invitar un usuario al grupo
  const invitarUsuario = async (grupoId, usuarioId) => {
    setLoading(true);
    setError(null);
    try {
      return await invitarUsuarioAlGrupo(grupoId, usuarioId);
    } catch (err) {
      setError(err.response?.data?.message || "Error al invitar al usuario");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔵 Aceptar invitación
  const aceptarInvitacionGrupo = async (grupoId, usuarioId) => {
    setLoading(true);
    setError(null);
    try {
      return await aceptarInvitacion(grupoId, usuarioId);
    } catch (err) {
      setError(err.response?.data?.message || "Error al aceptar la invitación");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔵 Rechazar invitación
  const rechazarInvitacionGrupo = async (grupoId, usuarioId) => {
    setLoading(true);
    setError(null);
    try {
      return await rechazarInvitacion(grupoId, usuarioId);
    } catch (err) {
      setError(err.response?.data?.message || "Error al rechazar la invitación");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔵 Agregar un asset al grupo
  const agregarAsset = async (grupoId, assetId) => {
    setLoading(true);
    setError(null);
    try {
      return await agregarAssetAlGrupo(grupoId, assetId);
    } catch (err) {
      setError(err.response?.data?.message || "Error al agregar el asset");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // 🔵 Eliminar un asset del grupo
  const eliminarAsset = async (grupoId, assetId) => {
    setLoading(true);
    setError(null);
    try {
      return await eliminarAssetDelGrupo(grupoId, assetId);
    } catch (err) {
      setError(err.response?.data?.message || "Error al eliminar el asset");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    crearNuevoGrupo,
    obtenerGrupo,
    actualizarDatosGrupo,
    eliminarGrupoPorId,
    invitarUsuario,
    aceptarInvitacionGrupo,
    rechazarInvitacionGrupo,
    agregarAsset,
    eliminarAsset,
    loading,
    error,
  };
};
