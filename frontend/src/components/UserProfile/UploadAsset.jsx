// src/components/UserProfile/UploadAsset.jsx
import React, { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { getUsuarioPorEmail } from "../../services/usuarios";
import { useGrupos } from "../../hooks/useGrupos";
import { useMensajes } from "../../hooks/useMensajes";           // ← nuevo
import { useModal } from "../../context/ModalContext";          // ← nuevo

import InviteModal from "../Modals/InviteModal";                 // ← nuevo
import { FaUsers } from "react-icons/fa";
import styles from "./UploadAsset.module.css";

const UploadAsset = () => {
  const { user: sessionUser } = useUser();
  const { crearNuevoGrupo, loading, error } = useGrupos();
  const { enviarMensaje } = useMensajes();                      // ← nuevo
  const { showModal } = useModal();                             // ← nuevo

  const [userId, setUserId] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");
  const [grupoCreado, setGrupoCreado] = useState(null);         // ← nuevo
  const [modalVisible, setModalVisible] = useState(false);      // ← nuevo
  const [enviandoInvitacion, setEnviandoInvitacion] = useState(false); // ← nuevo

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        if (!sessionUser?.email) return;
        const usuario = await getUsuarioPorEmail(sessionUser.email);
        setUserId(usuario._id);
      } catch (err) {
        console.error("Error obteniendo el ID del usuario:", err);
      }
    };
    fetchUserId();
  }, [sessionUser?.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensajeExito("");
    setGrupoCreado(null);

    if (!titulo.trim() || !descripcion.trim()) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    if (!userId) {
      alert("No se ha podido identificar al usuario. Intenta iniciar sesión nuevamente.");
      return;
    }

    try {
      const grupoData = {
        titulo,
        descripcion,
        usuarios: [userId], // el creador es el primer miembro
        creador: userId,
      };

      const nuevo = await crearNuevoGrupo(grupoData);
      setMensajeExito("✅ Grupo creado con éxito.");
      setGrupoCreado(nuevo);            // guardamos el grupo para usar su _id
      setTitulo("");
      setDescripcion("");
      setModalVisible(true);            // abrimos automáticamente modal de invitación
    } catch (err) {
      console.error("Error al crear grupo:", err);
    }
  };

  const handleInvitarUsuario = async (email) => {
    try {
      setEnviandoInvitacion(true);
      // 1) buscamos al usuario por email
      const BASE_URL = import.meta.env.VITE_API_URL;

      const res = await fetch(`${BASE_URL}/usuarios/${email}`);
      if (!res.ok) {
        return showModal("error", { mensaje: "No se encontró el usuario." });
      }
      const user = await res.json();

      // 2) validaciones
      if (user._id === grupoCreado.creador)
        return showModal("error", { mensaje: "No puedes invitarte a ti mismo." });
      const yaMiembro = grupoCreado.usuarios.some(u => u === user._id);
      if (yaMiembro)
        return showModal("error", { mensaje: "Este usuario ya es miembro del grupo." });

      // 3) enviamos mensaje de invitación
      const contenido = `Te han invitado a colaborar en el grupo "${grupoCreado.titulo}".\n` +
                        `Haz clic aquí: ${window.location.origin}/groups/${grupoCreado._id}`;
      await enviarMensaje({
        remitente: grupoCreado.creador,
        destinatario: user._id,
        contenido,
        tipoMensaje: "grupo",
      });

      showModal("confirm", { email, grupo: grupoCreado });
    } catch (err) {
      console.error("Error al enviar invitación:", err);
      showModal("error", { mensaje: "Hubo un problema al enviar la invitación." });
    } finally {
      setEnviandoInvitacion(false);
    }
  };

  return (
    <section
      className={styles.uploadAsset}
      aria-label="Crear un nuevo grupo de trabajo"
      role="region"
    >
      <h3 className={styles.title}>
        <FaUsers className={styles.icon} aria-hidden="true" /> Crear Grupo
      </h3>

      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="titulo" className={styles.label}>Nombre del Grupo</label>
        <input
          type="text"
          id="titulo"
          className={styles.input}
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          aria-required="true"
        />

        <label htmlFor="descripcion" className={styles.label}>Descripción</label>
        <textarea
          id="descripcion"
          className={styles.textarea}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
          aria-required="true"
          maxLength={500}
        />

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Creando..." : "Crear Grupo"}
        </button>

        {mensajeExito && <p className={styles.successMessage}>{mensajeExito}</p>}
        {error && <p className={styles.errorMessage}>{error}</p>}
      </form>

      {/* InviteModal: aparece tras crear el grupo */}
      {grupoCreado && (
        <InviteModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onInvite={handleInvitarUsuario}
          enviando={enviandoInvitacion}
          aria-describedby="modal-invitar"
        />
      )}
    </section>
  );
};

export default UploadAsset;
