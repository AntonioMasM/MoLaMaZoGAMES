import React, { useEffect, useState } from "react";
import { useMensajes } from "../hooks/useMensajes";
import { useUser as useUserContext } from "../context/UserContext";
import { useUser } from "../hooks/useUser";
import MessagesList from "../components/UserProfile/MessagesList";
import LoadingScreen from "../components/ui/LoadingScreen";
import Sidebar from "../components/UserProfile/Sidebar";
import styles from "../styles/MessagesPage.module.css";
import profileStyles from "../styles/UserProfile.module.css"; // 👈 para estilos del perfil

const MessagesPage = () => {
  const { user: currentUser } = useUserContext();
  const mensajesHook = useMensajes();
  const usuariosHook = useUser();

  const [mensajes, setMensajes] = useState([]);
  const [error, setError] = useState(null);
  const [usuarioActualizado, setUsuarioActualizado] = useState(null);
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    if (!currentUser?._id) {
      setLocalLoading(false);
      return;
    }

    const cargarDatos = async () => {
      try {
        const [usuario, mensajesRecibidos] = await Promise.all([
          usuariosHook.getUsuarioPorId(currentUser._id),
          mensajesHook.obtenerMensajesRecibidos(currentUser._id),
        ]);

        setUsuarioActualizado(usuario);
        setMensajes(mensajesRecibidos);
      } catch (err) {
        console.error("Error cargando mensajes:", err);
        setError("Error al cargar los mensajes.");
      } finally {
        setLocalLoading(false);
      }
    };

    cargarDatos();
  }, [currentUser?._id, mensajesHook, usuariosHook]);

  if (localLoading) return <LoadingScreen />;

  return (
    <div className={profileStyles.userProfilePage}>
      {/* 🧭 Sidebar (Menú de navegación lateral) */}
      <aside
        className={profileStyles.sidebarWrapper}
        aria-label="Menú lateral de navegación del perfil"
      >
        <Sidebar />
      </aside>

      {/* 🧩 Contenido principal de la página */}
      <main className={profileStyles.profileContent} role="main" aria-live="polite">
        <header className={profileStyles.pageHeader}>
          <h1 className={profileStyles.pageTitle}>
            Mensajes de {usuarioActualizado?.nickname || "Usuario"}
          </h1>
        </header>

        <section className={styles.messagesSection}>
          {error ? (
            <p className={styles.error}>{error}</p>
          ) : mensajes.length === 0 ? (
            <p className={styles.emptyState}>No tienes mensajes aún.</p>
          ) : (
            <MessagesList mensajes={mensajes} />
          )}
        </section>
      </main>
    </div>
  );
};

export default MessagesPage;
