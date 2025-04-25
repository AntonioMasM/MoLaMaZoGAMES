import React from "react";
import {
  FaBookmark,
  FaMapMarkerAlt,
  FaEnvelope,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaTools,
  FaBolt,
  FaHeart
} from "react-icons/fa";

import styles from "./UserInfo.module.css";

// Función para asignar emoji según el software
const getSoftwareIcon = (name) => {
  const lower = name.toLowerCase();
  if (lower.includes("photoshop")) return "🖌️";
  if (lower.includes("blender")) return "🌀";
  if (lower.includes("unity")) return "🎮";
  if (lower.includes("figma")) return "📐";
  if (lower.includes("illustrator")) return "🎨";
  if (lower.includes("zbrush")) return "🪓";
  return "🧰";
};

const UserInfo = ({ user }) => {
  if (!user) return <p className={styles.error}>No se han encontrado datos del usuario.</p>;

  const {
    nombreCompleto,
    nickname,
    email,
    fotoPerfil,
    cargo,
    seguidores = [],
    siguiendo = [],
    redesSociales = {},
    ubicacion = {},
    software = [],
    skills = [],
    intereses = []
  } = user;

  const { instagram, twitter, linkedin } = redesSociales;
  const { pais } = ubicacion;

  return (
    <section className={styles.userInfo} aria-label="Información del perfil del usuario" role="region">
      {/* Cabecera */}
      <header className={styles.header}>
        <div className={styles.avatarContainer}>
          <img
            src={fotoPerfil || "/assets/users/default-avatar.png"}
            alt={`Foto de perfil de ${nombreCompleto || nickname}`}
            className={styles.avatar}
          />
        </div>
        <div className={styles.details}>
          <div className={styles.nameFollow}>
            <h1 className={styles.name}>{nombreCompleto || nickname}</h1>
          </div>
          <ul className={styles.metrics} aria-label="Estadísticas del usuario">
            <li><strong>{seguidores.length}</strong> Seguidores</li>
            <li><strong>{siguiendo.length}</strong> Siguiendo</li>
          </ul>
          {cargo && <p className={styles.bio}>{cargo}</p>}
        </div>
      </header>

      {/* Contenido dividido en columnas */}
      <div className={styles.content}>
        {/* Columna izquierda */}
        <div className={styles.left}>
          <section aria-labelledby="info-title">
            <h2 id="info-title">Información de Usuario</h2>
            <ul className={styles.infoList}>
              {cargo && <li><FaBookmark className={styles.icon} /> {cargo}</li>}
              {pais && <li><FaMapMarkerAlt className={styles.icon} /> {pais}</li>}
              {email && <li><FaEnvelope className={styles.icon} /> {email}</li>}
            </ul>
          </section>

          <section aria-labelledby="social-title">
            <h2 id="social-title">Redes Sociales</h2>
            <div className={styles.socialList}>
              {instagram && <a href={instagram} aria-label="Instagram"><FaInstagram /></a>}
              {twitter && <a href={twitter} aria-label="Twitter"><FaTwitter /></a>}
              {linkedin && <a href={linkedin} aria-label="LinkedIn"><FaLinkedin /></a>}
            </div>
          </section>
        </div>

        <div className={styles.divider} />

        {/* Columna derecha */}
        <div className={styles.right}>
          {software.length > 0 && (
            <section aria-labelledby="software-title">
              <h2 id="software-title" className={styles.subTitle}>
                <FaTools className={styles.iconHeader} aria-hidden="true" /> Software
              </h2>
              <div className={styles.tagList}>
                {software.map((s) => (
                  <span key={s} className={styles.tag} aria-label={`Software: ${s}`}>
                    {getSoftwareIcon(s)} {s}
                  </span>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section aria-labelledby="skills-title">
              <h2 id="skills-title" className={styles.subTitle}>
                <FaBolt className={styles.iconHeader} aria-hidden="true" /> Habilidades
              </h2>
              <div className={styles.tagList}>
                {skills.map((s) => (
                  <span key={s} className={styles.tag} aria-label={`Habilidad: ${s}`}>
                    ✅ {s}
                  </span>
                ))}
              </div>
            </section>
          )}

          {intereses.length > 0 && (
            <section aria-labelledby="intereses-title">
              <h2 id="intereses-title" className={styles.subTitle}>
                <FaHeart className={styles.iconHeader} aria-hidden="true" /> Intereses
              </h2>
              <div className={styles.tagList}>
                {intereses.map((i) => (
                  <span key={i} className={styles.tag} aria-label={`Interés: ${i}`}>
                    💡 {i}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </section>
  );
};

export default UserInfo;
