import React from "react";
import "../styles/Privacy.css";
import { FaShieldAlt, FaInfoCircle } from "react-icons/fa";

const Privacy = () => {
  return (
    <section className="privacy-page">
      {/* Cabecera */}
      <div className="privacy-header">
        <h1 className="privacy-title">
          <FaShieldAlt /> Política de Privacidad
        </h1>
        <p className="privacy-subtitle">
          En MoLaMaZoGAMES valoramos tu privacidad. Esta política describe cómo recopilamos, usamos y protegemos tu información personal.
        </p>
      </div>

      {/* Contenido principal */}
      <div className="privacy-content">

        {/* Sección 1 */}
        <div className="privacy-section">
          <h2>1. Información que recopilamos</h2>
          <div className="privacy-bar"></div>
          <p>Recopilamos los siguientes tipos de información cuando usas nuestra plataforma:</p>
          <ul className="privacy-list">
            <li>Datos de registro como nombre, correo electrónico, nickname y contraseña.</li>
            <li>Información de uso (assets subidos, favoritos, descargas, comentarios).</li>
            <li>Datos técnicos (dirección IP, tipo de navegador, sistema operativo).</li>
          </ul>
        </div>

        {/* Sección 2 */}
        <div className="privacy-section">
          <h2>2. Cómo utilizamos tu información</h2>
          <div className="privacy-bar"></div>
          <p>La utilizamos para:</p>
          <ul className="privacy-list">
            <li>Proveer y mantener la funcionalidad del sitio.</li>
            <li>Mejorar la experiencia del usuario.</li>
            <li>Enviar notificaciones importantes relacionadas con tu cuenta.</li>
            <li>Prevenir actividades maliciosas o no autorizadas.</li>
          </ul>
        </div>

        {/* Sección 3 */}
        <div className="privacy-section">
          <h2>3. Compartición de datos</h2>
          <div className="privacy-bar"></div>
          <p>No compartimos tu información personal con terceros, salvo en los siguientes casos:</p>
          <ul className="privacy-list">
            <li>Cuando lo exige la ley.</li>
            <li>Con proveedores que nos ayudan a operar la plataforma (bajo contrato de confidencialidad).</li>
          </ul>
        </div>

        {/* Sección 4 */}
        <div className="privacy-section">
          <h2>4. Tus derechos</h2>
          <div className="privacy-bar"></div>
          <p>Tienes derecho a:</p>
          <ul className="privacy-list">
            <li>Acceder, corregir o eliminar tu información personal.</li>
            <li>Retirar tu consentimiento para el tratamiento de datos.</li>
            <li>Solicitar una copia de tus datos personales almacenados.</li>
          </ul>
        </div>

        {/* Sección 5 */}
        <div className="privacy-section">
          <h2>5. Seguridad de los datos</h2>
          <div className="privacy-bar"></div>
          <p>
            Aplicamos medidas de seguridad técnicas y organizativas para proteger tus datos personales contra pérdida, acceso no autorizado o divulgación.
          </p>
        </div>

        {/* Sección 6 */}
        <div className="privacy-section">
          <h2>6. Cambios en esta política</h2>
          <div className="privacy-bar"></div>
          <p>
            Podemos actualizar esta política ocasionalmente. Notificaremos cualquier cambio significativo en nuestra plataforma.
          </p>
        </div>

        {/* Contacto */}
        <div className="privacy-section">
          <h2>Contacto</h2>
          <div className="privacy-bar"></div>
          <p>
            Si tienes dudas o solicitudes relacionadas con tu privacidad, puedes escribirnos a: 
          </p>
          <p className="privacy-contact">
            <FaInfoCircle /> <a href="mailto:privacy@mola.com">privacy@mola.com</a>
          </p>
        </div>

        {/* Fecha de actualización */}
        <div className="privacy-updated">
          <p><em>Última actualización: Marzo 2025</em></p>
        </div>
      </div>
    </section>
  );
};

export default Privacy;
