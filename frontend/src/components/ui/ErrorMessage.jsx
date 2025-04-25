import { FaExclamationCircle } from "react-icons/fa";
import styles from "../../styles/Login.module.css";

const ErrorMessage = ({ id, children }) => (
  <p id={id} className={styles.errorMessage} role="alert">
    <FaExclamationCircle style={{ marginRight: 6 }} />
    {children}
  </p>
);

export default ErrorMessage;
