import React from "react";
import { useUser } from "@/context/UserContext";
import FollowButton from "@/components/User/FollowButton";
import SendMessageButton from "@/components/User/SendMessageButton";
import styles from "./UserProfileHeader.module.css";

const UserProfileHeader = ({ user, currentUser, setUser }) => {
  if (!user) {
    return <div className={styles.skeleton}>Cargando perfil...</div>;
  }

  const bannerImage = user.bannerPerfil || "/assets/defaultBanner.webp";
  const profileImage = user.fotoPerfil?.secure_url || "/assets/defaultProfile.webp";
  const isOwnProfile = currentUser?.email === user.email;

  const handleImageError = (e) => {
    e.currentTarget.src = "/assets/defaultProfile.webp";
  };

  return (
    <header
      className={styles.header}
      role="region"
      aria-labelledby="user-profile-heading"
    >
      {/* 🖼 Banner con fallback */}
      <div className={styles.banner}>
        <img
          src={bannerImage}
          alt={`Banner de perfil de ${user.nickname || user.nombreCompleto || "usuario"}`}
          loading="lazy"
          decoding="async"
          className={styles.bannerImage}
          onError={(e) => { e.currentTarget.src = "/assets/defaultBanner.webp"; }}
          role="img"
        />
        {/* ⚙️ Opcional: overlay semitransparente para enfoque visual */}
        {/* <div className={styles.bannerOverlay} aria-hidden="true" /> */}
      </div>

      {/* 👤 Información del usuario */}
      <div className={styles.profileInfo}>
        <figure className={styles.avatarBlock}>
          <img
            src={profileImage}
            alt={`Foto de perfil de ${user.nickname || user.nombreCompleto}`}
            className={styles.profilePic}
            onError={handleImageError}
            loading="lazy"
            decoding="async"
            role="img"
          />
        </figure>

        <div className={styles.textInfo}>
          <h1 id="user-profile-heading" className={styles.nickname}>
            {user.nickname || user.nombreCompleto}
            {user.role === "admin" && (
              <span className={styles.badge} title="Administrador">Admin</span>
            )}
          </h1>

          {user.email && (
            <p className={styles.email}>{user.email}</p>
          )}

          {user.bio && (
            <p className={styles.bio}>{user.bio}</p>
          )}

          {/* 🔘 Botones de acción */}
          {!isOwnProfile && (
            <div className={styles.actionButtons}>
              <FollowButton
                targetUser={user}
                currentUser={currentUser}
                setUser={setUser}
              />
              <SendMessageButton targetUser={user} />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default React.memo(UserProfileHeader);
