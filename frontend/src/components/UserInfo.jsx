import React, { useState, useEffect } from "react";
import "../styles/UserInfo.css"; // Asegúrate de tener el CSS correspondiente

const UserInfo = () => {
  const [user, setUser] = useState(null);

  // Verificar si el token está presente en localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser)); // Guardamos la información del usuario logueado
    }
  }, []);

  if (!user) {
    return null; // No se muestra nada si el usuario no está logueado
  }

  return (
    <section className="logged-in-hero">
      <div className="logged-in-hero-content">
        {/* Información de bienvenida */}
        <div className="logged-in-welcome">
          <h1>Bienvenido de nuevo, {user.nickname}</h1>
          <p>Última vez conectado: Martes, 20:48</p>
          <p>No has recibido nuevos mensajes</p>
        </div>

        {/* Grupos de trabajo */}
        <div className="logged-in-work-groups">
          <h3>Grupos de Trabajo</h3>
          <ul>
            <li>Grupo E1 - Entorno del Mapa</li>
            <li>Grupo F3 - Ciudad 3</li>
            <li>Grupo E5 - Personajes</li>
          </ul>
        </div>

        {/* Últimos assets */}
        <div className="logged-in-assets">
          <h3>Tus últimos Assets:</h3>
          <div className="assets-list">
            <div className="asset-item">
              <img src="/assets/categories/2d.webp" alt="Cabaña 3D" />
              <p>Cabaña 3D</p>
              <button>Editar</button>
            </div>
            <div className="asset-item">
              <img src="/assets/categories/2d.webp" alt="Cabaña 3D" />
              <p>Cabaña 3D</p>
              <button>Editar</button>
            </div>
            <div className="asset-item">
              <img src="/assets/categories/2d.webp" alt="Cabaña 3D" />
              <p>Cabaña 3D</p>
              <button>Editar</button>
            </div>
          </div>
          <button className="view-all-assets">Ver Todos mis Assets</button>
        </div>

        {/* Siguiendo */}
        <div className="logged-in-following">
          <h3>Siguiendo</h3>
          <div className="following-list">
            <div className="following-item">
              <img src="/assets/categories/2d.webp" alt="Alex Martins" />
              <p>Alex Martins</p>
            </div>
            <div className="following-item">
              <img src="/assets/categories/2d.webp" alt="Diane Smith" />
              <p>Diane Smith</p>
            </div>
            <div className="following-item">
              <img src="/assets/categories/2d.webp" alt="Emma Stone" />
              <p>Emma Stone</p>
            </div>
          </div>
        </div>

        {/* Categorías Favoritas */}
        <div className="logged-in-categories">
          <h3>Categorías Favoritas</h3>
          <div className="categories-list">
            <div className="category-item">
              <img src="/assets/categories/2d.webp" alt="Ciencia Ficción" />
              <p>Ciencia Ficción</p>
            </div>
            <div className="category-item">
              <img src="/assets/categories/2d.webp" alt="Animales" />
              <p>Animales</p>
            </div>
            <div className="category-item">
              <img src="/assets/categories/2d.webp" alt="Pixel Art" />
              <p>Pixel Art</p>
            </div>
            <div className="category-item">
              <img src="/assets/categories/2d.webp" alt="Concept Art" />
              <p>Concept Art</p>
            </div>
            <div className="category-item">
              <img src="/assets/categories/2d.webp" alt="Vehículos" />
              <p>Vehículos</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserInfo;
