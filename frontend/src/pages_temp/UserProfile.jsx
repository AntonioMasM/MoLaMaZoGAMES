import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";

import Sidebar from "../components/UserProfile/Sidebar";
import UserInfo from "../components/UserProfile/UserInfo";
import ProfileComments from "../components/UserProfile/ProfileComments";
import UploadAsset from "../components/UserProfile/UploadAsset";

import styles from "../styles/UserProfile.module.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user: contextUser } = useUser();
  const email = contextUser?.email;

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/usuarios/${email}`);
        setUser(response.data);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      } finally {
        setLoading(false);
      }
    };

    if (email) {
      obtenerUsuario();
    } else {
      setLoading(false);
    }
  }, [email]);

  if (loading) {
    return (
      <div className={styles.loadingWrapper} role="status" aria-live="polite">
        <p className={styles.loadingText}>Cargando perfil del usuario…</p>
      </div>
    );
  }

  if (!user) {
    return (
      <main className={styles.emptyState} role="alert">
        <h2>Perfil no encontrado</h2>
        <p>No se ha podido cargar el perfil del usuario. Intenta más tarde o revisa tu sesión.</p>
      </main>
    );
  }

  return (
    <div className={styles.userProfilePage}>
      <Sidebar />

      <main className={styles.profileContent} aria-label="Contenido del perfil de usuario">
        <section className={styles.section} aria-labelledby="info-heading">
          <h2 id="info-heading" className="sr-only">Información del usuario</h2>
          <UserInfo user={user} />
        </section>

        <section
        className={styles.dualSection}
        aria-label="Comentarios y subida de asset"
      >
        <div className={styles.column}>
          <ProfileComments />
        </div>
        <div className={styles.column}>
          <UploadAsset />
        </div>
      </section>

      </main>
    </div>
  );
};

export default UserProfile;
