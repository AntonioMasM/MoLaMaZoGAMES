import styles from "../styles/Terms.module.css";
import { FaGavel, FaInfoCircle } from "react-icons/fa";

const Terms = () => {
  return (
    <main className={styles.page} aria-labelledby="terms-title" role="main" tabIndex="0">
      <header className={styles.header}>
        <h1 id="terms-title" className={styles.title}>
          <FaGavel aria-hidden="true" /> Términos y Condiciones
        </h1>
        <p className={styles.subtitle}>
          Al utilizar MoLaMaZoGAMES, aceptas cumplir con los siguientes términos de uso. Te recomendamos leer esta sección detenidamente.
        </p>
      </header>

      <section className={styles.content} aria-label="Secciones legales">
        {sections.map(({ title, content, list }, i) => (
          <article key={i} className={styles.section} aria-labelledby={`section-${i}`} role="region" tabIndex="0">
            <h2 id={`section-${i}`} className={styles.sectionTitle}>{title}</h2>
            <div className={styles.bar} />
            <p className={styles.paragraph}>{content}</p>
            {list && (
              <ul className={styles.list}>
                {list.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
          </article>
        ))}

        <article className={styles.section} aria-labelledby="terms-contact" role="region" tabIndex="0">
          <h2 id="terms-contact" className={styles.sectionTitle}>Contacto</h2>
          <div className={styles.bar} />
          <p className={styles.paragraph}>
            Si tienes dudas sobre estos términos, puedes escribirnos a:
          </p>
          <p className={styles.contact}>
            <FaInfoCircle aria-hidden="true" />
            <a href="mailto:legal@mola.com" className={styles.contactLink}>
              legal@mola.com
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

const sections = [
  {
    title: "1. Aceptación de los Términos",
    content:
      "Al registrarte o acceder a nuestra plataforma, aceptas los presentes términos y condiciones, así como nuestra Política de Privacidad.",
  },
  {
    title: "2. Uso Permitido",
    content: "MoLaMaZoGAMES es una plataforma para compartir y gestionar assets digitales. Como usuario, te comprometes a:",
    list: [
      "Usar el sitio de forma legal y ética.",
      "No infringir los derechos de autor u otros derechos de propiedad intelectual.",
      "No distribuir contenido malicioso, ofensivo o ilegal.",
      "Respetar a otros usuarios y sus contribuciones.",
    ],
  },
  {
    title: "3. Derechos sobre el Contenido",
    content:
      "Los assets subidos por los usuarios son propiedad de sus respectivos autores. Al subir contenido, declaras tener los derechos necesarios y otorgas a MoLaMaZoGAMES una licencia para mostrar y distribuir dicho contenido dentro de la plataforma.",
  },
  {
    title: "4. Suspensión o Cancelación",
    content:
      "Nos reservamos el derecho de suspender o eliminar cuentas que incumplan estos términos, sin previo aviso si fuera necesario.",
  },
  {
    title: "5. Modificaciones de los Términos",
    content:
      "Podemos modificar estos términos en cualquier momento. Notificaremos los cambios relevantes mediante un aviso en la plataforma o por correo electrónico.",
  },
];

export default Terms;
