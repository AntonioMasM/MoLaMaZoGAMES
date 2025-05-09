import React, { useState } from "react";
import {
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaFacebook,
  FaArtstation,
} from "react-icons/fa";

import FollowersModal from "../Modals/FollowersModal.jsx";
import FollowingModal from "../Modals/FollowingModal.jsx";
import styles from "./UserStats.module.css";

const UserStats = ({ user, assets }) => {
  const [showFollowersModal, setShowFollowersModal] = useState(false);
  const [showFollowingModal, setShowFollowingModal] = useState(false);

  if (!user || !assets) {
    return <div className={styles.skeleton}>Cargando estadísticas...</div>;
  }

  const numAssets = assets.length || 0;
  const numSeguidores = user.seguidores?.length || 0;
  const numSiguiendo = user.siguiendo?.length || 0;

  const { universidad, carrera } = user.formacion || {};
  const {
    software = [],
    skills = [],
    intereses = [],
    redesSociales = {},
  } = user;
  const { instagram, twitter, linkedin, facebook, artstation } = redesSociales;

  const hasSocialLinks =
    instagram || twitter || linkedin || facebook || artstation;

  return (
    <>
      <section
        className={styles.statsSection}
        aria-label="Estadísticas y perfil del usuario"
      >
        {/* Estadísticas numéricas */}
        <div className={styles.statGrid}>
          <StatItem number={numAssets} label="Assets" />
          <div onClick={() => setShowFollowersModal(true)} style={{ cursor: "pointer" }}>
            <StatItem number={numSeguidores} label="Seguidores" />
          </div>
          <div onClick={() => setShowFollowingModal(true)} style={{ cursor: "pointer" }}>
            <StatItem number={numSiguiendo} label="Siguiendo" />
          </div>
        </div>

        {/* Formación */}
        {(universidad || carrera) && (
          <InfoBox title="Formación">
            <ul className={styles.infoList} role="list">
              {universidad && (
                <li>
                  <strong>Universidad:</strong> {universidad}
                </li>
              )}
              {carrera && (
                <li>
                  <strong>Carrera:</strong> {carrera}
                </li>
              )}
            </ul>
          </InfoBox>
        )}

        {/* Software */}
        {software.length > 0 && (
          <InfoBox title="Software">
            <div className={styles.tagGrid} role="list">
              {software.map((item) => (
                <span key={item} className={styles.tagItem}>
                  {item}
                </span>
              ))}
            </div>
          </InfoBox>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <InfoBox title="Habilidades">
            <div className={styles.tagGrid} role="list">
              {skills.map((item) => (
                <span key={item} className={styles.tagItem}>
                  {item}
                </span>
              ))}
            </div>
          </InfoBox>
        )}

        {/* Intereses */}
        {intereses.length > 0 && (
          <InfoBox title="Intereses">
            <div className={styles.tagGrid} role="list">
              {intereses.map((item) => (
                <span key={item} className={styles.tagItem}>
                  {item}
                </span>
              ))}
            </div>
          </InfoBox>
        )}

        {/* Redes Sociales */}
        {hasSocialLinks && (
          <InfoBox title="Redes Sociales">
            <div className={styles.socialLinks}>
              {instagram && (
                <a
                  href={instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <FaInstagram
                    className={`${styles.socialIcon} ${styles["socialIcon--instagram"]}`}
                  />
                </a>
              )}
              {twitter && (
                <a
                  href={twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                >
                  <FaTwitter
                    className={`${styles.socialIcon} ${styles["socialIcon--twitter"]}`}
                  />
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin
                    className={`${styles.socialIcon} ${styles["socialIcon--linkedin"]}`}
                  />
                </a>
              )}
              {facebook && (
                <a
                  href={facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  <FaFacebook
                    className={`${styles.socialIcon} ${styles["socialIcon--facebook"]}`}
                  />
                </a>
              )}
              {artstation && (
                <a
                  href={artstation}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="ArtStation"
                >
                  <FaArtstation
                    className={`${styles.socialIcon} ${styles["socialIcon--artstation"]}`}
                  />
                </a>
              )}
            </div>
          </InfoBox>
        )}
      </section>

      <FollowersModal
        visible={showFollowersModal}
        onClose={() => setShowFollowersModal(false)}
        email={user.email}
      />

      <FollowingModal
        visible={showFollowingModal}
        onClose={() => setShowFollowingModal(false)}
        email={user.email}
      />
    </>
  );
};

const StatItem = ({ number, label }) => (
  <div className={styles.statItem}>
    <span className={styles.statNumber} aria-label={`${label}: ${number}`}>
      {number}
    </span>
    <span className={styles.statLabel}>{label}</span>
  </div>
);

const InfoBox = ({ title, children }) => (
  <div className={styles.infoBox}>
    <h3 className={styles.sectionTitle}>{title}</h3>
    {children}
  </div>
);

export default React.memo(UserStats);
