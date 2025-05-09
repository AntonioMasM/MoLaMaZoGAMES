import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useFavoritos } from "@/hooks/useFavoritos";
import styles from "./FavoritoButton.module.css";

const FavoritoButton = ({ assetId }) => {
  const { obtenerTodosFavoritos, agregarAssetAFavoritos, eliminarFavoritoPorId, loading } = useFavoritos();
  const [favoritoExistente, setFavoritoExistente] = useState(null);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    const fetchFavoritos = async () => {
      try {
        const favoritosData = await obtenerTodosFavoritos();
        const limpios = (favoritosData.favoritos || []).filter(f => f.asset);
        setFavoritos(limpios);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFavoritos();
  }, []);

  useEffect(() => {
    const encontrado = favoritos.find(fav => fav.asset && fav.asset._id === assetId);
    setFavoritoExistente(encontrado);
  }, [favoritos, assetId]);

  const handleToggleFavorito = async () => {
    try {
      if (favoritoExistente) {
        await eliminarFavoritoPorId(favoritoExistente._id);
      } else {
        await agregarAssetAFavoritos(assetId);
      }
      const nuevosFavoritos = await obtenerTodosFavoritos();
      setFavoritos((nuevosFavoritos.favoritos || []).filter(f => f.asset));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button
      onClick={handleToggleFavorito}
      disabled={loading}
      aria-label={favoritoExistente ? "Eliminar de favoritos" : "Añadir a favoritos"}
      className={`${styles.favoritoButton} ${favoritoExistente ? styles.activo : ""}`}
    >
      {favoritoExistente ? <FaHeart /> : <FaRegHeart />}
    </button>
  );
};

export default FavoritoButton;
