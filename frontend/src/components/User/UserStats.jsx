import React from "react";
import styles from "./UserStats.module.css";

const UserStats = ({ user, assets }) => {
  if (!user || !assets) {
    return <div className={styles.skeleton}>Cargando estadísticas...</div>;
  }

  const numAssets = assets.length || 0;
  const numSeguidores = user.seguidores?.length || 0;
  const numSiguiendo = user.siguiendo?.length || 0;

  const { universidad, carrera } = user.formacion || {};
  const { software = [], skills = [], intereses = [] } = user;

  return (
    <section className={styles.statsSection} aria-label="Estadísticas y perfil del usuario">
      
      {/* Estadísticas numéricas */}
      <div className={styles.statGrid}>
        <StatItem number={numAssets} label="Assets" />
        <StatItem number={numSeguidores} label="Seguidores" />
        <StatItem number={numSiguiendo} label="Siguiendo" />
      </div>

      {/* Estudios */}
      {(universidad || carrera) && (
        <InfoBox title="Formación">
          <ul className={styles.infoList} role="list">
            {universidad && <li><strong>Universidad:</strong> {universidad}</li>}
            {carrera && <li><strong>Carrera:</strong> {carrera}</li>}
          </ul>
        </InfoBox>
      )}

      {/* Software */}
      {software.length > 0 && (
        <InfoBox title="Software">
          <div className={styles.tagGrid} role="list">
            {software.map((item) => (
              <span key={item} className={styles.tagItem}>{item}</span>
            ))}
          </div>
        </InfoBox>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <InfoBox title="Habilidades">
          <div className={styles.tagGrid} role="list">
            {skills.map((item) => (
              <span key={item} className={styles.tagItem}>{item}</span>
            ))}
          </div>
        </InfoBox>
      )}

      {/* Intereses */}
      {intereses.length > 0 && (
        <InfoBox title="Intereses">
          <div className={styles.tagGrid} role="list">
            {intereses.map((item) => (
              <span key={item} className={styles.tagItem}>{item}</span>
            ))}
          </div>
        </InfoBox>
      )}
    </section>
  );
};

const StatItem = ({ number, label }) => (
  <div className={styles.statItem}>
    <span className={styles.statNumber} aria-label={`${label}: ${number}`}>{number}</span>
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
