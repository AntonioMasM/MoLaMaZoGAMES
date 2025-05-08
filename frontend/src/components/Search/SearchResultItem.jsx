import { useState, useEffect, useRef } from "react";
import { useAssets } from "../../hooks/useAssets";
import AssetCard from "../Asset/AssetCard";
import UserCard from "../User/UserCard";
import CategoryCard from "../Category/CategoryCard";
import styles from "./SearchResultItem.module.css";

// 🎯 Función para decidir qué imagen mostrar en assets
const getValidImage = (asset) => {
  if (!asset || !asset.imagenPrincipal || !asset.imagenPrincipal.url) return null;

  const formatosImagen = ["jpg", "jpeg", "png", "webp", "gif", "svg"];
  const urlPrincipal = asset.imagenPrincipal.url;

  const extension = urlPrincipal.split(".").pop().toLowerCase();

  if (formatosImagen.includes(extension)) {
    return urlPrincipal;
  }

  const primeraImagenGaleria = asset.galeriaMultimedia?.find(
    (item) => item.tipo === "image"
  );

  return primeraImagenGaleria ? primeraImagenGaleria.url : null;
};

const SearchResultItem = ({ item }) => {
  const isAsset = item.titulo !== undefined;
  const isUsuario = item.nickname !== undefined;
  const isCategoria = item.nombre !== undefined;

  const { loadByUser } = useAssets();
  const [totalAssets, setTotalAssets] = useState(null);

  // 🔁 Evita múltiples cargas por usuario
  const fetchedOnce = useRef(false);

  useEffect(() => {
    if (isUsuario && item._id && !fetchedOnce.current) {
      const fetchAssetsCount = async () => {
        try {
          const assetsUsuario = await loadByUser(item._id);
          setTotalAssets(assetsUsuario.length);
          fetchedOnce.current = true;
        } catch (error) {
          console.error("Error al cargar assets del usuario:", error);
          setTotalAssets(0);
        }
      };

      fetchAssetsCount();
    }
  }, [item._id, isUsuario, loadByUser]);

  if (isAsset) {
    return (
      <div className={styles.resultItem}>
        <AssetCard
          key={item._id}
          image={getValidImage(item)}
          title={item.titulo}
          id={item._id}
          author={item.autor}
          formats={item.formatos?.map((f) => f.tipo) || []}
          category={item.categorias?.[0] || "General"}
        />
      </div>
    );
  }

  if (isUsuario) {
    return (
      <div className={styles.resultItem}>
        <UserCard
          key={item._id}
          id={item._id}
          email={item.email}
          nickname={item.nickname}
          fotoPerfil={item.fotoPerfil || { secure_url: "/assets/main.webp" }}
          totalAssets={totalAssets ?? 0}
        />
      </div>
    );
  }

  if (isCategoria) {
    return (
      <div className={styles.resultItem}>
        <CategoryCard
          key={item._id}
          nombre={item.nombre}
          imagen={item.imagen}
          _id={item._id}
        />
      </div>
    );
  }

  return null;
};

export default SearchResultItem;
