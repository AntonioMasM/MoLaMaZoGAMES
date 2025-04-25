import React from "react";
import styles from "./UserProfile.module.css";

const Loading = ({ message }) => (
  <div className={styles.loading} role="status" aria-live="polite">
    <p>{message || "Cargando..."}</p>
  </div>
);

export default Loading;
