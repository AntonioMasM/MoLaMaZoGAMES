import styles from "../styles/Privacy.module.css";
import { FaShieldAlt, FaInfoCircle } from "react-icons/fa";

const Privacy = () => {
  return (
    <main className={styles.page} aria-labelledby="privacy-title" role="main" tabIndex="0">
      <header className={styles.header}>
        <h1 id="privacy-title" className={styles.title}>
          <FaShieldAlt aria-hidden="true" /> Política de Privacidad
        </h1>
        <p className={styles.subtitle}>
          En MoLaMaZoGAMES valoramos tu privacidad. Esta política describe cómo recopilamos, usamos y protegemos tu información personal.
        </p>
      </header>

      <section className={styles.content} aria-label="Contenido de la política de privacidad">
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

        <article className={styles.section} aria-labelledby="privacy-contact" role="region" tabIndex="0">
          <h2 id="privacy-contact" className={styles.sectionTitle}>Contacto</h2>
          <div className={styles.bar} />
          <p className={styles.paragraph}>
            Si tienes dudas o solicitudes relacionadas con tu privacidad, puedes escribirnos a:
          </p>
          <p className={styles.contact}>
            <FaInfoCircle aria-hidden="true" />
            <a href="mailto:privacy@mola.com" className={styles.contactLink}>
              privacy@mola.com
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
    title: "1. Información que recopilamos",
    content: "Recopilamos los siguientes tipos de información cuando usas nuestra plataforma:",
    list: [
      "Datos de registro como nombre, correo electrónico, nickname y contraseña.",
      "Información de uso (assets subidos, favoritos, descargas, comentarios).",
      "Datos técnicos (dirección IP, tipo de navegador, sistema operativo).",
    ],
  },
  {
    title: "2. Cómo utilizamos tu información",
    content: "La utilizamos para:",
    list: [
      "Proveer y mantener la funcionalidad del sitio.",
      "Mejorar la experiencia del usuario.",
      "Enviar notificaciones importantes relacionadas con tu cuenta.",
      "Prevenir actividades maliciosas o no autorizadas.",
    ],
  },
  {
    title: "3. Compartición de datos",
    content: "No compartimos tu información personal con terceros, salvo en los siguientes casos:",
    list: [
      "Cuando lo exige la ley.",
      "Con proveedores que nos ayudan a operar la plataforma (bajo contrato de confidencialidad).",
    ],
  },
  {
    title: "4. Tus derechos",
    content: "Tienes derecho a:",
    list: [
      "Acceder, corregir o eliminar tu información personal.",
      "Retirar tu consentimiento para el tratamiento de datos.",
      "Solicitar una copia de tus datos personales almacenados.",
    ],
  },
  {
    title: "5. Seguridad de los datos",
    content:
      "Aplicamos medidas de seguridad técnicas y organizativas para proteger tus datos personales contra pérdida, acceso no autorizado o divulgación.",
  },
  {
    title: "6. Cambios en esta política",
    content:
      "Podemos actualizar esta política ocasionalmente. Notificaremos cualquier cambio significativo en nuestra plataforma.",
  },
];

export default Privacy;
