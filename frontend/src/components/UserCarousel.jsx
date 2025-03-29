import React, { useState, useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import UserCard from "./UserCard";

const UserCarousel = ({ title, icon, users }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const usersPerPage = 6;
  const carouselRef = useRef(null);

  const getVisibleUsers = () => {
    return users.slice(currentIndex, currentIndex + usersPerPage);
  };

  const handlePageChange = (next) => {
    const grid = carouselRef.current;
    if (!grid) return;

    const directionClass = next ? "fade-left" : "fade-right";
    grid.classList.add("fade-out");

    setTimeout(() => {
      setCurrentIndex((prev) =>
        next ? prev + usersPerPage : prev - usersPerPage
      );
      grid.classList.remove("fade-out");
      grid.classList.add(directionClass);

      setTimeout(() => {
        grid.classList.remove(directionClass);
      }, 300);
    }, 300);
  };

  const canGoBack = currentIndex > 0;
  const canGoForward = currentIndex + usersPerPage < users.length;

  return (
    <section className="user-section">
      <h2 className="section-title">
        <span className="section-icon">{icon}</span> {title}
      </h2>

      <div className="user-grid" ref={carouselRef}>
        {getVisibleUsers().map((user) => (
          <UserCard
            key={user._id}
            nickname={user.nickname}
            fotoPerfil={user.fotoPerfil}
          />
        ))}
      </div>

      <div className="carousel-controls">
        <button
          className="carousel-button"
          onClick={() => handlePageChange(false)}
          disabled={!canGoBack}
        >
          <FaChevronLeft />
        </button>
        <button
          className="carousel-button"
          onClick={() => handlePageChange(true)}
          disabled={!canGoForward}
        >
          <FaChevronRight />
        </button>
      </div>
    </section>
  );
};

export default UserCarousel;
