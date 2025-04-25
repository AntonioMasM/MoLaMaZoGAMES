import styles from "../styles/Contact.module.css";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
} from "react-icons/fa";

// Datos por defecto
const defaultSocials = {
  facebook: "https://www.facebook.com/molamazogames",
  twitter: "https://twitter.com/molamazogames",
  instagram: "https://www.instagram.com/molamazogames",
  email: "contact@mola.com",
};

const Contact = ({ socials = defaultSocials }) => {
  return (
    <main
      className={styles.page}
      aria-labelledby="contact-title"
      role="main"
      tabIndex="0"
    >
      <header className={styles.header}>
        <h1 id="contact-title" className={styles.title}>
          Contacto
        </h1>
        <p className={styles.subtitle}>
          ¿Dudas, propuestas o sugerencias? ¡Estamos aquí para ayudarte! Conecta
          con MoLaMaZoGAMES a través de nuestras redes o por email.
        </p>
      </header>

      <section className={styles.content} aria-label="Información de contacto">
        <div className={styles.left} role="region" tabIndex="0">
          <h2 className={styles.sectionTitle}>Redes Sociales</h2>
          <div className={styles.bar} />
          <p className={styles.paragraph}>
            Puedes seguirnos en nuestras plataformas oficiales:
          </p>

          <div className={styles.socialList}>
            {socials.facebook && (
              <a
                href={socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className={styles.socialLink}
              >
                <FaFacebook aria-hidden="true" /> Facebook
              </a>
            )}
            {socials.twitter && (
              <a
                href={socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className={styles.socialLink}
              >
                <FaTwitter aria-hidden="true" /> Twitter
              </a>
            )}
            {socials.instagram && (
              <a
                href={socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={styles.socialLink}
              >
                <FaInstagram aria-hidden="true" /> Instagram
              </a>
            )}
          </div>

          {socials.email && (
            <div className={styles.emailSection}>
              <p className={styles.paragraph}>
                <FaEnvelope aria-hidden="true" /> Correo:{" "}
                <a
                  href={`mailto:${socials.email}`}
                  className={styles.emailLink}
                >
                  {socials.email}
                </a>
              </p>
            </div>
          )}
        </div>

        <div className={styles.right} role="region" tabIndex="0">
          <h2 className={styles.sectionTitle}>¿En qué te podemos ayudar?</h2>
          <div className={styles.bar} />
          <p className={styles.paragraph}>
            Si necesitas asistencia personalizada o quieres colaborar con
            nosotros, no dudes en enviarnos un mensaje. También puedes revisar
            nuestras preguntas frecuentes en la sección de ayuda.
          </p>
          <p className={styles.paragraph}>
            Nuestro equipo está disponible de lunes a viernes, de 9:00 a 18:00
            (GMT+1).
          </p>
        </div>
      </section>
    </main>
  );
};

export default Contact;
