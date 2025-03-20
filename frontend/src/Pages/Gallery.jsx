import React, { useState } from "react";
import AssetCard from "../components/AssetCard";
import Sidebar from "../components/Sidebar";
import "../styles/Gallery.css";

const Gallery = () => {
  // Datos estáticos de ejemplo
  const assets = [
    { id: 1, image: "/assets/categories/2d.webp", title: "Cabaña 3D", author: "Joan99", formats: ["FBX", "OBJ"], category: "Entorno" },
    { id: 2, image: "/assets/categories/2d.webp", title: "Nave Espacial", author: "Joan99", formats: ["PNG", "BLEND"], category: "Ciencia Ficción" },
    { id: 3, image: "/assets/categories/2d.webp", title: "Luz Solar", author: "Joan99", formats: ["FBX", "OBJ"], category: "Ciencia Ficción" },
    { id: 4, image: "/assets/categories/2d.webp", title: "Cabaña 3D", author: "Joan99", formats: ["FBX", "OBJ"], category: "Entorno" },
    { id: 5, image: "/assets/categories/2d.webp", title: "Nave Espacial", author: "Joan99", formats: ["PNG", "BLEND"], category: "Ciencia Ficción" },
    { id: 6, image: "/assets/categories/2d.webp", title: "Luz Solar", author: "Joan99", formats: ["FBX", "OBJ"], category: "Ciencia Ficción" },
  ];

  return (
    <div className="page-container">
      {/* Sidebar fijo en la izquierda */}
      <Sidebar />

      {/* Contenedor principal de la galería */}
      <div className="gallery-content">
        <h1 className="gallery-title">Galería</h1>

        {/* Barra de búsqueda y botón de subir */}
        <div className="gallery-controls">
          <input type="text" placeholder="Buscar Asset" className="gallery-search" />
          <button className="gallery-upload">Subir Asset</button>
        </div>

        {/* Contenedor de assets */}
        <div className="gallery-grid">
          {assets.map((asset) => (
            <AssetCard key={asset.id} {...asset} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
