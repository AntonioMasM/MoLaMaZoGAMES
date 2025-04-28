import React from "react";
import Sidebar from "../components/UserProfile/Sidebar";
import UserFollowing from "../components/UserProfile/UserFollowing"; // 👈 Nuevo componente
import styles from "../styles/UserProfile.module.css";

const UserFollowingPage = () => {
  return (
    <div className={styles.userProfilePage}>
      {/* 🧭 Menú lateral */}
      <aside className={styles.sidebarWrapper} aria-label="Menú lateral del perfil">
        <Sidebar />
      </aside>

      {/* 🧩 Contenido principal */}
      <main className={styles.profileContent} aria-label="Usuarios que sigues">
        <header className={styles.pageHeader}>
          <h1 id="following-heading" className={styles.pageTitle}>
            Usuarios Seguidos
          </h1>
        </header>

        <section
          aria-labelledby="following-heading"
          className={styles.sectionContent}
        >
          <UserFollowing />
        </section>
      </main>
    </div>
  );
};

export default UserFollowingPage;
