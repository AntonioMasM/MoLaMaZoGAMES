import React from "react";
import styles from "./UserProfile.module.css";

const ErrorMessage = ({ message }) => (
  <div className={styles.error} role="alert" aria-live="assertive">
    <p>{message || "Ha ocurrido un error."}</p>
  </div>
);

export default ErrorMessage;
