// src/pages/GroupPage.jsx
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { obtenerGrupoPorId } from "../services/grupoService"; // Asumimos que tienes esta función
import { useMensajes } from "../hooks/useMensajes"; // Para enviar invitaciones
import AssetCard from "../components/Asset/AssetCard";
import UserCard from "../components/User/UserCard";

import styles from "../styles/GroupPage.module.css"; // Nuevo CSS

const getValidImage = (asset) => {
  if (!asset || !asset.imagenPrincipal || !asset.imagenPrincipal.url) return null;

  const formatosImagen = ["jpg", "jpeg", "png", "webp", "gif", "svg"];
  const urlPrincipal = asset.imagenPrincipal.url;
  const extension = urlPrincipal.split(".").pop().toLowerCase();

  if (formatosImagen.includes(extension)) {
    return urlPrincipal;
  }

  const primeraImagenGaleria = asset.galeriaMultimedia?.find(
    (item) => item.tipo === "image"
  );

  return primeraImagenGaleria ? primeraImagenGaleria.url : null;
};

const GroupPage = () => {
  const { id } = useParams(); // ID del grupo desde la URL
  const [grupo, setGrupo] = useState(null);
  const [loading, setLoading] = useState(true);
  const { enviarMensaje } = useMensajes(); // Hook para mandar invitaciones

  useEffect(() => {
    const fetchGrupo = async () => {
      try {
        const grupoData = await obtenerGrupoPorId(id);
        setGrupo(grupoData);
      } catch (error) {
        console.error("Error al cargar grupo:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGrupo();
  }, [id]);

  const handleInvitarUsuario = async () => {
    const emailUsuario = prompt("Introduce el email del usuario a invitar:");
    if (!emailUsuario) return;
  
    try {
      // Paso 1: Buscar el usuario por email
      const response = await fetch(`http://localhost:5000/api/usuarios/${emailUsuario}`);
      if (!response.ok) {
        alert("No se encontró el usuario.");
        return;
      }
      const usuarioInvitado = await response.json();
  
      // Paso 2: Crear contenido automático del mensaje
      const contenido = `Te han invitado a colaborar en el grupo "${grupo.titulo}". 
  Haz clic aquí para unirte: http://localhost:5173/groups/${grupo._id}`;
  
      // Paso 3: Crear el mensaje usando tu hook
      await enviarMensaje({
        remitente: grupo.creador._id, // El creador del grupo será quien invite
        destinatario: usuarioInvitado._id, // Usuario invitado
        contenido: contenido,
        tipoMensaje: "grupo",
      });
  
      alert(`Invitación enviada a ${emailUsuario}`);
    } catch (error) {
      console.error("Error al enviar invitación:", error);
      alert("Hubo un problema al enviar la invitación.");
    }
  };
  

  if (loading) {
    return (
      <div className={styles.loading} role="status" aria-live="polite">
        <p>Cargando grupo...</p>
      </div>
    );
  }

  if (!grupo) {
    return (
      <div className={styles.error} role="alert">
        <p>No se encontró el grupo solicitado.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* 🔵 HEADER */}
      <header className={styles.groupHeader}>
        <h1 className={styles.groupTitle}>{grupo.titulo}</h1>
        <button onClick={handleInvitarUsuario} className={styles.inviteButton}>
          Invitar Usuarios
        </button>
      </header>

      {/* 🔵 CONTENIDO */}
      <div className={styles.content}>
        {/* Izquierda: Descripción + Miembros */}
        <aside className={styles.leftColumn}>
          {/* Descripción */}
          {grupo.descripcion && (
            <div className={styles.descriptionBox}>
              <p className={styles.descriptionText}>{grupo.descripcion}</p>
            </div>
          )}

          {/* Miembros */}
          <section className={styles.membersSection} aria-labelledby="usuarios-heading">
            <h2 id="usuarios-heading" className={styles.sectionTitle}>Miembros</h2>
            {grupo.usuarios.length > 0 ? (
              <div className={styles.membersList}>
                {grupo.usuarios.map((usuario) => (
                  <UserCard
                    key={usuario._id}
                    id={usuario._id}
                    nickname={usuario.nickname}
                    email={usuario.email}
                    fotoPerfil={usuario.fotoPerfil || { secure_url: "/assets/main.webp" }}
                  />
                ))}
              </div>
            ) : (
              <p className={styles.emptyText}>Este grupo no tiene miembros aún.</p>
            )}
          </section>
        </aside>

        {/* Derecha: Assets */}
        <section className={styles.rightColumn}>
          <section className={styles.assetsSection} aria-labelledby="assets-heading">
            <h2 id="assets-heading" className={styles.sectionTitle}>Assets Relacionados</h2>
            {grupo.assets.length > 0 ? (
              <div className={styles.assetsList}>
                {grupo.assets.map((asset) => (
                  <AssetCard
                    key={asset._id}
                    id={asset._id}
                    title={asset.titulo}
                    image={getValidImage(asset)}
                    formats={asset.formatos.map((f) => f.tipo)}
                    author={asset.autor}
                    category={asset.categorias[0] || "General"}
                  />
                ))}
              </div>
            ) : (
              <p className={styles.emptyText}>Este grupo no tiene assets aún.</p>
            )}
          </section>
        </section>
      </div>
    </div>
  );
};

export default GroupPage;
