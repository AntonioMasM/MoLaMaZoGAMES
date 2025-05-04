import React from "react";
import LoginForm from "../components/auth/LoginForm";
import styles from "../styles/Login.module.css";

const Login = () => {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <section className={styles.left}>
          <h1 className={styles.title}>MoLaMaZoGAMES</h1>
          <p className={styles.subtitle}>DESCUBRE LA MAYOR GALERÍA DE ASSETS DEL MUNDO</p>
          <p className={styles.description}>
            Acceso a miles de assets de todo tipo completamente gratis.
          </p>
        </section>

        <section className={styles.right}>
          <LoginForm />
        </section>
      </div>
    </main>
  );
};

export default Login;
