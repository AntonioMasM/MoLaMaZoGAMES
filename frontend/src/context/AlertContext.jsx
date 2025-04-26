import { createContext, useState } from "react";
import Alert from "@/components/ui/Alert";

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [alertData, setAlertData] = useState(null);

  const showAlert = (message, type = "info") => {
    setAlertData({ message, type });
  };

  const hideAlert = () => {
    setAlertData(null);
  };

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}

      {alertData && (
        <div className="alert-container">
          <Alert
            message={alertData.message}
            type={alertData.type}
            onClose={hideAlert}
          />
        </div>
      )}
    </AlertContext.Provider>
  );
};
