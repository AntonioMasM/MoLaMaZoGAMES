// src/hooks/useLikeComentario.js
import { useState, useEffect } from "react";
import { darLikeComentario, quitarLikeComentario } from "@/services/comentarioLikeService";
import { useUser } from "@/context/UserContext";

export const useLikeComentario = (comentario) => {
  const { user } = useUser();
  const usuarioId = user?._id;

  const [hasLiked, setHasLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(comentario?.likes?.length || 0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!comentario || !usuarioId) {
      setHasLiked(false);
      setLikesCount(0);
      return;
    }

    const likesValidos = comentario.likes?.filter(id => id !== null && id !== undefined) || [];

    const yaHaDadoLike = likesValidos.some(
      (id) => id?.toString() === usuarioId?.toString()
    );

    setHasLiked(yaHaDadoLike);
    setLikesCount(likesValidos.length);
  }, [comentario, usuarioId]);

  const toggleLike = async () => {
    if (!comentario || !usuarioId) return;
    setLoading(true);

    const previousHasLiked = hasLiked;
    const previousLikesCount = likesCount;

    // Optimistic UI
    if (hasLiked) {
      setHasLiked(false);
      setLikesCount((count) => Math.max(count - 1, 0));
    } else {
      setHasLiked(true);
      setLikesCount((count) => count + 1);
    }

    try {
      if (previousHasLiked) {
        await quitarLikeComentario(comentario._id, usuarioId); // ✅ Pasamos comentarioId y usuarioId
      } else {
        await darLikeComentario(comentario._id, usuarioId);
      }
    } catch (error) {
      console.error("Error al alternar el like:", error);
      // Restaurar estado en caso de error
      setHasLiked(previousHasLiked);
      setLikesCount(previousLikesCount);
    } finally {
      setLoading(false);
    }
  };

  return { hasLiked, likesCount, toggleLike, loading };
};
