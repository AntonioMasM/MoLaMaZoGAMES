// components/layouts/AppProviders.jsx
import { AuthProvider } from "../features/auth/AuthProvider";
import { UserProvider } from "../context/UserContext";
import { AlertQueueProvider } from "../context/AlertQueueContext";

export default function AppProviders({ children }) {
    return (
      <UserProvider>
        <AuthProvider>
          <AlertQueueProvider>
            {children}
          </AlertQueueProvider>
        </AuthProvider>
      </UserProvider>
    );
  }
