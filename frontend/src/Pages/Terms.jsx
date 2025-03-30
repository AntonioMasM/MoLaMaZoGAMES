import React from "react";
import "../styles/Terms.css";
import { FaGavel, FaInfoCircle } from "react-icons/fa";

const Terms = () => {
  return (
    <section className="terms-page">
      {/* Cabecera */}
      <div className="terms-header">
        <h1 className="terms-title">
          <FaGavel /> Términos y Condiciones
        </h1>
        <p className="terms-subtitle">
          Al utilizar MoLaMaZoGAMES, aceptas cumplir con los siguientes términos de uso. Te recomendamos leer esta sección detenidamente.
        </p>
      </div>

      {/* Contenido principal */}
      <div className="terms-content">

        {/* Sección 1 */}
        <div className="terms-section">
          <h2>1. Aceptación de los Términos</h2>
          <div className="terms-bar"></div>
          <p>
            Al registrarte o acceder a nuestra plataforma, aceptas los presentes términos y condiciones, así como nuestra Política de Privacidad.
          </p>
        </div>

        {/* Sección 2 */}
        <div className="terms-section">
          <h2>2. Uso Permitido</h2>
          <div className="terms-bar"></div>
          <p>
            MoLaMaZoGAMES es una plataforma para compartir y gestionar assets digitales. Como usuario, te comprometes a:
          </p>
          <ul className="terms-list">
            <li>Usar el sitio de forma legal y ética.</li>
            <li>No infringir los derechos de autor u otros derechos de propiedad intelectual.</li>
            <li>No distribuir contenido malicioso, ofensivo o ilegal.</li>
            <li>Respetar a otros usuarios y sus contribuciones.</li>
          </ul>
        </div>

        {/* Sección 3 */}
        <div className="terms-section">
          <h2>3. Derechos sobre el Contenido</h2>
          <div className="terms-bar"></div>
          <p>
            Los assets subidos por los usuarios son propiedad de sus respectivos autores. Al subir contenido, declaras tener los derechos necesarios y otorgas a MoLaMaZoGAMES una licencia para mostrar y distribuir dicho contenido dentro de la plataforma.
          </p>
        </div>

        {/* Sección 4 */}
        <div className="terms-section">
          <h2>4. Suspensión o Cancelación</h2>
          <div className="terms-bar"></div>
          <p>
            Nos reservamos el derecho de suspender o eliminar cuentas que incumplan estos términos, sin previo aviso si fuera necesario.
          </p>
        </div>

        {/* Sección 5 */}
        <div className="terms-section">
          <h2>5. Modificaciones de los Términos</h2>
          <div className="terms-bar"></div>
          <p>
            Podemos modificar estos términos en cualquier momento. Notificaremos los cambios relevantes mediante un aviso en la plataforma o por correo electrónico.
          </p>
        </div>

        {/* Sección 6 */}
        <div className="terms-section">
          <h2>6. Contacto</h2>
          <div className="terms-bar"></div>
          <p>
            Si tienes dudas sobre estos términos, puedes escribirnos a:
          </p>
          <p className="terms-contact">
            <FaInfoCircle /> <a href="mailto:legal@mola.com">legal@mola.com</a>
          </p>
        </div>

        {/* Fecha de actualización */}
        <div className="terms-updated">
          <p><em>Última actualización: Marzo 2025</em></p>
        </div>
      </div>
    </section>
  );
};

export default Terms;
