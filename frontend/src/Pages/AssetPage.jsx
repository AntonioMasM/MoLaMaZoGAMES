import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/AssetPage.css"; // Importa los estilos

// Datos estáticos de ejemplo con múltiples imágenes y comentarios
const assets = [
  {
    id: 1,
    image: "/assets/categories/2d.webp",
    title: "Cabaña 3D",
    author: "AntonioMas",
    formats: ["FBX", "OBJ"],
    category: "Entorno",
    description: "Una cabaña 3D ideal para videojuegos en entornos naturales.",
    images: ["/assets/categories/2d.webp", "/assets/categories/2d.webp"],
    comments: [
      { id: 1, author: "AntonioMas", text: "Gran asset para entornos naturales!" },
      { id: 2, author: "GabrielLlorca", text: "Muy útil, gracias por compartir." }
    ]
  }
  // ... más assets
];

const AssetPage = () => {
  const { id } = useParams();
  const asset = assets.find(a => a.id === parseInt(id));
  const [comments, setComments] = useState(asset ? asset.comments : []);
  const [newComment, setNewComment] = useState("");

  if (!asset) {
    return <div className="asset-page-notfound">Asset no encontrado.</div>;
  }

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    const nextId = comments.length ? comments[comments.length - 1].id + 1 : 1;
    setComments([...comments, { id: nextId, author: "Tú", text: newComment }]);
    setNewComment("");
  };

  return (
    <>
      
      <div className="asset-page-container">
        {/* Columna izquierda: detalles */}
        <aside className="asset-details">
          <div className="author-info">
            <img
              src="/assets/user-placeholder.png"
              alt={asset.author}
              className="author-avatar"
            />
            <div className="author-meta">
              <h2 className="author-name">{asset.author}</h2>
              <button className="btn-follow">Seguir</button>
            </div>
          </div>

          <h1 className="asset-title">{asset.title}</h1>
          <p className="asset-description">{asset.description}</p>

          <div className="action-buttons">
            <button className="btn-download">Descargar Ahora</button>
            <button className="btn-favorite">Guardar en Favoritos</button>
          </div>

          <section className="asset-meta">
            <h3>Categorías</h3>
            <div className="meta-list">
              <span className="meta-item">{asset.category}</span>
            </div>

            <h3>Formatos de Descarga</h3>
            <div className="meta-list">
              {asset.formats.map((f, i) => (
                <span key={i} className="meta-item">
                  {f}
                </span>
              ))}
            </div>
          </section>

          <section className="asset-comments">
            <h3>Comentarios</h3>
            <ul className="comments-list">
              {comments.map(c => (
                <li key={c.id} className="comment-item">
                  <strong>{c.author}:</strong> {c.text}
                </li>
              ))}
            </ul>
            <div className="add-comment">
              <textarea
                className="comment-input"
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="Escribe tu comentario..."
              />
              <button onClick={handleAddComment} className="btn-follow">
                Añadir Comentario
              </button>
            </div>
          </section>

          <section className="asset-info-detailed">
            <h3>Información Detallada</h3>
            <ul>
              <li>
                <strong>Tamaño del Archivo:</strong> 4.5 MB
              </li>
              <li>
                <strong>Resolución:</strong> 1920×1080 px
              </li>
              <li>
                <strong>Fecha de Subida:</strong> 24/03/2025
              </li>
              <li>
                <strong>Número de Archivos:</strong> 2
              </li>
            </ul>
          </section>
        </aside>

        {/* Columna derecha: imágenes */}
        <main className="asset-images">
          {asset.images.map((src, idx) => (
            <img key={idx} src={src} alt={`${asset.title} ${idx + 1}`} />
          ))}
        </main>
      </div>
      
    </>
  );
};

export default AssetPage;
