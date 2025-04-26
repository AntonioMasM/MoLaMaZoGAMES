import React, { useState } from "react";
import styles from "./AssetForm.module.css";

const CATEGORIAS_PRINCIPALES = ["2D", "3D", "Animaciones", "UI/UX", "Texturas"];
const LICENCIAS = ["CC0", "CC BY", "CC BY-SA", "Propietaria"];
const OPCIONES = [
  { key: "Mature", label: "Mature" },
  { key: "NoLA", label: "NoLA" },
  { key: "IA", label: "IA" },
];

const AssetForm = ({
  formData = {},
  errors = {},
  refs = {},
  onChange = () => {},
  onToggleOption = () => {},
}) => {
  const {
    titulo = "",
    descripcion = "",
    categoriaPrincipal = "",
    licencia = "",
    otrasCategorias = [],
    opciones = {},
  } = formData;

  const [descripcionLength, setDescripcionLength] = useState(descripcion.length || 0);

  const handleAddTag = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const value = e.target.value.trim();
      if (value && !otrasCategorias.includes(value)) {
        onChange({
          target: {
            name: "otrasCategorias",
            value: [...otrasCategorias, value],
          },
        });
        e.target.value = "";
      }
    }
  };

  const handleRemoveTag = (tag) => {
    const updated = otrasCategorias.filter((t) => t !== tag);
    onChange({
      target: {
        name: "otrasCategorias",
        value: updated,
      },
    });
  };

  const handleDescripcionChange = (e) => {
    const { value } = e.target;
    setDescripcionLength(value.length);
    onChange(e);
  };

  return (
    <section className={styles.formSection}>
      <h2 className={styles.sectionTitle}>Información del Asset</h2>

      {/* Título */}
      <label htmlFor="titulo">
        Título*
        <input
          id="titulo"
          type="text"
          name="titulo"
          value={titulo}
          onChange={onChange}
          placeholder="Añade tu título aquí"
          required
          ref={refs.tituloRef}
          autoComplete="off"
          maxLength={80}
          aria-invalid={errors.titulo ? "true" : "false"}
          aria-describedby={errors.titulo ? "error-titulo" : undefined}
        />
        {errors.titulo && <p id="error-titulo" className={styles.errorMsg}>{errors.titulo}</p>}
      </label>

      {/* Descripción */}
      <label htmlFor="descripcion">
        Descripción*
        <textarea
          id="descripcion"
          name="descripcion"
          value={descripcion}
          onChange={handleDescripcionChange}
          placeholder="Añade la descripción del asset"
          rows={4}
          required
          ref={refs.descripcionRef}
          maxLength={500}
          aria-invalid={errors.descripcion ? "true" : "false"}
          aria-describedby={errors.descripcion ? "error-descripcion" : undefined}
        />
        <div className={styles.charCounter}>
          {descripcionLength}/500
        </div>
        {errors.descripcion && <p id="error-descripcion" className={styles.errorMsg}>{errors.descripcion}</p>}
      </label>

      {/* Categoría Principal + Licencia */}
      <div className={styles.row}>
        <label htmlFor="categoriaPrincipal">
          Categoría Principal*
          <select
            id="categoriaPrincipal"
            name="categoriaPrincipal"
            value={categoriaPrincipal}
            onChange={onChange}
            required
            ref={refs.categoriaRef}
            aria-invalid={errors.categoriaPrincipal ? "true" : "false"}
            aria-describedby={errors.categoriaPrincipal ? "error-categoriaPrincipal" : undefined}
          >
            <option value="">Elige categoría</option>
            {CATEGORIAS_PRINCIPALES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.categoriaPrincipal && <p id="error-categoriaPrincipal" className={styles.errorMsg}>{errors.categoriaPrincipal}</p>}
        </label>

        <label htmlFor="licencia">
          Licencia*
          <select
            id="licencia"
            name="licencia"
            value={licencia}
            onChange={onChange}
            required
            ref={refs.licenciaRef}
            aria-invalid={errors.licencia ? "true" : "false"}
            aria-describedby={errors.licencia ? "error-licencia" : undefined}
          >
            <option value="">Licencia a usar</option>
            {LICENCIAS.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
          {errors.licencia && <p id="error-licencia" className={styles.errorMsg}>{errors.licencia}</p>}
        </label>
      </div>

      {/* Otras Categorías como Tags */}
      <div className={styles.inputGroup}>
        <label htmlFor="otrasCategorias">Otras Categorías</label>
        <div className={styles.tagsContainer}>
          {otrasCategorias.map((tag, idx) => (
            <span key={idx} className={styles.tag}>
              {tag}
              <button
                type="button"
                aria-label={`Eliminar categoría ${tag}`}
                onClick={() => handleRemoveTag(tag)}
              >
                ✖
              </button>
            </span>
          ))}
          <input
            type="text"
            id="otrasCategorias"
            placeholder="Añade y pulsa Enter"
            onKeyDown={handleAddTag}
          />
        </div>
      </div>

      {/* Opciones */}
      <div className={styles.opcionesWrapper}>
        <span>Opciones:</span>
        <div className={styles.opciones}>
          {OPCIONES.map((op) => (
            <button
              type="button"
              key={op.key}
              className={`${styles.optionBtn} ${opciones[op.key] ? styles.active : ""}`}
              onClick={() => onToggleOption(op.key)}
              aria-pressed={opciones[op.key] ? "true" : "false"}
            >
              {op.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AssetForm;
