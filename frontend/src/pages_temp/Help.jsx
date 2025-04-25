import styles from "../styles/Help.module.css";
import { FaQuestionCircle, FaEnvelope, FaTools, FaUserShield } from "react-icons/fa";

const Help = () => {
  return (
    <main className={styles.page} aria-labelledby="help-title" role="main" tabIndex="0">
      <header className={styles.header}>
        <h1 id="help-title" className={styles.title}>
          <FaQuestionCircle aria-hidden="true" /> Centro de Ayuda
        </h1>
        <p className={styles.subtitle}>
          ¿Tienes dudas o necesitas asistencia? Aquí encontrarás respuestas a las preguntas más frecuentes y formas de contactar con nuestro equipo.
        </p>
      </header>

      <section className={styles.content} aria-label="Preguntas frecuentes y soporte">
        <article className={styles.section}>
          <h2 className={styles.sectionTitle}><FaUserShield aria-hidden="true" /> Seguridad y cuentas</h2>
          <div className={styles.bar} />
          <ul className={styles.list}>
            <li>¿Cómo puedo cambiar mi contraseña?</li>
            <li>¿Qué hago si he olvidado mi contraseña?</li>
            <li>¿Cómo elimino mi cuenta de forma permanente?</li>
          </ul>
        </article>

        <article className={styles.section}>
          <h2 className={styles.sectionTitle}><FaTools aria-hidden="true" /> Uso de la plataforma</h2>
          <div className={styles.bar} />
          <ul className={styles.list}>
            <li>¿Cómo subo un nuevo asset?</li>
            <li>¿Qué licencias están disponibles?</li>
            <li>¿Puedo editar un asset ya publicado?</li>
          </ul>
        </article>

        <article className={styles.section}>
          <h2 className={styles.sectionTitle}><FaEnvelope aria-hidden="true" /> Contacto directo</h2>
          <div className={styles.bar} />
          <p className={styles.paragraph}>
            Si no encuentras la respuesta que buscas o necesitas ayuda personalizada, puedes escribirnos a:
          </p>
          <p className={styles.contact}>
            <FaEnvelope aria-hidden="true" />
            <a href="mailto:soporte@mola.com" className={styles.contactLink}>
              soporte@mola.com
            </a>
          </p>
        </article>

        <footer className={styles.updated}>
          <p><em>Última actualización: Marzo 2025</em></p>
        </footer>
      </section>
    </main>
  );
};

export default Help;
