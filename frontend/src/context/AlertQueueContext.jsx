import { createContext, useState, useContext } from "react";
import Alert from "@/components/ui/Alert"; // Tu alerta visual
import { v4 as uuidv4 } from "uuid"; // ID únicos para cada alerta
import styles from "@/components/ui/AlertQueue.module.css";

const AlertQueueContext = createContext();

export const useAlertQueue = () => useContext(AlertQueueContext);

export const AlertQueueProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const showAlert = (message, type = "info", duration = 4000) => {
    const id = uuidv4();
    const newAlert = { id, message, type };

    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);

    setTimeout(() => {
      removeAlert(id);
    }, duration);
  };

  const removeAlert = (id) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

  return (
    <AlertQueueContext.Provider value={{ showAlert }}>
      {children}
      <div className={styles.alertQueueContainer}>
        {alerts.map(({ id, message, type }) => (
            <Alert key={id} message={message} type={type} onClose={() => removeAlert(id)} />
        ))}
        </div>

    </AlertQueueContext.Provider>
  );
};
