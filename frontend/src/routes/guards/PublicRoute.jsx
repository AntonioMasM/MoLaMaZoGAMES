// src/routes/guards/PublicRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "@/features/auth";

export default function PublicRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading || isAuthenticated === null) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p>Verificando sesión...</p>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
