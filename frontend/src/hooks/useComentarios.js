import { useUser } from "@/context/UserContext"; // Importa tu contexto de usuario
import { useState, useEffect } from "react";
import { obtenerComentariosPorAsset, crearComentario } from "../services/comentarioService";

export const useComentarios = (assetId) => {
  const { user } = useUser(); // 🔥 Cargamos el usuario aquí
  const [comentarios, setComentarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const cargarComentarios = async () => {
    setLoading(true);
    setError(null);
    try {
      const comentariosData = await obtenerComentariosPorAsset(assetId);
      setComentarios(comentariosData);
    } catch (err) {
      setError("No se pudieron cargar los comentarios.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const añadirComentario = async (contenido) => {
    if (!user) {
      console.error("Usuario no autenticado");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await crearComentario(user._id, assetId, contenido); // 🔥 ¡Ahora correcto!
      setComentarios((prev) => [response.comentario, ...prev]);
    } catch (err) {
      setError("No se pudo crear el comentario.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (assetId) {
      cargarComentarios();
    }
  }, [assetId]);

  return {
    comentarios,
    loading,
    error,
    cargarComentarios,
    añadirComentario,
  };
};
