// src/hooks/useUserInfoData.js
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import {
  getUsuarioPorEmail,
  getUsuariosSeguidos,
  getUsuariosPorIds,
} from "../services/usuarios";
import { getAllAssets, getAssetsByUser } from "@/services/assets";
import { getGruposPorUsuario } from "../services/grupoService";

export const useUserInfoData = () => {
  const { user: sessionUser } = useUser();

  const [userData, setUserData] = useState(null);
  const [userAssets, setUserAssets] = useState([]);
  const [siguiendoUsuarios, setSiguiendoUsuarios] = useState([]);
  const [gruposTrabajo, setGruposTrabajo] = useState([]);

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

        // OPTIMIZACIÓN: Este endpoint debería reemplazarse por getAssetsPorUsuario(usuario._id)
        const allAssets = await getAllAssets();
        const filteredAssets = allAssets.filter(
          (asset) => asset.usuarioCreador === usuario._id
        );
        setUserAssets(filteredAssets);

        const siguiendoIds = await getUsuariosSeguidos(sessionUser.email);
        const ids = siguiendoIds.map((u) => u._id || u);
        const usuarios = ids.length > 0 ? await getUsuariosPorIds(ids) : [];
        setSiguiendoUsuarios(usuarios);

        const grupos = await getGruposPorUsuario(usuario._id);
        setGruposTrabajo(grupos);
      } catch (error) {
        console.error("Error cargando datos del usuario:", error);
      }
    };

    fetchData();
  }, [sessionUser?.email]);

  return {
    userData,
    userAssets,
    siguiendoUsuarios,
    gruposTrabajo,
    categoriasFavoritas,
  };
};
