import React from "react";
import { FaStar, FaRegClock } from "react-icons/fa";
import Carousel from "./Carousel";
import { Link } from "react-router-dom"
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

const AssetSection = () => {
  return (
    <>
      <Carousel
        title="Lo Más Popular"
        icon={<FaStar />}
        items={assets}
        renderItem={(asset, index) => (
          <Link to={`/asset/${asset.id}`} key={index}> {/* Envolvemos cada AssetCard con un Link */}
            <AssetCard {...asset} />
          </Link>
        )}
        gridClassName="asset-grid"
      />

      <Carousel
        title="Lo Más Reciente"
        icon={<FaRegClock />}
        items={assets}
        renderItem={(asset, index) => (
          <Link to={`/asset/${asset.id}`} key={index}> {/* Envolvemos cada AssetCard con un Link */}
            <AssetCard {...asset} />
          </Link>
        )}
        gridClassName="asset-grid"
        className="recent-carousel"
      />
    </>
  );
};

export default AssetSection;
