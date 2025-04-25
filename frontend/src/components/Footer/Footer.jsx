import styles from "./Footer.module.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>© 2025 MoLaMaZoGAMES - Todos los derechos reservados</p>
      <div className={styles.links}>
        <Link to="/terms" className={styles.link}>Términos y condiciones</Link>
        <Link to="/privacy-policy" className={styles.link}>Política de privacidad</Link>
        <Link to="/accesibility" className={styles.link}>Accesibilidad</Link>
      </div>
    </footer>
  );
};

export default Footer;
