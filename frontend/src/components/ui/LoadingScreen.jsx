// src/components/ui/LoadingScreen.jsx
import React from "react";

export default function LoadingScreen({ message = "Cargando..." }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="loading-screen-container"
    >
      <div className="loading-spinner" />
      <p className="loading-message">{message}</p>
    </div>
  );
}
