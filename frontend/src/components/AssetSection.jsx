import React from "react";
import AssetCard from "./AssetCard";
import "../styles/AssetSection.css";

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
];

const AssetSection = () => {
  return (
    <section className="asset-section">
      <h2 className="section-title">⭐ Lo Más Popular</h2>
      <div className="asset-grid">
        {assets.map((asset, index) => (
          <AssetCard key={index} {...asset} />
        ))}
      </div>
    </section>
  );
};

export default AssetSection;
