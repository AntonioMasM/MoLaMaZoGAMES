import { createContext, useState, useContext } from "react";
import Alert from "../components/ui/Alert";

const AlertContext = createContext();

export const useAlert = () => useContext(AlertContext);

export const AlertProvider = ({ children }) => {
  const [alertData, setAlertData] = useState(null);

  const showAlert = (type, message) => {
    setAlertData({ type, message });
  };

  const hideAlert = () => {
    setAlertData(null);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alertData && (
        <div style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", zIndex: 9999 }}>
          <Alert type={alertData.type} message={alertData.message} onClose={hideAlert} />
        </div>
      )}
    </AlertContext.Provider>
  );
};
