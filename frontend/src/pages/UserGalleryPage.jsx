import React from "react";
import Sidebar from "../components/UserProfile/Sidebar";
import UserGallery from "../components/UserProfile/UserGallery";
import styles from "../styles/UserProfile.module.css"; // Ya tienes este CSS

const UserGalleryPage = () => (
  <div className={styles.userProfilePage}>
    <Sidebar />
    <main className={styles.profileContent} aria-label="Galería de usuario">
      <section aria-labelledby="gallery-heading">
        <h1 id="gallery-heading" className="sr-only">Galería de usuario</h1>
        <UserGallery />
      </section>
    </main>
  </div>
);

export default UserGalleryPage;
