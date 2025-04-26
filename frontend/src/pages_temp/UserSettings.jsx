import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import { useUser } from "../context/UserContext";
import Sidebar from "../components/UserProfile/Sidebar";

import styles from "../styles/UserSettings.module.css";
import uploadImageToCloudinary from "../services/uploadImageToCloudinary";

const UserSettings = () => {
  const { user: contextUser } = useUser();
  const email = contextUser?.email;

  const fileInputRef = useRef(null); // Referencia al input de archivo

  const [formData, setFormData] = useState({
    nombreCompleto: "",
    bio: "",
    pais: "",
    municipio: "",
    universidad: "",
    carrera: "",
    modo: "oscuro",
    fotoPerfil: "", // Imagen URL
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: ""
  });

  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(true);

  // Cargar los datos del usuario
  useEffect(() => {
    if (contextUser) {
      setFormData({
        nombreCompleto: contextUser.nombreCompleto || "",
        bio: contextUser.bio || "",
        pais: contextUser.ubicacion?.pais || "",
        municipio: contextUser.ubicacion?.municipio || "",
        universidad: contextUser.formacion?.universidad || "",
        carrera: contextUser.formacion?.carrera || "",
        modo: contextUser.modo || "oscuro",
        fotoPerfil: contextUser.fotoPerfil || "/assets/users/default-avatar.png",
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
      });
      setLoading(false);
    }
  }, [contextUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageUrl = await uploadImageToCloudinary(file);
        setFormData((prev) => ({
          ...prev,
          fotoPerfil: imageUrl
        }));
      } catch (error) {
        console.error("Error subiendo imagen:", error);
      }
    }
  };
  

  const handleUploadClick = () => {
    fileInputRef.current.click(); // Dispara el input file oculto
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword && formData.newPassword !== formData.confirmNewPassword) {
      setMensaje("Las nuevas contraseñas no coinciden.");
      return;
    }

    try {
      const payload = {
        nombreCompleto: formData.nombreCompleto,
        bio: formData.bio,
        ubicacion: {
          pais: formData.pais,
          municipio: formData.municipio
        },
        formacion: {
          universidad: formData.universidad,
          carrera: formData.carrera
        },
        modo: formData.modo,
        fotoPerfil: formData.fotoPerfil,
        password: formData.newPassword ? formData.newPassword : undefined
        // 🚨 NOTA: No estamos subiendo `fotoPerfil` todavía a la API aquí.
      };

      await axios.put(`http://localhost:5000/api/usuarios/${email}`, payload);
      setMensaje("Perfil actualizado correctamente ✅");
    } catch (error) {
      console.error(error);
      setMensaje("Error al actualizar el perfil ❌");
    }
  };

  if (loading) {
    return <div style={{ padding: "2rem", textAlign: "center" }}>Cargando configuración...</div>;
  }

  return (
    <div className={styles.settingsLayout}>
      <Sidebar />

      <main className={styles.profileContent} aria-label="Configuración de Perfil">
        <h1 className={styles.pageTitle}>Configuración de Perfil</h1>

        {/* Imagen de Perfil */}
        <div className={styles.avatarContainer}>
          <img
            src={formData.fotoPerfil}
            alt={`Foto de perfil de ${formData.nombreCompleto}`}
            className={styles.avatar}
          />
          <button
            type="button"
            className={styles.changePhotoButton}
            onClick={handleUploadClick}
          >
            Cambiar Foto
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            accept="image/*"
            onChange={handlePhotoChange}
          />
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* Información Personal */}
          <section className={styles.section}>
            <h2>Información Personal</h2>

            <label>
              Nombre completo:
              <input
                type="text"
                name="nombreCompleto"
                value={formData.nombreCompleto}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Bio:
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="3"
              />
            </label>

            <label>
              País:
              <input
                type="text"
                name="pais"
                value={formData.pais}
                onChange={handleChange}
              />
            </label>

            <label>
              Municipio:
              <input
                type="text"
                name="municipio"
                value={formData.municipio}
                onChange={handleChange}
              />
            </label>
          </section>

          {/* Formación */}
          <section className={styles.section}>
            <h2>Formación Académica</h2>

            <label>
              Universidad:
              <input
                type="text"
                name="universidad"
                value={formData.universidad}
                onChange={handleChange}
              />
            </label>

            <label>
              Carrera:
              <input
                type="text"
                name="carrera"
                value={formData.carrera}
                onChange={handleChange}
              />
            </label>
          </section>

          {/* Seguridad */}
          <section className={styles.section}>
            <h2>Seguridad</h2>

            <label>
              Contraseña actual:
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="(opcional)"
              />
            </label>

            <label>
              Nueva contraseña:
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </label>

            <label>
              Confirmar nueva contraseña:
              <input
                type="password"
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleChange}
              />
            </label>
          </section>

          {/* Preferencias */}
          <section className={styles.section}>
            <h2>Preferencias</h2>

            <label>
              Tema:
              <select
                name="modo"
                value={formData.modo}
                onChange={handleChange}
              >
                <option value="oscuro">Oscuro</option>
                <option value="claro">Claro</option>
                <option value="texto grande">Texto Grande</option>
              </select>
            </label>
          </section>

          <button type="submit" className={styles.saveButton}>
            Guardar Cambios
          </button>

          {mensaje && <p className={styles.message}>{mensaje}</p>}
        </form>
      </main>
    </div>
  );
};

export default UserSettings;
