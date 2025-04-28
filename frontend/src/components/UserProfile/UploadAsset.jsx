// src/components/UserProfile/UploadAsset.jsx
import React, { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { getUsuarioPorEmail } from "../../services/usuarios";
import { useGrupos } from "../../hooks/useGrupos";
import { FaUsers } from "react-icons/fa";
import styles from "./UploadAsset.module.css";

const UploadAsset = () => {
  const { user: sessionUser } = useUser();
  const { crearNuevoGrupo, loading, error } = useGrupos();

  const [userId, setUserId] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [mensajeExito, setMensajeExito] = useState("");

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
        usuarios: [userId], // 🔥 Ahora el creador es automáticamente el primer miembro
        creador: userId,
      };

      await crearNuevoGrupo(grupoData);
      setMensajeExito("✅ Grupo creado con éxito.");
      setTitulo("");
      setDescripcion("");
    } catch (err) {
      console.error("Error al crear grupo:", err);
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
        <label htmlFor="titulo" className={styles.label}>
          Nombre del Grupo
        </label>
        <input
          type="text"
          id="titulo"
          className={styles.input}
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
          aria-required="true"
        />

        <label htmlFor="descripcion" className={styles.label}>
          Descripción
        </label>
        <textarea
          id="descripcion"
          className={styles.textarea}
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
          aria-required="true"
          maxLength={500}
        ></textarea>

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Creando..." : "Crear Grupo"
          }
        </button>

        {mensajeExito && <p className={styles.successMessage}>{mensajeExito}</p>}
        {error && <p className={styles.errorMessage}>{error}</p>}
      </form>
    </section>
  );
};

export default UploadAsset;
