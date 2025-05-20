import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import { useUserInfoData } from "../../hooks/useUserInfoData";
import { useCategoriasSeguidas } from "../../hooks/useCategoriasSeguidas";

import UserWelcome from "./UserWelcome";
import UserGroups from "./UserGroups";
import UserAssets from "./UserAssets";
import UserFollowing from "./UserFollowing";
import UserFavorites from "./UserFavorites";

import styles from "./UserInfo.module.css";

const UserInfo = () => {
  const {
    userData,
    userAssets,
    siguiendoUsuarios,
    gruposTrabajo,
  } = useUserInfoData();

  const { categorias, cargarCategoriasSeguidas } = useCategoriasSeguidas();
  const { user } = useUser();

  const [mostrarDetalle, setMostrarDetalle] = useState(false);
  const [animar, setAnimar] = useState(false);

  useEffect(() => {
    if (user?._id) {
      cargarCategoriasSeguidas(user._id);
    }
  }, [user?._id]);

  useEffect(() => {
    if (mostrarDetalle) {
      const timeout = setTimeout(() => setAnimar(true), 10);
      return () => clearTimeout(timeout);
    } else {
      setAnimar(false);
    }
  }, [mostrarDetalle]);

  if (!userData) return null;

  return (
    <section className={styles.userInfo} aria-label="Resumen del perfil del usuario">
      <div className={styles.panel}>
        <UserWelcome
          nickname={userData.nickname}
          ultimoInicioSesion={userData.ultimoInicioSesion}
          userId={userData._id}
        />

        <div className={styles.userSummary}>
          <p>
            Has subido <strong>{userAssets.length}</strong> asset(s), sigues a <strong>{siguiendoUsuarios.length}</strong> usuario(s) y participas en <strong>{gruposTrabajo.length}</strong> grupo(s).
          </p>
          <button
            onClick={() => setMostrarDetalle(prev => !prev)}
            className={styles.toggleButton}
            aria-expanded={mostrarDetalle}
          >
            {mostrarDetalle ? "Ocultar detalles" : "Ver más detalles"}
          </button>
        </div>
      </div>

      {mostrarDetalle && (
        <>
          <div className={`${styles.grid} ${animar ? styles.appear : ""}`}>
            <section className={styles.column} aria-labelledby="user-info-title">
              <h2 id="user-info-title" className={styles.sectionTitle}>Información del usuario</h2>
              <div className={styles.panel}>
                <h3 className={styles.subsectionTitle}>Grupos de trabajo</h3>
                <UserGroups grupos={gruposTrabajo} />
              </div>
            </section>

            <section className={styles.column} aria-labelledby="user-activity-title">
              <h2 id="user-activity-title" className={styles.sectionTitle}>Actividad</h2>
              <div className={styles.panel}>
                <h3 className={styles.subsectionTitle}>Assets subidos</h3>
                <UserAssets assets={userAssets} />
              </div>

              <div className={styles.panel}>
                <h3 className={styles.subsectionTitle}>Usuarios seguidos</h3>
                <UserFollowing usuarios={siguiendoUsuarios} />
              </div>
            </section>
          </div>

          <section className={`${styles.favoritesSection} ${animar ? styles.appear : ""}`} aria-labelledby="favorites-title">
            <h2 id="favorites-title" className={styles.sectionTitle}>Categorías favoritas</h2>
            <div className={styles.panel}>
              <UserFavorites categorias={categorias} />
            </div>
          </section>
        </>
      )}
    </section>
  );
};

export default UserInfo;
