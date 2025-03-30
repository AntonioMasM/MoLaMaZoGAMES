import React, { useState, useEffect } from "react";
import axios from "axios";
import AssetCard from "./AssetCard";
import UserCard from "./UserCard";
import "../styles/UserInfo.css";

const UserInfo = () => {
  const [user, setUser] = useState(null);
  const [userAssets, setUserAssets] = useState([]);
  const [siguiendoUsuarios, setSiguiendoUsuarios] = useState([]);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedEmail = storedUser?.email;

    if (storedEmail) {
      axios.get(`http://localhost:5000/api/usuarios/${storedEmail}`).then((res) => {
        setUser(res.data);

        axios.get("http://localhost:5000/api/assets/").then((assetRes) => {
          const filteredAssets = assetRes.data.filter(
            (asset) => asset.usuarioCreador === res.data._id
          );
          setUserAssets(filteredAssets);
        });

        axios
          .get(`http://localhost:5000/api/usuarios/${storedEmail}/siguiendo`)
          .then(async (siguiendoRes) => {
            const ids = siguiendoRes.data.siguiendo || [];
            const promesas = ids.map((id) =>
              axios.get(`http://localhost:5000/api/usuarios/id/${id}`)
            );
            const resultados = await Promise.all(promesas);
            const usuarios = resultados.map((r) => r.data);
            setSiguiendoUsuarios(usuarios);
          });
      }).catch((err) => console.error("Error al obtener usuario:", err));
    }
  }, []);

  if (!user) return null;

  const gruposTrabajo = [
    "Grupo E1 - Entorno del Mapa",
    "Grupo F3 - Ciudad 3",
    "Grupo E5 - Personajes",
  ];

  const categoriasFavoritas = [
    "Ciencia Ficción",
    "Animales",
    "Pixel Art",
    "Concept Art",
    "Vehículos",
    "Audios",
    "Entorno",
    "Mobiliario",
  ];

  return (
    <section className="user-info">
      <div className="user-columns">
        {/* Columna izquierda */}
        <div className="user-column left">
          <div className="user-welcome box">
            <h2>Bienvenido de nuevo, {user.nickname}</h2>
            <p>
              <em>Última vez conectado:</em>{" "}
              {user.ultimoInicioSesion
                ? new Date(user.ultimoInicioSesion).toLocaleString("es-ES")
                : "Nunca"}
            </p>
            <p><em>No has recibido nuevos mensajes</em></p>
          </div>

          <div className="user-groups box">
            <h3 className="section-title">Grupos de Trabajo</h3>
            <ul className="group-list">
              {gruposTrabajo.map((grupo, idx) => (
                <li key={idx} className="group-item">
                  <span className="group-icon">👥</span> {grupo}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Columna derecha */}
        <div className="user-column right">
          <div className="user-assets box">
            <div className="user-assets-header">
              <h3 className="section-title">Tus últimos Assets:</h3>
              <button className="view-all">Ver Todos mis Assets</button>
            </div>
            <div className="assets-list">
              {userAssets.slice(0, 3).map((asset) => (
                <AssetCard
                  key={asset._id}
                  image={asset.imagenPrincipal}
                  title={asset.titulo}
                  author={asset.autor}
                  formats={asset.formatos.map((f) => f.tipo)}
                  category={asset.categorias[0] || "General"}
                />
              ))}
            </div>
          </div>

          <div className="user-following box">
            <h3 className="section-title">Siguiendo</h3>
            <div className="following-list">
              {siguiendoUsuarios.map((usuario) => (
                <UserCard
                  key={usuario._id}
                  nickname={usuario.nickname}
                  fotoPerfil={usuario.fotoPerfil}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Categorías favoritas debajo de las dos columnas */}
      <div className="user-categories box">
        <h3 className="section-title">Categorías Favoritas</h3>
        <div className="categories-list">
          {categoriasFavoritas.map((cat, idx) => (
            <div className="category-item" key={idx}>
              <img src={`/assets/categories/2d.webp`} alt={cat} />
              <p>{cat}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UserInfo;
