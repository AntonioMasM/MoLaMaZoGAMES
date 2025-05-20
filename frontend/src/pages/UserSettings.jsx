import React, { useState, useEffect, useRef, useContext } from "react";
import { useUser } from "../context/UserContext";
import { getUsuarioPorEmail, actualizarUsuario } from "../services/userService";
import Sidebar from "../components/UserProfile/Sidebar";
import uploadImageToCloudinary from "../services/uploadImageToCloudinary";
import deleteImageFromCloudinary from "../services/deleteImageFromCloudinary";
import { useTheme } from "../hooks/useTheme";
import { useAlertQueue } from "../context/AlertQueueContext";
import styles from "../styles/UserSettings.module.css";

const getInitialFormData = (user) => ({
  nombreCompleto: user?.nombreCompleto || "",
  bio: user?.bio || "",
  pais: user?.ubicacion?.pais || "",
  municipio: user?.ubicacion?.municipio || "",
  universidad: user?.formacion?.universidad || "",
  carrera: user?.formacion?.carrera || "",
  modo: user?.modo || "dark",
  fotoPerfil: user?.fotoPerfil || {
    secure_url: "/users/defaultProfile.webp",
    public_id: "default_local",
  },
  software: user?.software || [],
  skills: user?.skills || [],
  intereses: user?.intereses || [],
  redesSociales: user?.redesSociales || {
    linkedin: "",
    artstation: "",
    twitter: "",
    instagram: "",
    facebook: "",
  },
  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",
});

