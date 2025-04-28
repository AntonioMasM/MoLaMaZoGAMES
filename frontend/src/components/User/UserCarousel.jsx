import { useState, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import UserCard from "./UserCard";
import styles from "./UserCarousel.module.css";

const UserCarousel = ({ title, icon, users = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const usersPerPage = 5;
  const carouselRef = useRef(null);

  const getVisibleUsers = () =>
    users.slice(currentIndex, currentIndex + usersPerPage);

  const handlePageChange = (next) => {
    const grid = carouselRef.current;
    if (!grid) return;

    const directionClass = next ? styles.fadeLeft : styles.fadeRight;
    grid.classList.add(styles.fadeOut);

    setTimeout(() => {
      setCurrentIndex((prev) =>
        next ? prev + usersPerPage : prev - usersPerPage
      );
      grid.classList.remove(styles.fadeOut);
      grid.classList.add(directionClass);

      setTimeout(() => {
        grid.classList.remove(directionClass);
      }, 300);
    }, 300);
  };

  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex + usersPerPage < users.length;

  return (
    <section className={styles.userCarousel} aria-label={`Sección de ${title}`}>
      <h2 className={styles.sectionTitle}>
        <span className={styles.sectionIcon}>{icon}</span> {title}
      </h2>

      <div className={styles.userGrid} ref={carouselRef}>
        {getVisibleUsers().map((user, index) => (
          <UserCard
            key={user._id || index}
            id={user._id}
            nickname={user.nickname}
            fotoPerfil={user.fotoPerfil}
            email={user.email}
          />
        ))}
      </div>

      <div className={styles.carouselControls}>
        <button
          className={styles.carouselButton}
          onClick={() => handlePageChange(false)}
          disabled={!canGoBack}
          aria-label="Usuarios anteriores"
        >
          <FaChevronLeft />
        </button>
        <button
          className={styles.carouselButton}
          onClick={() => handlePageChange(true)}
          disabled={!canGoForward}
          aria-label="Usuarios siguientes"
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default UserCarousel;
