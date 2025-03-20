import React, { useState } from "react"; 
import { FaStar, FaRegClock, FaChevronLeft, FaChevronRight } from "react-icons/fa"; 
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
  const [currentIndexPopular, setCurrentIndexPopular] = useState(0); // Índice para Lo Más Popular
  const [currentIndexRecent, setCurrentIndexRecent] = useState(0); // Índice para Lo Más Reciente
  
  const assetsPerPage = 6;

  // Función para mostrar los assets visibles en Lo Más Popular
  const getVisibleAssetsPopular = () => {
    return assets.slice(currentIndexPopular, currentIndexPopular + assetsPerPage);
  };

  // Función para mostrar los assets visibles en Lo Más Reciente
  const getVisibleAssetsRecent = () => {
    return assets.slice(currentIndexRecent, currentIndexRecent + assetsPerPage);
  };

  // Función para ir al siguiente grupo de assets en Lo Más Popular
  const goToNextPopular = () => {
    if (currentIndexPopular + assetsPerPage < assets.length) {
      document.querySelector(".asset-grid").classList.add("slide-left");
      setTimeout(() => {
        setCurrentIndexPopular(currentIndexPopular + assetsPerPage);  // Actualiza el índice después de la animación
        document.querySelector(".asset-grid").classList.remove("slide-left");
      }, 500); // Duración de la animación
    }
  };

  // Función para ir al grupo anterior de assets en Lo Más Popular
  const goToPreviousPopular = () => {
    if (currentIndexPopular - assetsPerPage >= 0) {
      document.querySelector(".asset-grid").classList.add("slide-right");
      setTimeout(() => {
        setCurrentIndexPopular(currentIndexPopular - assetsPerPage); // Actualiza el índice después de la animación
        document.querySelector(".asset-grid").classList.remove("slide-right");
      }, 500); // Duración de la animación
    }
  };

  // Función para ir al siguiente grupo de assets en Lo Más Reciente
  const goToNextRecent = () => {
    if (currentIndexRecent + assetsPerPage < assets.length) {
      document.querySelector(".asset-grid2").classList.add("slide-left");
      setTimeout(() => {
        setCurrentIndexRecent(currentIndexRecent + assetsPerPage);  // Actualiza el índice después de la animación
        document.querySelector(".asset-grid2").classList.remove("slide-left");
      }, 500); // Duración de la animación
    }
  };

  // Función para ir al grupo anterior de assets en Lo Más Reciente
  const goToPreviousRecent = () => {
    if (currentIndexRecent - assetsPerPage >= 0) {
      document.querySelector(".asset-grid2").classList.add("slide-right");
      setTimeout(() => {
        setCurrentIndexRecent(currentIndexRecent - assetsPerPage); // Actualiza el índice después de la animación
        document.querySelector(".asset-grid2").classList.remove("slide-right");
      }, 500); // Duración de la animación
    }
  };

  return (
    <>
      <section className="asset-section">
        <h2 className="section-title">
          <span className="star-icon"><FaStar /></span> Lo Más Popular
        </h2>
        <div className="asset-grid">
          {getVisibleAssetsPopular().map((asset, index) => (
            <AssetCard key={index} {...asset} />
          ))}
        </div>

        <div className="carousel-controls">
          <button className="carousel-button" onClick={goToPreviousPopular} disabled={currentIndexPopular === 0}>
            <FaChevronLeft />
          </button>
          <button className="carousel-button" onClick={goToNextPopular} disabled={currentIndexPopular + assetsPerPage >= assets.length}>
            <FaChevronRight />
          </button>
        </div>
      </section>

      <section className="asset-section">
        <h2 className="section-title">
          <span className="clock-icon"><FaRegClock /></span> Lo Más Reciente
        </h2>
        <div className="asset-grid2">
          {getVisibleAssetsRecent().map((asset, index) => (
            <AssetCard key={index} {...asset} />
          ))}
        </div>

        <div className="carousel-controls">
          <button className="carousel-button" onClick={goToPreviousRecent} disabled={currentIndexRecent === 0}>
            <FaChevronLeft />
          </button>
          <button className="carousel-button" onClick={goToNextRecent} disabled={currentIndexRecent + assetsPerPage >= assets.length}>
            <FaChevronRight />
          </button>
        </div>
      </section>
    </>
  );
};

export default AssetSection;
