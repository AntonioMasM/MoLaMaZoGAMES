import { useEffect, useState } from "react";
import HeroSection from "../components/HeroSection/HeroSection";
import AssetSection from "../components/Asset/AssetSection";
import UserSection from "../components/User/UserSection";
import GrupoAssetSection from "../components/Grupo/GrupoAssetSection";
import CategoriaAssetSection from "../components/Category/CategoriaAssetSection";
import UserInfo from "../components/UserInfo/UserInfo";

import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../context/UserContext";
import { useUserInfoData } from "../hooks/useUserInfoData";
import { useCategoriasSeguidas } from "../hooks/useCategoriasSeguidas";

const Home = () => {
  const { user, loading } = useUser();
  const isAuthenticated = !!user;
  const [showContent, setShowContent] = useState(false);

  const { gruposTrabajo } = useUserInfoData(); // Grupos del usuario
  const { categorias, cargarCategoriasSeguidas } = useCategoriasSeguidas();
  useEffect(() => {
    if (user?._id) {
      cargarCategoriasSeguidas(user._id);
    }
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
            <UserSection />
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

            {/* 🔥 Sección de Assets por Grupo */}
            {gruposTrabajo?.length > 0 && (
              <section aria-label="Tus Grupos de Trabajo">
                <GrupoAssetSection grupos={gruposTrabajo} />
              </section>
            )}

            {/* 🔥 Sección de Assets por Categorías Seguidas */}
            {categorias?.length > 0 && (
              <section aria-label="Categorías que Sigues">
                <CategoriaAssetSection categoriasSeguidas={categorias} />
              </section>
            )}
            <AssetSection />
            <UserSection />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </main>
  );
};

export default Home;
