import React from "react";
import "../styles/Accesibility.css";
import { FaUniversalAccess, FaInfoCircle, FaEnvelope, FaExternalLinkAlt } from "react-icons/fa";

const Accessibility = () => {
  return (
    <section className="accessibility-page">
      {/* Encabezado */}
      <div className="accessibility-header">
        <h1 className="accessibility-title">
          <FaUniversalAccess /> Accesibilidad
        </h1>
        <p className="accessibility-subtitle">
          En MoLaMaZoGAMES, creemos en un entorno digital accesible e inclusivo para todos. Nuestra misión es ofrecer igualdad de acceso a la información, funcionalidad y experiencia.
        </p>
      </div>

      {/* Contenido principal */}
      <div className="accessibility-content">

        {/* Sección 1: Principios */}
        <div className="accessibility-section">
          <h2>Principios de Accesibilidad Web</h2>
          <div className="accessibility-bar"></div>
          <p>
            Nos guiamos por los principios de las WCAG (Web Content Accessibility Guidelines), que incluyen:
          </p>
          <ul className="accessibility-list">
            <li><strong>Perceptible:</strong> La información debe ser presentada de forma que todos los usuarios puedan percibirla.</li>
            <li><strong>Operable:</strong> Las interfaces deben ser navegables mediante teclado, ratón y tecnologías de asistencia.</li>
            <li><strong>Comprensible:</strong> La información y la interfaz deben ser fáciles de entender.</li>
            <li><strong>Robusto:</strong> El contenido debe funcionar con tecnologías actuales y futuras.</li>
          </ul>
          <p>
            Nuestro objetivo es cumplir con el nivel de conformidad <strong>WCAG 2.1 AA</strong>, que representa un estándar de referencia en accesibilidad web.
          </p>
          <p>
            <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noopener noreferrer">
              Más información sobre las WCAG <FaExternalLinkAlt style={{ fontSize: '0.8em' }} />
            </a>
          </p>
        </div>

        {/* Sección 2: Qué implementamos */}
        <div className="accessibility-section">
          <h2>Medidas de Accesibilidad Aplicadas</h2>
          <div className="accessibility-bar"></div>
          <ul className="accessibility-list">
            <li>Soporte completo para navegación mediante teclado.</li>
            <li>Colores con contraste adecuado para personas con baja visión.</li>
            <li>Texto alternativo en imágenes clave.</li>
            <li>Estructura semántica clara para lectores de pantalla.</li>
            <li>Compatibilidad con ampliadores de pantalla y tecnologías de asistencia.</li>
            <li>Modos de visualización alternativos (oscuro, alto contraste, animaciones reducidas).</li>
          </ul>
          <p>
            Puedes ajustar tu experiencia desde <a href="/configuracion">la configuración de accesibilidad</a>.
          </p>
        </div>

        {/* Sección 3: Limitaciones conocidas */}
        <div className="accessibility-section">
          <h2>Limitaciones Conocidas</h2>
          <div className="accessibility-bar"></div>
          <p>
            A pesar de nuestros esfuerzos, algunos contenidos multimedia o funciones avanzadas pueden no ser completamente accesibles todavía. Estamos trabajando activamente para resolver estas limitaciones.
          </p>
        </div>

        {/* Sección 4: Compromiso */}
        <div className="accessibility-section">
          <h2>Compromiso con la Mejora Continua</h2>
          <div className="accessibility-bar"></div>
          <p>
            Estamos comprometidos con mantener y mejorar la accesibilidad de MoLaMaZoGAMES. Realizamos revisiones periódicas y agradecemos cualquier sugerencia para facilitar la experiencia de todos los usuarios.
          </p>
        </div>

        {/* Sección 5: Contacto */}
        <div className="accessibility-section">
          <h2>¿Tienes alguna dificultad de acceso?</h2>
          <div className="accessibility-bar"></div>
          <p>
            Si encuentras algún problema de accesibilidad o tienes sugerencias de mejora, por favor contáctanos:
          </p>
          <p className="accessibility-contact">
            <FaEnvelope /> <a href="mailto:access@mola.com">access@mola.com</a>
          </p>
        </div>

        {/* Sección 6: Fecha de actualización */}
        <div className="accessibility-updated">
          <p><em>Última actualización: Marzo 2025</em></p>
        </div>
      </div>
    </section>
  );
};

export default Accessibility;
