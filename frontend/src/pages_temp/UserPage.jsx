import React from "react";
import UserInfo from "../components/UserInfo2";
import AssetCard from "../components/AssetCard";
import "../styles/UserPage.css";

const UserPage = () => {
  // Datos estáticos del usuario ajeno
  const user = {
    _id: "12345",
    nombre: "MichaelSandberg",
    fotoPerfil: "/assets/main.webp",
    vistas: 1200,
    compartidos: 300,
    pageViews: 4500,
    fechaRegistro: "2024-02-15T12:34:56.000Z",
    pais: "España",
    universidad: "Universidad de Alicante"
  };

  // Assets estáticos para el portfolio
  const assets = [
    {
      _id: "asset1",
      image: "/assets/categories/2d.webp",
      title: "Cabaña 3D",
      author: "MichaelSandberg",
      formats: ["FBX", "OBJ"],
      category: "Entorno"
    },
    {
      _id: "asset2",
      image: "/assets/categories/2d.webp",
      title: "Nave Espacial",
      author: "MichaelSandberg",
      formats: ["FBX", "OBJ"],
      category: "Ciencia Ficción"
    },
    {
      _id: "asset3",
      image: "/assets/categories/2d.webp",
      title: "Luz Solar",
      author: "MichaelSandberg",
      formats: ["FBX", "OBJ"],
      category: "Ciencia Ficción"
    }
  ];

  return (
    <div className="user-page">
      {/* Columna izquierda: perfil estático */}
      <aside className="user-page-sidebar">
        <UserInfo user={user} />
      </aside>

      {/* Columna derecha: portfolio */}
      <main className="user-page-content">
        <div className="portfolio-header">
          <h2>Portfolio</h2>
          <button className="btn-sort">Ordenar Por</button>
        </div>
        <div className="asset-grid">
          {assets.map(a => (
            <AssetCard key={a._id} {...a} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default UserPage;
