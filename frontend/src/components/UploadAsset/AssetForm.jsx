import React, { useState, useEffect } from "react";
import { getCategorias } from "@/services/categorias";
import styles from "./AssetForm.module.css";

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
  // 🚫 No permitir quitar la categoría principal
  if (categoriaNombre === categoriaPrincipal) return;

  let updatedCategorias;
  if (otrasCategorias.includes(categoriaNombre)) {
    updatedCategorias = otrasCategorias.filter((cat) => cat !== categoriaNombre);
  } else {
    updatedCategorias = [...otrasCategorias, categoriaNombre];
  }

  onChange({
    target: {
      name: "otrasCategorias",
      value: updatedCategorias,
    },
  });
};

const handleCategoriaPrincipalChange = (e) => {
  const { value } = e.target;

  // Actualiza categoría principal
  onChange({
    target: {
      name: "categoriaPrincipal",
      value,
    },
  });

  // Asegúrate de que también está en otrasCategorias
  if (!otrasCategorias.includes(value)) {
    onChange({
      target: {
        name: "otrasCategorias",
        value: [...otrasCategorias, value],
      },
    });
  }
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
          {loadingCategorias ? (
            <p>Cargando categorías...</p>
          ) : errorCategorias ? (
            <p className={styles.errorMsg}>{errorCategorias}</p>
          ) : (
            <select
              id="categoriaPrincipal"
              name="categoriaPrincipal"
              value={categoriaPrincipal}
              onChange={handleCategoriaPrincipalChange}
              required
              ref={refs.categoriaRef}
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

      {/* Otras Categorías desde BD */}
      <div className={styles.inputGroup}>
        <span>Otras Categorías</span>
        {loadingCategorias ? (
          <p>Cargando categorías...</p>
        ) : errorCategorias ? (
          <p className={styles.errorMsg}>{errorCategorias}</p>
        ) : (
          <div className={styles.tagsContainer}>
            {categoriasDB.map((cat) => (
            <button
              type="button"
              key={cat._id}
              className={`${styles.categoryTag} ${
                otrasCategorias.includes(cat.nombre) ? styles.selectedTag : ""
              } ${categoriaPrincipal === cat.nombre ? styles.lockedTag : ""}`}
              onClick={() => handleToggleOtraCategoria(cat.nombre)}
              aria-pressed={otrasCategorias.includes(cat.nombre)}
              disabled={categoriaPrincipal === cat.nombre}
              title={categoriaPrincipal === cat.nombre ? "Esta es la categoría principal" : ""}
            >
              {cat.nombre}
            </button>

            ))}
          </div>
        )}
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
