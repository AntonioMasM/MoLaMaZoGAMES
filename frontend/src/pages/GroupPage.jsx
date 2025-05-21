// ✅ GroupPage.jsx actualizado con mejoras de UX, accesibilidad y control de usuario autenticado

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerGrupoPorId } from "../services/grupoService";
import { useMensajes } from "../hooks/useMensajes";
import { useModal } from "../context/ModalContext";
import { useGrupos } from "../hooks/useGrupos";

import InviteModal from "../components/Modals/InviteModal";
import AssetCard from "../components/Asset/AssetCard";
import UserCard from "../components/User/UserCard";

import { FaUsers, FaBoxOpen, FaUserPlus, FaTrash } from "react-icons/fa";

import styles from "../styles/GroupPage.module.css";

const BASE_URL = import.meta.env.VITE_API_URL;

const getValidImage = (asset) => {
  if (!asset?.imagenPrincipal?.url) return null;
  const formatosImagen = ["jpg", "jpeg", "png", "webp", "gif", "svg"];
  const url = asset.imagenPrincipal.url;
  const ext = url.split(".").pop().toLowerCase();
  if (formatosImagen.includes(ext)) return url;
  const galeria = asset.galeriaMultimedia?.find((item) => item.tipo === "image");
  return galeria?.url || null;
};

const GroupPage = () => {
  const { id } = useParams();
  const [grupo, setGrupo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [enviandoInvitacion, setEnviandoInvitacion] = useState(false);
  const { enviarMensaje } = useMensajes();
  const { showModal } = useModal();
  const { eliminarGrupoPorId } = useGrupos();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchGrupo = async () => {
      try {
        const data = await obtenerGrupoPorId(id);
        setGrupo(data);
      } catch (err) {
        console.error("Error al cargar grupo:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGrupo();
  }, [id]);

  const handleInvitarUsuario = async (email) => {
    try {
      setEnviandoInvitacion(true);
      const res = await fetch(`${BASE_URL}/usuarios/${email}`);
      if (!res.ok) return showModal("error", { mensaje: "No se encontró el usuario." });
      const usuario = await res.json();
      if (usuario._id === grupo.creador._id)
        return showModal("error", { mensaje: "No puedes invitarte a ti mismo." });
      const yaMiembro = grupo.usuarios.some((u) => u._id === usuario._id);
      if (yaMiembro)
        return showModal("error", { mensaje: "Este usuario ya es miembro del grupo." });

      const contenido = `Te han invitado a colaborar en el grupo \"${grupo.titulo}\".\nHaz clic aquí: ${BASE_URL}/groups/${grupo._id}`;
      await enviarMensaje({
        remitente: grupo.creador._id,
        destinatario: usuario._id,
        contenido,
        tipoMensaje: "grupo",
      });
      showModal("confirm", { email, grupo });
    } catch (err) {
      console.error("Error al enviar invitación:", err);
      showModal("error", { mensaje: "Hubo un problema al enviar la invitación." });
    } finally {
      setEnviandoInvitacion(false);
    }
  };

  const handleEliminarGrupo = async () => {
    try {
      const confirmado = confirm("¿Estás seguro de eliminar este grupo?");
      if (!confirmado) return;
      await eliminarGrupoPorId(grupo._id);
      navigate("/");
    } catch (err) {
      console.error("Error al eliminar grupo:", err);
      showModal("error", { mensaje: "Hubo un error al eliminar el grupo." });
    }
  };

  if (loading) return <div className={styles.loading}><p>Cargando grupo...</p></div>;
  if (!grupo) return <div className={styles.error}><p>No se encontró el grupo solicitado.</p></div>;

  const esCreador = user?._id === grupo.creador._id;

  return (
    <main className={styles.container} role="main">
      <GrupoHeader
        titulo={grupo.titulo}
        onInvitar={() => setModalVisible(true)}
        enviando={enviandoInvitacion}
        onEliminar={esCreador ? handleEliminarGrupo : null}
      />
      <section className={styles.gridTwoColumns} aria-label="Información del grupo">
        <GrupoDescripcion descripcion={grupo.descripcion} />
        <GrupoMiembros usuarios={grupo.usuarios} creadorId={grupo.creador._id} />
      </section>
      <GrupoAssets assets={grupo.assets} />
      <InviteModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onInvite={handleInvitarUsuario}
        aria-describedby="modal-invitar"
      />
    </main>
  );
};

const GrupoHeader = ({ titulo, onInvitar, enviando, onEliminar }) => (
  <header className={styles.groupHeader} aria-labelledby="titulo-grupo">
    <h1 id="titulo-grupo" className={styles.groupTitle}>{titulo}</h1>
    <div className={styles.actionsRow}>
      <button
        onClick={onInvitar}
        className={styles.inviteButton}
        aria-label="Invitar a un usuario"
        disabled={enviando}
      >
        <FaUserPlus style={{ marginRight: "8px" }} />
        {enviando ? "Enviando..." : "Invitar Usuarios"}
      </button>
      {onEliminar && (
        <button
          onClick={onEliminar}
          className={styles.deleteButton}
          aria-label="Eliminar grupo"
        >
          <FaTrash style={{ marginRight: "8px" }} /> Eliminar Grupo
        </button>
      )}
    </div>
  </header>
);

const GrupoDescripcion = ({ descripcion }) => (
  descripcion ? (
    <article className={styles.descriptionBox} aria-label="Descripción del grupo">
      <p className={styles.descriptionText}>{descripcion}</p>
    </article>
  ) : null
);

const GrupoMiembros = ({ usuarios, creadorId }) => (
  <section className={styles.membersSection} aria-labelledby="usuarios-heading">
    <h2 id="usuarios-heading" className={styles.sectionTitle}>
      <FaUsers style={{ marginRight: "8px" }} /> Miembros ({usuarios.length})
    </h2>
    <p className={styles.sectionSubtext}>Estos son los miembros actuales del grupo.</p>
    {usuarios.length ? (
      <ul className={styles.membersList} role="list">
        {usuarios.map((u) => (
          <li key={u._id} role="listitem">
            <UserCard
              id={u._id}
              nickname={u.nickname}
              email={u.email}
              fotoPerfil={u.fotoPerfil || { secure_url: "/assets/main.webp" }}
              badge={u._id === creadorId ? "Creador" : null}
            />
          </li>
        ))}
      </ul>
    ) : (
      <p className={styles.emptyText}>Este grupo no tiene miembros aún.</p>
    )}
  </section>
);

const GrupoAssets = ({ assets }) => (
  <section className={styles.assetsSection} aria-labelledby="assets-heading">
    <h2 id="assets-heading" className={styles.sectionTitle}>
      <FaBoxOpen style={{ marginRight: "8px" }} /> Assets Relacionados ({assets.length})
    </h2>
    <p className={styles.sectionSubtext}>Archivos digitales vinculados a este grupo de trabajo.</p>
    {assets.length ? (
      <div className={styles.assetsList}>
        {assets.map((asset) => (
          <AssetCard
            key={asset._id}
            id={asset._id}
            title={asset.titulo}
            image={getValidImage(asset)}
            formats={asset.formatos.map((f) => f.tipo)}
            author={asset.autor}
            category={asset.categorias?.[0] || "General"}
            isNew={Date.now() - new Date(asset.createdAt).getTime() < 1000 * 60 * 60 * 24 * 7}
          />
        ))}
      </div>
    ) : (
      <p className={styles.emptyText}>Este grupo no tiene assets aún.</p>
    )}
  </section>
);

export default GroupPage;
