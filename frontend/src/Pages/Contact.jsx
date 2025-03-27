import React from "react";
import "../styles/Contact.css";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";

const Contact = ({ onClose }) => {
  // URLs predefinidas de las redes sociales de MoLaMaZoGAMES
  const companySocials = {
    facebook: "https://www.facebook.com/molamazogames", // Facebook de la empresa
    twitter: "https://twitter.com/molamazogames",     // Twitter de la empresa
    instagram: "https://www.instagram.com/molamazogames", // Instagram de la empresa
    email: "contact@mola.com" // Correo de la empresa
  };

  return (
    <div className="contenedor-principal">
      <div className="contact-container">
        {/* Sección de imagen / promo */}
        <div className="contact-image">
          <h1 className="contact-title">MoLaMaZoGAMES</h1>
          <p className="contact-subtitle">¡CONTACTA CON NOSOTROS!</p>
          <p className="contact-description">
            Si tienes alguna duda o sugerencia, no dudes en ponerte en contacto con nosotros a través de nuestras redes sociales o enviándonos un email.
          </p>
        </div>

        {/* Sección de contacto */}
        <div className="contact-form">
          <h2 className="form-title">Ponte en contacto con <span className="bold">MoLaMaZoGAMES</span></h2>

          {/* Redes sociales de la empresa */}
          <div className="social-media">
            {companySocials.facebook && (
              <a href={companySocials.facebook} target="_blank" rel="noopener noreferrer">
                <FaFacebook />
              </a>
            )}
            {companySocials.twitter && (
              <a href={companySocials.twitter} target="_blank" rel="noopener noreferrer">
                <FaTwitter />
              </a>
            )}
            {companySocials.instagram && (
              <a href={companySocials.instagram} target="_blank" rel="noopener noreferrer">
                <FaInstagram />
              </a>
            )}
          </div>

          {/* Correo electrónico de la empresa */}
          {companySocials.email && (
            <p className="email">
              <FaEnvelope /> Correo: <a href={`mailto:${companySocials.email}`}>{companySocials.email}</a>
            </p>
          )}

        </div>
      </div>
    </div>
  );
};

export default Contact;
