// components/layouts/AppProviders.jsx
import { AuthProvider } from "../features/auth/AuthProvider";
import UserProvider from "../context/UserContext";
import { AlertQueueProvider } from "../context/AlertQueueContext";
import { ModalProvider } from "../context/ModalContext";
import ModalRenderer from "../components/Modals/ModalRenderer";

export default function AppProviders({ children }) {
  return (
    <UserProvider>
      <AuthProvider>
        <AlertQueueProvider>
          <ModalProvider>
            {children}
            <ModalRenderer /> {/* Renderiza los modales a nivel global */}
          </ModalProvider>
        </AlertQueueProvider>
      </AuthProvider>
    </UserProvider>
  );
}