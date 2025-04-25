import styles from "./UserWelcome.module.css";

const UserWelcome = ({ nickname, ultimoInicioSesion }) => (
  <div className={styles.welcomeBox}>
    <h2 className={styles.welcomeTitle}>Bienvenido de nuevo, {nickname}</h2>

    <p className={styles.welcomeText}>
      <em>Última vez conectado:</em>{" "}
      {ultimoInicioSesion
        ? new Date(ultimoInicioSesion).toLocaleString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })
        : "Nunca"}
    </p>

    <p className={styles.welcomeNote}>
      <em>No has recibido nuevos mensajes.</em>
    </p>
  </div>
);

export default UserWelcome;
