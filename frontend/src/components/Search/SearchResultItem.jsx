import { useState, useEffect, useRef } from "react";
import { useAssets } from "../../hooks/useAssets";
import AssetCard from "../Asset/AssetCard";
import UserCard from "../User/UserCard";
import CategoryCard from "../Category/CategoryCard";
import styles from "./SearchResultItem.module.css";

const getValidImage = (asset) => {
  if (!asset || !asset.imagenPrincipal?.url) return null;

  const formatosImagen = ["jpg", "jpeg", "png", "webp", "gif", "svg"];
  const urlPrincipal = asset.imagenPrincipal.url;
  const extension = urlPrincipal.split(".").pop().toLowerCase();

  if (formatosImagen.includes(extension)) {
    return urlPrincipal;
  }

  const galeriaImagen = asset.galeriaMultimedia?.find(
    (item) => item.tipo === "image"
  );

  return galeriaImagen?.url || null;
};

const SearchResultItem = ({ item }) => {
  const isAsset = "titulo" in item;
  const isUsuario = "nickname" in item;
  const isCategoria = "nombre" in item;

  const { loadByUser } = useAssets();
  const [totalAssets, setTotalAssets] = useState(null);
  const fetchedOnce = useRef(false);

  useEffect(() => {
    if (isUsuario && item._id && !fetchedOnce.current) {
      const fetchAssetsCount = async () => {
        try {
          const assetsUsuario = await loadByUser(item._id);
          setTotalAssets(assetsUsuario.length);
        } catch (error) {
          console.error("Error al cargar assets del usuario:", error);
          setTotalAssets(0);
        } finally {
          fetchedOnce.current = true;
        }
      };

      fetchAssetsCount();
    }
  }, [item._id, isUsuario, loadByUser]);

  return (
    <article className={styles.resultItem} role="listitem" aria-label="Resultado de búsqueda">
      {isAsset && (
        <AssetCard
          image={getValidImage(item)}
          title={item.titulo}
          id={item._id}
          author={item.autor}
          formats={item.formatos?.map((f) => f.tipo) || []}
          category={item.categorias?.[0] || "General"}
        />
      )}

      {isUsuario && (
        <UserCard
          id={item._id}
          email={item.email}
          nickname={item.nickname}
          fotoPerfil={item.fotoPerfil || { secure_url: "/assets/main.webp" }}
          totalAssets={totalAssets ?? 0}
        />
      )}

      {isCategoria && (
        <CategoryCard
          nombre={item.nombre}
          imagen={item.imagen}
          _id={item._id}
        />
      )}
    </article>
  );
};

export default SearchResultItem;
