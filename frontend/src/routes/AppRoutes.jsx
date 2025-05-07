// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import { useUser } from "@/context";
import usePrefetchRoutes from "@/hooks/usePrefetchRoutes";

import { routeConfig } from "./routeConfig";
import Layout from "@/layouts/Layout";

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
        {routeConfig.map(({ path, element, layout }, index) => (
          <Route
            key={index}
            path={path}
            element={layout ? <Layout>{element}</Layout> : element}
          />
        ))}
      </Routes>
    </Suspense>
  );
}
