// src/components/UserInfo/UserInfo.jsx
import { useEffect } from "react";
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
    // ⛔️ categoríasFavoritas —> eliminada, ya no se usa aquí
  } = useUserInfoData();

  const { categorias, cargarCategoriasSeguidas } = useCategoriasSeguidas();
  const { user } = useUser();

  useEffect(() => {
    if (user?._id) {
      cargarCategoriasSeguidas(user._id);
    }
  }, [user?._id]);

  if (!userData) return null;

  return (
    <section className={styles.userInfo} aria-label="Resumen del perfil del usuario">
      <div className={styles.grid}>
        {/* Columna izquierda: Info principal */}
        <section className={styles.column} aria-labelledby="user-info-title">
          <h2 id="user-info-title" className={styles.sectionTitle}>Información del usuario</h2>
          <div className={styles.panel}>
            <UserWelcome
              nickname={userData.nickname}
              ultimoInicioSesion={userData.ultimoInicioSesion}
              userId={userData._id}
            />
          </div>

          <div className={styles.panel}>
            <h3 className={styles.subsectionTitle}>Grupos de trabajo</h3>
            <UserGroups grupos={gruposTrabajo} />
          </div>
        </section>

        {/* Columna derecha: Actividad del usuario */}
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

      {/* Categorías favoritas */}
      <section className={styles.favoritesSection} aria-labelledby="favorites-title">
        <h2 id="favorites-title" className={styles.sectionTitle}>Categorías favoritas</h2>
        <div className={styles.panel}>
          <UserFavorites categorias={categorias} />
        </div>
      </section>
    </section>
  );
};

export default UserInfo;
