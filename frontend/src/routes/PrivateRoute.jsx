import { Navigate } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth";

export default function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading || isAuthenticated === null) {
    return null; // ⏳ Esperamos
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
