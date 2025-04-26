// routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useUser } from "@/context/UserContext";
import usePrefetchRoutes from "@/hooks/usePrefetchRoutes";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Layout from "@/layouts/Layout";

// 🖥️ Lazy Load de Páginas Públicas
const Home = lazy(() => import("@/pages_temp/Home"));
const Login = lazy(() => import("@/pages_temp/Login"));
const Register = lazy(() => import("@/pages_temp/Register"));
const Accesibility = lazy(() => import("@/pages_temp/Accesibility"));
const Contact = lazy(() => import("@/pages_temp/Contact"));
const Privacy = lazy(() => import("@/pages_temp/Privacy"));
const Terms = lazy(() => import("@/pages_temp/Terms"));
const Help = lazy(() => import("@/pages_temp/Help"));

// 🔒 Lazy Load de Páginas Privadas
const UserProfile = lazy(() => import("@/pages_temp/UserProfile"));
const UserSettings = lazy(() => import("@/pages_temp/UserSettings"));
const NewAsset = lazy(() => import("@/pages_temp/UploadAsset"));

export default function AppRoutes() {
  const { loading } = useUser();
  usePrefetchRoutes(); // Prefetch inteligente 🚀

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p>Cargando sesión...</p>
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="loading-container">
        <div className="spinner" />
        <p>Cargando contenido...</p>
      </div>
    }>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Layout><PublicRoute><Login /></PublicRoute></Layout>} />
        <Route path="/register" element={<Layout><PublicRoute><Register /></PublicRoute></Layout>} />
        <Route path="/accesibility" element={<Layout><Accesibility /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/privacy-policy" element={<Layout><Privacy /></Layout>} />
        <Route path="/terms" element={<Layout><Terms /></Layout>} />
        <Route path="/help" element={<Layout><Help /></Layout>} />

        <Route path="/profile" element={<Layout><PrivateRoute><UserProfile /></PrivateRoute></Layout>} />
        <Route path="/settings" element={<Layout><PrivateRoute><UserSettings /></PrivateRoute></Layout>} />
        <Route path="/upload-asset" element={<Layout><PrivateRoute><NewAsset /></PrivateRoute></Layout>} />
      </Routes>
    </Suspense>
  );
}
