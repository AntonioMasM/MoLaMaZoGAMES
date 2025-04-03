import React, { useState, useEffect } from "react";
import Carousel from "./Carousel";
import AssetCard from "./AssetCard";
import "../styles/CategorySection.css";

const assets = [
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
    title: "Luz Solar",
    author: "JoanAsensio",
    formats: ["FBX", "OBJ"],
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
    title: "Luz Solar",
    author: "JoanAsensio",
    formats: ["FBX", "OBJ"],
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
    title: "Luz Solar",
    author: "JoanAsensio",
    formats: ["FBX", "OBJ"],
    category: "Ciencia Ficción"
  },
  {
    image: "/assets/categories/2d.webp",
    title: "Castillo",
    author: "AntonioMas",
    formats: ["FBX", "OBJ"],
    category: "Entorno"
  },
  
];

const CategorySection = () => {
    const [categories, setCategories] = useState([]);  // Solo guardamos los títulos de las categorías
  
    // Función para obtener las categorías desde la API
    useEffect(() => {
      fetch('http://localhost:5000/api/categorias')
        .then(response => response.json())
        .then(data => setCategories(data))  // Guardamos solo los nombres de las categorías
        .catch(error => console.error("Error al obtener categorías:", error));
    }, []);
  
    return (
      <>
        {/* Mapear las categorías y crear un Carousel para cada una */}
        {categories.map((category) => (
          <Carousel
            key={category._id} // Usamos el ID de la categoría como key
            title={category.nombre} // Nombre de la categoría de la API
            items={assets}  // Los assets estáticos se usan aquí
            renderItem={(asset, index) => <AssetCard key={index} {...asset} />}
            gridClassName="asset-grid"
          />
        ))}
      </>
    );
  };
  
  export default CategorySection;
