// src/routes/guards/PrivateRoute.jsx
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth";
import LoginRequiredModal from "@/components/Modals/LoginRequiredModal";

export default function PrivateRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const [modalVisible, setModalVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (!loading && isAuthenticated === false) {
      setModalVisible(true);
    }
  }, [loading, isAuthenticated]);

  if (loading || isAuthenticated === null) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p>Verificando sesión...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <LoginRequiredModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
        />
      </>
    );
  }

  return children;
}
