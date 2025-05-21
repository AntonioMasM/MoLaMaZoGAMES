import { useEffect, useRef } from "react";
import styles from "./Lightbox.module.css";

const Lightbox = ({ galeria, index, onClose, setIndex }) => {
  const recurso = galeria[index];
  const dialogRef = useRef();

  const handleKeyDown = (e) => {
    if (e.key === "Escape") onClose();
    else if (e.key === "ArrowRight") setIndex((i) => (i + 1) % galeria.length);
    else if (e.key === "ArrowLeft") setIndex((i) => (i - 1 + galeria.length) % galeria.length);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = "auto";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handlePrev = () => {
    setIndex((i) => (i - 1 + galeria.length) % galeria.length);
  };

  const handleNext = () => {
    setIndex((i) => (i + 1) % galeria.length);
  };

  return (
<div
  className={styles.overlay}
  role="dialog"
  aria-modal="true"
  onClick={onClose}
  aria-label="Lightbox ampliado"
>
  <div
    className={styles.backdrop}
    onClick={onClose}
  />

  <div
    className={styles.content}
    onClick={(e) => e.stopPropagation()}
    tabIndex={-1}
    ref={dialogRef}
  >
    <button onClick={onClose} className={styles.close} aria-label="Cerrar lightbox">×</button>

    <button onClick={handlePrev} className={styles.navLeft} aria-label="Anterior">‹</button>
    <button onClick={handleNext} className={styles.navRight} aria-label="Siguiente">›</button>

    {recurso.tipo === "image" && (
      <img
        src={recurso.url}
        alt={`Imagen ampliada ${index + 1}`}
        className={styles.media}
        loading="lazy"
      />
    )}

    {recurso.tipo === "video" && (
      <video
        src={recurso.url}
        controls
        autoPlay
        className={styles.media}
        aria-label={`Video ampliado ${index + 1}`}
      />
    )}

    {recurso.tipo === "audio" && (
      <div className={styles.audio}>
        <audio controls autoPlay>
          <source src={recurso.url} type="audio/mpeg" />
        </audio>
      </div>
    )}
  </div>
</div>

  );
};

export default Lightbox;
