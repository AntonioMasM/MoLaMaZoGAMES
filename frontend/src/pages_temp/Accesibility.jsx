import styles from "../styles/Accesibility.module.css";
import {
  FaUniversalAccess,
  FaEnvelope,
  FaExternalLinkAlt,
} from "react-icons/fa";

const Accesibility = () => {
  return (
    <main
      className={styles.page}
      aria-labelledby="accesibility-title"
      role="main"
      tabIndex="0"
    >
      <header className={styles.header}>
        <h1 id="accesibility-title" className={styles.title}>
          <FaUniversalAccess aria-hidden="true" /> Accesibilidad
        </h1>
        <p className={styles.subtitle}>
          En MoLaMaZoGAMES, creemos en un entorno digital accesible e inclusivo
          para todos. Nuestra misión es ofrecer igualdad de acceso a la
          información, funcionalidad y experiencia.
        </p>
      </header>

      <section className={styles.content} aria-label="Contenido de Accesibilidad">
        <Section
          title="Principios de Accesibilidad Web"
          items={[
            { text: "Perceptible: Información accesible a todos." },
            { text: "Operable: Interfaces navegables por teclado y tecnologías de asistencia." },
            { text: "Comprensible: Interfaz clara y coherente." },
            { text: "Robusto: Compatible con tecnologías actuales y futuras." }
          ]}
          paragraph="Nos guiamos por los principios de las WCAG (Web Content Accessibility Guidelines). Buscamos cumplir el estándar WCAG 2.1 AA, reconocido internacionalmente."
          link={{
            href: "https://www.w3.org/WAI/standards-guidelines/wcag/",
            text: "Más información sobre las WCAG"
          }}
        />

        <Section
          title="Medidas de Accesibilidad Aplicadas"
          items={[
            { text: "Navegación completa mediante teclado." },
            { text: "Contrastes adecuados para baja visión." },
            { text: "Texto alternativo en imágenes clave." },
            { text: "Estructura semántica clara para lectores de pantalla." },
            { text: "Compatibilidad con tecnologías de asistencia." },
            { text: "Modos de visualización accesibles (oscuro, alto contraste, animaciones reducidas)." }
          ]}
          paragraph="Puedes ajustar tu experiencia desde la configuración de accesibilidad."
          paragraphLink="/configuracion"
        />

        <SimpleSection
          title="Limitaciones Conocidas"
          content="Algunos contenidos multimedia o funciones avanzadas aún están en proceso de adaptación. Seguimos trabajando para mejorar."
        />

        <SimpleSection
          title="Compromiso con la Mejora Continua"
          content="Realizamos revisiones periódicas y agradecemos cualquier sugerencia para mejorar la accesibilidad."
        />

        <SimpleSection
          title="¿Tienes alguna dificultad de acceso?"
          content={
            <>
              Si encuentras algún problema de accesibilidad o tienes sugerencias:
              <p className={styles.contact}>
                <FaEnvelope aria-hidden="true" />
                <a
                  href="mailto:access@mola.com"
                  className={styles.contactLink}
                >
                  access@mola.com
                </a>
              </p>
            </>
          }
        />

        <footer className={styles.updated}>
          <p><em>Última actualización: Marzo 2025</em></p>
        </footer>
      </section>
    </main>
  );
};

const Section = ({ title, items, paragraph, link, paragraphLink }) => (
  <article
    className={styles.section}
    aria-labelledby={`${title.replace(/\s+/g, "-").toLowerCase()}`}
    role="region"
    tabIndex="0"
  >
    <h2
      id={`${title.replace(/\s+/g, "-").toLowerCase()}`}
      className={styles.sectionTitle}
    >
      {title}
    </h2>
    <div className={styles.bar} />
    {paragraph && <p className={styles.paragraph}>{paragraph}</p>}
    {items && (
      <ul className={styles.list}>
        {items.map((item, idx) => (
          <li key={idx}>{item.text}</li>
        ))}
      </ul>
    )}
    {link && (
      <p>
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.externalLink}
        >
          {link.text}{" "}
          <FaExternalLinkAlt
            className={styles.inlineIcon}
            aria-hidden="true"
          />
        </a>
      </p>
    )}
    {paragraphLink && (
      <p>
        <a href={paragraphLink} className={styles.internalLink}>
          Configuración de Accesibilidad
        </a>
      </p>
    )}
  </article>
);

const SimpleSection = ({ title, content }) => (
  <article
    className={styles.section}
    aria-labelledby={`${title.replace(/\s+/g, "-").toLowerCase()}`}
    role="region"
    tabIndex="0"
  >
    <h2
      id={`${title.replace(/\s+/g, "-").toLowerCase()}`}
      className={styles.sectionTitle}
    >
      {title}
    </h2>
    <div className={styles.bar} />
    <p className={styles.paragraph}>{content}</p>
  </article>
);

export default Accesibility;
