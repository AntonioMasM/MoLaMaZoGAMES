import React from "react";
import RegisterForm from "../components/auth/RegisterForm";
import styles from "../styles/Register.module.css";

const Register = () => {
  return (
    <main className={styles.container}>
      <div className={styles.content}>
        <section className={styles.left}>
          <h1 className={styles.title}>MoLaMaZoGAMES</h1>
          <p className={styles.subtitle}>REGÍSTRATE Y ACCEDE A LOS MEJORES ASSETS DEL MUNDO</p>
          <p className={styles.description}>
            Únete a nuestra comunidad para tener acceso gratuito a miles de assets.
          </p>
        </section>

        <section className={styles.right}>
          <RegisterForm />
        </section>
      </div>
    </main>
  );
};

export default Register;
