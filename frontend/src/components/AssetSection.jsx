import React, { useState } from "react"; 
import { FaStar, FaRegClock, FaChevronLeft, FaChevronRight } from "react-icons/fa"; 
import AssetCard from "./AssetCard"; 
import AssetCarousel from "./AssetCarousel"; 
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
      <AssetCarousel
        title="Lo Más Popular"
        icon={<FaStar />}
        assets={assets}
      />

      <AssetCarousel
        title="Lo Más Reciente"
        icon={<FaRegClock />}
        assets={assets}
        className="recent-carousel"
      />
    </>
  );
};

export default AssetSection;
