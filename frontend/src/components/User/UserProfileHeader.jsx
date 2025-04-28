import { useUser } from "@/context/UserContext";
import FollowButton from "@/components/user/FollowButton";
import SendMessageButton from "@/components/user/SendMessageButton"; // 🔥 Nuevo
import styles from "./UserProfileHeader.module.css";
import React from "react";

const UserProfileHeader = ({ user, currentUser, setUser }) => {
  if (!user) {
    return <div className={styles.skeleton}>Cargando perfil...</div>;
  }

  const bannerImage = user.bannerPerfil || "/assets/defaultBanner.webp";
  const isOwnProfile = currentUser?.email === user.email;

  const handleImageError = (e) => {
    e.currentTarget.src = "/assets/defaultProfile.webp";
  };

  return (
    <section className={styles.header} aria-labelledby="user-profile-heading">
      {/* Banner de fondo */}
      <div className={styles.banner}>
        <img
          src={bannerImage}
          alt={`Banner de ${user.nickname}`}
          loading="lazy"
          decoding="async"
          className={styles.bannerImage}
          onError={(e) => { e.currentTarget.src = "/assets/defaultBanner.webp"; }}
        />
      </div>

      {/* Info del usuario */}
      <div className={styles.profileInfo}>
        <img
          src={user.fotoPerfil?.secure_url || "/assets/defaultProfile.webp"}
          alt={`Foto de perfil de ${user.nickname}`}
          className={styles.profilePic}
          onError={handleImageError}
          loading="lazy"
          decoding="async"
        />

        <div className={styles.textInfo}>
          <h1 id="user-profile-heading" className={styles.nickname}>
            {user.nickname}
            {user.role === "admin" && (
              <span className={styles.badge}>Admin</span>
            )}
          </h1>

          <p className={styles.email}>{user.email}</p>

          {user.bio && <p className={styles.bio}>{user.bio}</p>}

          {/* Botones de acción */}
          {!isOwnProfile && (
            <div className={styles.actionButtons}>
              <FollowButton
                targetUser={user}
                currentUser={currentUser}
                setUser={setUser}
              />
              <SendMessageButton targetUser={user} /> {/* 💬 Aquí simplemente */}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default React.memo(UserProfileHeader);
