import React from "react";
import {
  FaBookmark,
  FaMapMarkerAlt,
  FaEnvelope,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaFacebook,
  FaTools,
  FaBolt,
  FaHeart,
  FaUniversity,
  FaCity,
  FaPalette,
  FaArtstation
} from "react-icons/fa";
import {
  SiBlender,
  SiAdobephotoshop,
  SiAdobeillustrator
} from "react-icons/si";
import { FaUnity, FaFigma } from "react-icons/fa6";

import styles from "./UserInfo.module.css";

// Icono según nombre del software
const getSoftwareIcon = (name) => {
  const lower = name.toLowerCase();
  if (lower.includes("photoshop")) return <SiAdobephotoshop className={styles.softwareIcon} />;
  if (lower.includes("illustrator")) return <SiAdobeillustrator className={styles.softwareIcon} />;
  if (lower.includes("blender")) return <SiBlender className={styles.softwareIcon} />;
  if (lower.includes("unity")) return <FaUnity className={styles.softwareIcon} />;
  if (lower.includes("figma")) return <FaFigma className={styles.softwareIcon} />;
  return <FaTools className={styles.softwareIcon} />;
};

const UserInfo = ({ user }) => {
  if (!user) return <p className={styles.error}>No se han encontrado datos del usuario.</p>;

  const {
    nombreCompleto,
    nickname,
    email,
    fotoPerfil,
    cargo,
    bio,
    seguidores = [],
    siguiendo = [],
    redesSociales = {},
    ubicacion = {},
    formacion = {},
    software = [],
    skills = [],
    intereses = []
  } = user;

  const { instagram, twitter, linkedin, artstation, facebook } = redesSociales;
  const { pais, municipio } = ubicacion;
  const { universidad, carrera } = formacion;

  return (
    <section className={styles.userInfo} aria-label="Información del perfil del usuario" role="region">
      <header className={styles.header}>
        <div className={styles.avatarContainer}>
          <img
            src={fotoPerfil.secure_url || "/users/defaultProfile.webp"}
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
          {bio && <p className={styles.bio}>{bio}</p>}
        </div>
      </header>

      <div className={styles.content}>
        {/* Columna izquierda */}
        <div className={styles.left}>
          <section aria-labelledby="info-title">
            <h2 id="info-title">Información de Usuario</h2>
            <ul className={styles.infoList}>
              {cargo && <li><FaBookmark className={styles.icon} /> {cargo}</li>}
              {pais && <li><FaMapMarkerAlt className={styles.icon} /> {pais}</li>}
              {municipio && <li><FaCity className={styles.icon} /> {municipio}</li>}
              {email && <li><FaEnvelope className={styles.icon} /> {email}</li>}
            </ul>
          </section>

          {(universidad || carrera) && (
            <section aria-labelledby="education-title">
              <h2 id="education-title">Formación</h2>
              <ul className={styles.infoList}>
                {universidad && <li><FaUniversity className={styles.icon} /> {universidad}</li>}
                {carrera && <li><FaPalette className={styles.icon} /> {carrera}</li>}
              </ul>
            </section>
          )}

          <section aria-labelledby="social-title">
            <h2 id="social-title">Redes Sociales</h2>
            <div className={styles.socialList}>
            {instagram && (
              <a href={instagram} title="Instagram" aria-label="Instagram">
                <FaInstagram />
              </a>
            )}
            {twitter && (
              <a href={twitter} title="Twitter" aria-label="Twitter">
                <FaTwitter />
              </a>
            )}
            {linkedin && (
              <a href={linkedin} title="LinkedIn" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
            )}
            {artstation && (
              <a href={artstation} title="ArtStation" aria-label="ArtStation">
                <FaArtstation/>
              </a>
            )}
            {facebook && (
              <a href={facebook} title="Facebook" aria-label="Facebook">
                <FaFacebook />
              </a>
            )}
          </div>

          </section>
        </div>

        <div className={styles.divider} />

        {/* Columna derecha */}
        <div className={styles.right}>
          {software.length > 0 && (
            <section aria-labelledby="software-title">
              <h2 id="software-title">Software</h2>
              <div className={styles.badgeGrid}>
                {software.map(s => (
                  <div key={s} className={styles.badgeItem}>
                    <span className={styles.badgeIcon}>{getSoftwareIcon(s)}</span> {s}
                  </div>
                ))}
              </div>
            </section>
          )}

          {skills.length > 0 && (
            <section aria-labelledby="skills-title">
              <h2 id="skills-title">Habilidades</h2>
              <div className={styles.badgeGrid}>
                {skills.map(s => (
                  <div key={s} className={styles.badgeItem}>
                    <FaBolt className={styles.badgeIcon} /> {s}
                  </div>
                ))}
              </div>
            </section>
          )}

          {intereses.length > 0 && (
            <section aria-labelledby="intereses-title">
              <h2 id="intereses-title">Intereses</h2>
              <div className={styles.badgeGrid}>
                {intereses.map(i => (
                  <div key={i} className={styles.badgeItem}>
                    <FaHeart className={styles.badgeIcon} /> {i}
                  </div>
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
