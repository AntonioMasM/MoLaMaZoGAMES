import React from "react";
import Sidebar from "../components/UserProfile/Sidebar";
import UserFavourites from "../components/UserProfile/UserFavourites";
import styles from "../styles/UserFavouritesPage.module.css";

const UserFavouritesPage = () => {
  return (
    <div className={styles.userProfilePage}>
      {/* 🧭 Menú de navegación lateral */}
      <aside className={styles.sidebarWrapper} aria-label="Menú lateral de navegación del perfil">
        <Sidebar />
      </aside>

      {/* 🧩 Contenido principal */}
      <main className={styles.profileContent} aria-label="Sección de favoritos del usuario">
        <header className={styles.pageHeader}>
          <h1 id="favourites-heading" className={styles.pageTitle}>
            Mis Favoritos
          </h1>
        </header>

        <section
          aria-labelledby="favourites-heading"
          className={styles.sectionContent}
        >
          <UserFavourites />
        </section>
      </main>
    </div>
  );
};

export default UserFavouritesPage;
