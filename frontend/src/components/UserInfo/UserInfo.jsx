import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import {
  getUsuarioPorEmail,
  getUsuariosSeguidos,
  getUsuariosPorIds,
} from "../../services/usuarios";
import { getAllAssets } from "../../services/assets";

import UserWelcome from "./UserWelcome";
import UserGroups from "./UserGroups";
import UserAssets from "./UserAssets";
import UserFollowing from "./UserFollowing";
import UserFavorites from "./UserFavorites";

import styles from "./UserInfo.module.css";

const UserInfo = () => {
  const { user: sessionUser } = useUser();
  const [userData, setUserData] = useState(null);
  const [userAssets, setUserAssets] = useState([]);
  const [siguiendoUsuarios, setSiguiendoUsuarios] = useState([]);

  const gruposTrabajo = [
    "Grupo E1 - Entorno del Mapa",
    "Grupo F3 - Ciudad 3",
    "Grupo E5 - Personajes",
  ];

  const categoriasFavoritas = [
    "Ciencia Ficción",
    "Animales",
    "Pixel Art",
    "Concept Art",
    "Vehículos",
    "Audios",
    "Entorno",
    "Mobiliario",
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!sessionUser?.email) return;

        const usuario = await getUsuarioPorEmail(sessionUser.email);
        setUserData(usuario);

        const allAssets = await getAllAssets();
        const filteredAssets = allAssets.filter(
          (asset) => asset.usuarioCreador === usuario._id
        );
        setUserAssets(filteredAssets);

        const siguiendoIds = await getUsuariosSeguidos(sessionUser.email);
        const usuarios = siguiendoIds.length > 0
          ? await getUsuariosPorIds(siguiendoIds)
          : [];
        setSiguiendoUsuarios(usuarios);
      } catch (err) {
        console.error("Error cargando datos del usuario:", err);
      }
    };

    fetchData();
  }, [sessionUser?.email]);

  if (!userData) return null;

  return (
    <section className={styles.userInfo} aria-label="Resumen del perfil de usuario">
      <div className={styles.columns}>
        {/* Izquierda: Bienvenida + Grupos */}
        <div className={styles.leftColumn}>
          <div className={styles.box}>
            <UserWelcome
              nickname={userData.nickname}
              ultimoInicioSesion={userData.ultimoInicioSesion}
            />
          </div>

          <div className={styles.box}>
            <UserGroups grupos={gruposTrabajo} />
          </div>
        </div>

        {/* Derecha: Assets + Usuarios Seguidos */}
        <div className={styles.rightColumn}>
          <div className={styles.box}>
            <UserAssets assets={userAssets} />
          </div>

          <div className={styles.box}>
            <UserFollowing usuarios={siguiendoUsuarios} />
          </div>
        </div>
      </div>

      {/* Parte inferior: Categorías favoritas */}
      <div className={styles.box}>
        <UserFavorites categorias={categoriasFavoritas} />
      </div>
    </section>
  );
};

export default UserInfo;
