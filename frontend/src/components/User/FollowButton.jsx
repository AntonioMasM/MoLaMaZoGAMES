import React, { useState, useEffect } from "react";
import { FiUserPlus, FiUserCheck, FiUserX, FiLoader } from "react-icons/fi";
import { seguirUsuario, dejarDeSeguirUsuario, obtenerSeguidores } from "@/services/socialService";
import { useAlertQueue } from "@/context/AlertQueueContext";
import styles from "./FollowButton.module.css";

const FollowButton = ({ targetUser, currentUser, setUser }) => {
  const { showAlert } = useAlertQueue();
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const currentUserId = currentUser?._id;
  const targetUserId = targetUser?._id;

  if (currentUserId === targetUserId) return null; // No puedes seguirte a ti mismo

  useEffect(() => {
    const fetchFollowingStatus = async () => {
      if (!currentUserId || !targetUserId) {
        setLoading(false);
        return;
      }

      if (targetUser.seguidores && Array.isArray(targetUser.seguidores)) {
        const isAlreadyFollowing = targetUser.seguidores
          .map(id => id.toString())
          .includes(currentUserId.toString());
        setIsFollowing(isAlreadyFollowing);
        setLoading(false);
        return;
      }

      try {
        const seguidoresServer = await obtenerSeguidores(targetUser.email);
        const isFollowingNow = seguidoresServer
          .map(id => id.toString())
          .includes(currentUserId.toString());
        setIsFollowing(isFollowingNow);
      } catch (err) {
        console.error("Error comprobando el estado de seguimiento:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowingStatus();
  }, [currentUserId, targetUserId, targetUser.seguidores]);

  const handleFollowToggle = async () => {
    if (!currentUserId || loading) return;

    setClicked(true);
    setTimeout(() => setClicked(false), 300);

    const previousFollowing = isFollowing;
    setIsFollowing(!previousFollowing);

    try {
      if (previousFollowing) {
        await dejarDeSeguirUsuario(targetUser.email, currentUser.email);
        showAlert("Has dejado de seguir al usuario.", "info");
        setUser(prev => ({
          ...prev,
          seguidores: (prev.seguidores || []).filter(id => id.toString() !== currentUserId.toString())
        }));
      } else {
        await seguirUsuario(targetUser.email, currentUser.email);
        showAlert("Ahora sigues a este usuario.", "success");
        setUser(prev => ({
          ...prev,
          seguidores: [...(prev.seguidores || []), currentUserId]
        }));
      }
    } catch (err) {
      console.error(err);
      setIsFollowing(previousFollowing); // Rollback si falla
      showAlert("Error al actualizar el seguimiento.", "error");
    }
  };

  const getButtonContent = () => {
    if (loading) {
      return (
        <span className={styles.fadeText} aria-hidden="true">
          <FiLoader className={styles.iconSpin} />
        </span>
      );
    }

    if (isFollowing) {
      return hovered ? (
        <>
          <FiUserX /> <span>Dejar de seguir</span>
        </>
      ) : (
        <>
          <FiUserCheck /> <span>Siguiendo</span>
        </>
      );
    }

    return (
      <>
        <FiUserPlus /> <span>Seguir</span>
      </>
    );
  };

  const buttonClassName = `
    ${styles.followButton}
    ${isFollowing ? (hovered ? styles.unfollowHover : styles.following) : styles.notFollowing}
    ${clicked ? styles.bounce : ""}
  `;

  return (
    <button
      className={buttonClassName.trim()}
      onClick={handleFollowToggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      disabled={loading}
      aria-pressed={isFollowing}
      aria-label={isFollowing ? "Dejar de seguir usuario" : "Seguir usuario"}
      title={isFollowing ? (hovered ? "Haz clic para dejar de seguir" : "Siguiendo") : "Haz clic para seguir"}
      aria-live="polite"
    >
      {getButtonContent()}
    </button>
  );
};

export default React.memo(FollowButton);
