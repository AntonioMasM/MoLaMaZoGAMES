import React, { useState, useEffect } from "react";
import HeroSection from "../components/HeroSection";
import AssetSection from "../components/AssetSection";
import UserSection from "../components/UserSection";
import UserInfo from "../components/UserInfo"; // Esto debería ser el componente que muestra la info cuando el usuario está logueado

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Verificar si el usuario está logueado (si hay un token en localStorage)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true); // Usuario está autenticado
    } else {
      setIsAuthenticated(false); // Usuario no está autenticado
    }
  }, []);

  return (
    <div>
      {/* Si no está autenticado, mostrar HeroSection */}
      {!isAuthenticated ? (
        <><HeroSection /><AssetSection /><UserSection /></>
      ) : (
        // Si está autenticado, mostrar LoggedInHeroSection
        <UserInfo />
      )}

      
    </div>
  );
};

export default Home;
