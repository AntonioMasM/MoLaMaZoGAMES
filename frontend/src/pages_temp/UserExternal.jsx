import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { getUsuarioPorEmail } from "@/services/usuarios";
import { obtenerAssetsPorUsuario } from "@/services/assetService";
import LoadingScreen from "@/components/ui/LoadingScreen";
import UserProfileHeader from "@/components/user/UserProfileHeader";
import UserStats from "@/components/user/UserStats";
import UserGallery from "@/components/user/UserGallery";
import styles from "@/styles/UserExternal.module.css";

const UserExternal = () => {
  const { email } = useParams();
  const { user: currentUser } = useUser();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (currentUser && email && currentUser.email === email) {
      navigate("/profile", { replace: true });
      return; // 🔥 Importante: si es tu propio email, redirige y no sigue
    }

    const fetchUserData = async () => {
      try {
        const userData = await getUsuarioPorEmail(email);
        setUser(userData);

        if (userData?._id) {
          const assetsData = await obtenerAssetsPorUsuario(userData._id);
          setAssets(assetsData);
        }
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el perfil del usuario.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [email, currentUser, navigate]);

  if (loading) return <LoadingScreen />;

  if (error) {
    return (
      <main className={styles.container}>
        <h1 className={styles.errorTitle}>Error</h1>
        <p className={styles.errorMessage}>{error}</p>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className={styles.container}>
      <UserProfileHeader 
        user={user}
        currentUser={currentUser} // 🔥 Ahora sí pasamos el currentUser correctamente
        setUser={setUser}
      />

      <section className={styles.content}>
        <aside className={styles.sidebar}>
          <UserStats user={user} assets={assets} />

          {user.bio && (
            <div className={styles.bioBox}>
              <h2 className={styles.sectionTitle}>Sobre mí</h2>
              <p className={styles.bio}>{user.bio}</p>
            </div>
          )}
        </aside>

        <section className={styles.gallerySection}>
          <UserGallery assets={assets} />
        </section>
      </section>
    </main>
  );
};

export default UserExternal;
