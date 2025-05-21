import { useRef, useState, useEffect } from "react";
import styles from "./ZoomImage.module.css";

const ZoomImage = ({ src, alt }) => {
  const containerRef = useRef();
  const [backgroundPos, setBackgroundPos] = useState("center");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const isTouch = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    setIsMobile(isTouch);
  }, []);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setBackgroundPos(`${x}% ${y}%`);
  };

  const resetZoom = () => setBackgroundPos("center");

  return (
    <div
      className={styles.zoomContainer}
      ref={containerRef}
      onMouseMove={!isMobile ? handleMouseMove : undefined}
      onMouseLeave={!isMobile ? resetZoom : undefined}
      style={{
        backgroundImage: `url(${src})`,
        backgroundPosition: backgroundPos,
      }}
      role="img"
      aria-label={alt}
    >
      {/* Si el usuario no ve el fondo, mostramos texto alternativo accesible */}
      <span className={styles.visuallyHidden}>{alt}</span>
    </div>
  );
};

export default ZoomImage;
