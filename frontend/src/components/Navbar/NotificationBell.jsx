import { useState, useEffect, useRef } from "react";
import { FaBell } from "react-icons/fa";
import { useNotifications } from "../../hooks/useNotifications";
import NotificationDropdown from "./NotificationDropdown";
import styles from "./NotificationBell.module.css"; // Estilos separados
import { useUser } from "../../context/UserContext";

const NotificationBell = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);


  const { user } = useUser(); // ⚡ Obtén el usuario
  const usuarioId = user?._id; // ⚡ Saca el ID
  const { notificaciones, loading, marcarTodasComoLeidas } = useNotifications(usuarioId);
  const unreadCount = notificaciones.filter(n => !n.leido).length;

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        closeDropdown();
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className={styles.notificationWrapper} ref={dropdownRef}>
      <button
        className={styles.bellButton}
        onClick={toggleDropdown}
        aria-label="Ver notificaciones"
        aria-haspopup="true"
        aria-expanded={isDropdownOpen}
      >
        <FaBell />
        {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
      </button>

      {isDropdownOpen && (
        <NotificationDropdown
          notificaciones={notificaciones}
          loading={loading}
          onClose={closeDropdown}
          onMarkAllRead={marcarTodasComoLeidas}
        />
      )}
    </div>
  );
};

export default NotificationBell;
