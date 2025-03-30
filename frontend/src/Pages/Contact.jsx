import React from "react";
import "../styles/Contact.css";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaEnvelope
} from "react-icons/fa";

// Datos por defecto
const defaultSocials = {
  facebook: "https://www.facebook.com/molamazogames",
  twitter: "https://twitter.com/molamazogames",
  instagram: "https://www.instagram.com/molamazogames",
  email: "contact@mola.com"
};

const Contact = ({ socials = defaultSocials }) => {
  return (
    <section className="contact-page">
      {/* Encabezado */}
      <div className="contact-header">
        <h1 className="contact-title">Contacto</h1>
        <p className="contact-subtitle">
          ¿Dudas, propuestas o sugerencias? ¡Estamos aquí para ayudarte! Conecta con MoLaMaZoGAMES a través de nuestras redes o por email.
        </p>
      </div>

      {/* Contenido principal */}
      <div className="contact-content">

        {/* Columna izquierda: redes sociales y correo */}
        <div className="contact-info">
          <h2>Redes Sociales</h2>
          <div className="contact-bar"></div>
          <p>Puedes seguirnos en nuestras plataformas oficiales:</p>

          <div className="social-list">
            {socials.facebook && (
              <a href={socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <FaFacebook /> Facebook
              </a>
            )}
            {socials.twitter && (
              <a href={socials.twitter} target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter /> Twitter
              </a>
            )}
            {socials.instagram && (
              <a href={socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram /> Instagram
              </a>
            )}
          </div>

          {socials.email && (
            <div className="email-section">
              <p>
                <FaEnvelope /> Correo:{" "}
                <a href={`mailto:${socials.email}`}>{socials.email}</a>
              </p>
            </div>
          )}
        </div>

        {/* Columna derecha: contenido adicional */}
        <div className="contact-extra">
          <h2>¿En qué te podemos ayudar?</h2>
          <p>
            Si necesitas asistencia personalizada o quieres colaborar con nosotros,
            no dudes en enviarnos un mensaje. También puedes revisar nuestras preguntas frecuentes en la sección de ayuda.
          </p>
          <p>
            Nuestro equipo está disponible de lunes a viernes, de 9:00 a 18:00 (GMT+1).
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