const UserSettings = () => {
  const { user: contextUser, updateUser } = useUser();
  const { setDark, setLight, setContrast } = useTheme();
  const { showAlert } = useAlertQueue();
  const email = contextUser?.email;
  const fileInputRef = useRef(null);

  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mensaje, setMensaje] = useState("");
  const [softwareInput, setSoftwareInput] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [interesInput, setInteresInput] = useState("");

  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        if (!email) return;
        const usuario = await getUsuarioPorEmail(email);
        setUserData(usuario);
        setFormData(getInitialFormData(usuario));
      } catch (error) {
        console.error("Error al cargar el usuario:", error);
      } finally {
        setLoading(false);
      }
    };
    cargarUsuario();
  }, [email]);

  if (loading) {
    return <div className={styles.loadingWrapper}>Cargando configuración del usuario…</div>;
  }

  if (!formData) {
    return <main className={styles.emptyState}>No se pudo cargar la configuración.</main>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      redesSociales: { ...prev.redesSociales, [name]: value },
    }));
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const publicId = formData.fotoPerfil?.public_id;
      if (publicId && publicId !== "default_local") {
        await deleteImageFromCloudinary(publicId);
      }

      const newImage = await uploadImageToCloudinary(file);
      setFormData((prev) => ({
        ...prev,
        fotoPerfil: {
          secure_url: newImage.secure_url,
          public_id: newImage.public_id,
        },
      }));
    } catch (error) {
      console.error("Error cambiando la imagen:", error);
    }
  };

  const handleUploadClick = () => fileInputRef.current?.click();

  const addArrayItem = (field, value, setInput) => {
    if (value.trim()) {
      setFormData((prev) => ({
        ...prev,
        [field]: [...prev[field], value.trim()],
      }));
      setInput("");
    }
  };

  const removeItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const aplicarTema = (modo) => {
    if (modo === "dark") setDark();
    else if (modo === "white") setLight();
    else if (modo === "high-contrast") setContrast();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");

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
          municipio: formData.municipio,
        },
        formacion: {
          universidad: formData.universidad,
          carrera: formData.carrera,
        },
        modo: formData.modo,
        fotoPerfil: formData.fotoPerfil,
        software: formData.software,
        skills: formData.skills,
        intereses: formData.intereses,
        redesSociales: formData.redesSociales,
        password: formData.newPassword || undefined,
      };

      await actualizarUsuario(email, payload);
      updateUser({ ...userData, ...payload });
      aplicarTema(formData.modo);
      showAlert("Perfil actualizado correctamente ✅", "success");
    } catch (error) {
      console.error(error);
      showAlert("Error al actualizar el perfil ❌", "error");
    }
  };

  return (
    <div className={styles.settingsLayout}>
      <Sidebar />
      <main className={styles.profileContent} aria-label="Configuración de Perfil">
        <h1 className={styles.pageTitle}>Configuración de Perfil</h1>

        <div className={styles.avatarContainer}>
          <img
            src={formData.fotoPerfil.secure_url}
            alt={`Foto de perfil de ${formData.nombreCompleto || "usuario"}`}
            className={styles.avatar}
          />
          <button type="button" className={styles.changePhotoButton} onClick={handleUploadClick}>
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
           {/* Información personal */}
           <section className={styles.section}>
            <h2>Información Personal</h2>
            <label>Nombre completo:</label>
            <input type="text" name="nombreCompleto" value={formData.nombreCompleto} onChange={handleChange} required />
            <label>Bio:</label>
            <textarea name="bio" value={formData.bio} onChange={handleChange} rows="3" />
            <label>País:</label>
            <input type="text" name="pais" value={formData.pais} onChange={handleChange} />
            <label>Municipio:</label>
            <input type="text" name="municipio" value={formData.municipio} onChange={handleChange} />
          </section>

          {/* Formación */}
          <section className={styles.section}>
            <h2>Formación Académica</h2>
            <label>Universidad:</label>
            <input type="text" name="universidad" value={formData.universidad} onChange={handleChange} />
            <label>Carrera:</label>
            <input type="text" name="carrera" value={formData.carrera} onChange={handleChange} />
          </section>

          {/* Redes Sociales */}
          <section className={styles.section}>
            <h2>Redes Sociales</h2>
            <label>Twitter / X:</label>
            <input type="text" name="twitter" value={formData.redesSociales.twitter} onChange={handleSocialChange} />
            <label>Instagram:</label>
            <input type="text" name="instagram" value={formData.redesSociales.instagram} onChange={handleSocialChange} />
            <label>Linkedin:</label>
            <input type="text" name="linkedin" value={formData.redesSociales?.linkedin ?? ""} onChange={handleSocialChange} />
            <label>ArtStation:</label>
            <input type="text" name="artstation" value={formData.redesSociales.artstation} onChange={handleSocialChange} />
          </section>

          {/* Software */}
          <section className={styles.section}>
            <h2>Software</h2>
            <div className={styles.arrayInput}>
              <input type="text" value={softwareInput} onChange={(e) => setSoftwareInput(e.target.value)} placeholder="Añadir software" />
              <button type="button" onClick={() => addArrayItem("software", softwareInput, setSoftwareInput)}>Añadir</button>
            </div>
            <ul className={styles.tagList}>
              {formData.software.map((item, index) => (
                <li key={index}>{item} <button type="button" onClick={() => removeItem("software", index)}>x</button></li>
              ))}
            </ul>
          </section>

          {/* Skills */}
          <section className={styles.section}>
            <h2>Skills</h2>
            <div className={styles.arrayInput}>
              <input type="text" value={skillInput} onChange={(e) => setSkillInput(e.target.value)} placeholder="Añadir skill" />
              <button type="button" onClick={() => addArrayItem("skills", skillInput, setSkillInput)}>Añadir</button>
            </div>
            <ul className={styles.tagList}>
              {formData.skills.map((item, index) => (
                <li key={index}>{item} <button type="button" onClick={() => removeItem("skills", index)}>x</button></li>
              ))}
            </ul>
          </section>

          {/* Intereses */}
          <section className={styles.section}>
            <h2>Intereses</h2>
            <div className={styles.arrayInput}>
              <input type="text" value={interesInput} onChange={(e) => setInteresInput(e.target.value)} placeholder="Añadir interés" />
              <button type="button" onClick={() => addArrayItem("intereses", interesInput, setInteresInput)}>Añadir</button>
            </div>
            <ul className={styles.tagList}>
              {formData.intereses.map((item, index) => (
                <li key={index}>{item} <button type="button" onClick={() => removeItem("intereses", index)}>x</button></li>
              ))}
            </ul>
          </section>

          {/* Seguridad */}
          <section className={styles.section}>
            <h2>Seguridad</h2>
            <label>Contraseña actual:</label>
            <input type="password" name="currentPassword" value={formData.currentPassword} onChange={handleChange} />
            <label>Nueva contraseña:</label>
            <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} />
            <label>Confirmar nueva contraseña:</label>
            <input type="password" name="confirmNewPassword" value={formData.confirmNewPassword} onChange={handleChange} />
          </section>
          <section className={styles.section}>
            <h2>Preferencias</h2>
            <label>Tema:</label>
            <select name="modo" value={formData.modo} onChange={handleChange}>
              <option value="dark">Oscuro</option>
              <option value="white">Claro</option>
              <option value="high-contrast">Alto Contraste</option>
            </select>
          </section>

          <button type="submit" className={styles.saveButton}>Guardar Cambios</button>
          {mensaje && <p className={styles.message}>{mensaje}</p>}
        </form>
      </main>
    </div>
  );
};

export default UserSettings;