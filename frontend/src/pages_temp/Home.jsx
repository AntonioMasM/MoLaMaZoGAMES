import { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import AssetSection from "../components/Asset/AssetSection";
import UserSection from "../components/User/UserSection";
import UserInfo from "../components/UserInfo/UserInfo";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../context/UserContext";

const Home = () => {
  const { user, loading } = useUser();
  const isAuthenticated = !!user;
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowContent(true);
    }, 100);
    return () => clearTimeout(timeout);
  }, [isAuthenticated]);

  if (loading) return null;

  return (
    <main aria-labelledby="main-title" role="main">
      <AnimatePresence mode="wait">
        {!isAuthenticated && showContent ? (
          <motion.div
            key="guest"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <h1 id="main-title" className="sr-only">
              Página de Inicio para Visitantes
            </h1>
            <HeroSection />
            <AssetSection />
            <UserSection /> {/* 👈 Añadido aquí, debajo de Assets */}
          </motion.div>
        ) : isAuthenticated && showContent ? (
          <motion.div
            key="user"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <h1 id="main-title" className="sr-only">
              Página de Usuario Autenticado
            </h1>
            <UserInfo />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
};

export default Home;
