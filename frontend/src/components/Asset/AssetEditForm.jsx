import React, { useEffect, useState } from "react";
import { getCategorias } from "@/services/categorias";
import styles from "./AssetEditForm.module.css";

const LICENCIAS = ["CC0", "CC BY", "CC BY-SA", "Propietaria"];
const OPCIONES = [
  { key: "Mature", label: "Mature" },
  { key: "NoLA", label: "NoLA" },
  { key: "IA", label: "IA" },
];

const AssetEditForm = ({
  formData,
  errors = {},
  refs = {},
  onChange = () => {},
  onToggleOption = () => {},
  saving = false,
  onSubmit,
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
  const [categoriasDB, setCategoriasDB] = useState([]);
  const [loadingCategorias, setLoadingCategorias] = useState(true);
  const [errorCategorias, setErrorCategorias] = useState("");

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const data = await getCategorias();
        setCategoriasDB(data);
      } catch (error) {
        console.error("Error al cargar categorías:", error);
        setErrorCategorias("No se pudieron cargar las categorías.");
      } finally {
        setLoadingCategorias(false);
      }
    };

    fetchCategorias();
  }, []);

  const handleDescripcionChange = (e) => {
    const { value } = e.target;
    setDescripcionLength(value.length);
    onChange(e);
  };

  const handleToggleOtraCategoria = (categoriaNombre) => {
    const updated = otrasCategorias.includes(categoriaNombre)
      ? otrasCategorias.filter((c) => c !== categoriaNombre)
      : [...otrasCategorias, categoriaNombre];

    onChange({
      target: {
        name: "otrasCategorias",
        value: updated,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit && onSubmit();
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {/* Título */}
      <label htmlFor="titulo">
        Título*
        <input
          id="titulo"
          name="titulo"
          type="text"
          value={titulo}
          onChange={onChange}
          ref={refs.tituloRef}
          required
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
          rows={5}
          value={descripcion}
          onChange={handleDescripcionChange}
          ref={refs.descripcionRef}
          maxLength={500}
          required
          aria-invalid={errors.descripcion ? "true" : "false"}
          aria-describedby={errors.descripcion ? "error-descripcion" : undefined}
        />
        <div className={styles.charCounter}>{descripcionLength}/500</div>
        {errors.descripcion && <p id="error-descripcion" className={styles.errorMsg}>{errors.descripcion}</p>}
      </label>

      {/* Categoría Principal y Licencia */}
      <div className={styles.row}>
        <label htmlFor="categoriaPrincipal">
          Categoría Principal*
          {loadingCategorias ? (
            <p>Cargando categorías...</p>
          ) : errorCategorias ? (
            <p className={styles.errorMsg}>{errorCategorias}</p>
          ) : (
            <select
              id="categoriaPrincipal"
              name="categoriaPrincipal"
              value={categoriaPrincipal}
              onChange={onChange}
              ref={refs.categoriaRef}
              required
              aria-invalid={errors.categoriaPrincipal ? "true" : "false"}
              aria-describedby={errors.categoriaPrincipal ? "error-categoriaPrincipal" : undefined}
            >
              <option value="">Elige categoría</option>
              {categoriasDB.map((cat) => (
                <option key={cat._id} value={cat.nombre}>
                  {cat.nombre}
                </option>
              ))}
            </select>
          )}
          {errors.categoriaPrincipal && <p id="error-categoriaPrincipal" className={styles.errorMsg}>{errors.categoriaPrincipal}</p>}
        </label>

        <label htmlFor="licencia">
          Licencia*
          <select
            id="licencia"
            name="licencia"
            value={licencia}
            onChange={onChange}
            ref={refs.licenciaRef}
            required
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

{/* Otras Categorías */}
<div className={styles.inputGroup}>
  <span>Otras Categorías:</span>
  <div className={styles.tagsContainer}>
    {categoriasDB
      .filter((cat) => cat.nombre !== categoriaPrincipal)
      .map((cat) => (
        <button
          type="button"
          key={cat._id}
          className={`${styles.categoryTag} ${
            otrasCategorias.includes(cat.nombre) ? styles.selectedTag : ""
          }`}
          onClick={() => handleToggleOtraCategoria(cat.nombre)}
          aria-pressed={otrasCategorias.includes(cat.nombre)}
        >
          {cat.nombre}
        </button>
      ))}
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

      {/* Guardar */}
      <button type="submit" disabled={saving}>
        {saving ? "Guardando..." : "Guardar cambios"}
      </button>
    </form>
  );
};

export default AssetEditForm;
