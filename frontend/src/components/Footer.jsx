import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-text">© 2025 MoLaMaZoGAMES - Todos los derechos reservados</p>
      <div className="footer-links">
        <a href="/terms" className="footer-link">Términos y condiciones</a>
        <a href="/privacy-policy" className="footer-link">Política de privacidad</a>
        <a href="/accesibility" className="footer-link">Accesibilidad</a>
      </div>
    </footer>
  );
};

export default Footer;
