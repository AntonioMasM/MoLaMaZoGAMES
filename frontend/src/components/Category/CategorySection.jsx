import { useEffect, useState } from "react";
import AssetCarousel from "../Asset/AssetCarousel";
import AssetCard from "../Asset/AssetCard";
import styles from "./CategorySection.module.css";

const dummyAssets = [
  {
    image: "/assets/categories/2d.webp",
    title: "Cabaña 3D",
    author: "AntonioMas",
    formats: ["FBX", "OBJ"],
    category: "Entorno"
  },
  {
    image: "/assets/categories/2d.webp",
    title: "Nave Espacial",
    author: "GabrielLlorca",
    formats: ["PNG", "BLEND", "+"],
    category: "Ciencia Ficción"
  },
  {
    image: "/assets/categories/2d.webp",
    title: "Castillo",
    author: "AntonioMas",
    formats: ["FBX", "OBJ"],
    category: "Entorno"
  },
  {
    image: "/assets/categories/2d.webp",
    title: "Luz Solar",
    author: "JoanAsensio",
    formats: ["FBX", "OBJ"],
    category: "Ciencia Ficción"
  }
];

const CategorySection = () => {
  const [categories, setCategories] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetch(`${BASE_URL}/categorias`)
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error al obtener categorías:", error));
  }, []);

  return (
    <section className={styles.categorySection}>
      {categories.length > 0 ? (
        categories.map((category) => (
          <div key={category._id} className={styles.categoryBlock}>
            <AssetCarousel
              title={category.nombre}
              icon={null}
              assets={dummyAssets}
            />
          </div>
        ))
      ) : (
        <p className={styles.loading}>Cargando categorías...</p>
      )}
    </section>
  );
};

export default CategorySection;
