import { useState, useEffect } from "react";
import styles from "./FiltrosAvanzados.module.css";
import { getCategorias } from "@/services/categorias";
import {
  FaFilter,
  FaCheckSquare,
  FaList,
  FaSortAmountDown,
} from "react-icons/fa";

const FORMATOS_DISPONIBLES = [
  // 2D
  "png", "jpeg", "jpg", "svg",

  // 3D
  "fbx", "obj", "stl", "gltf", "glb", "blend",

  // Audio
  "mp3", "wav", "ogg",

  // Video
  "mp4", "webm", "mov",

  // Código / texto
  "txt", "json", "html", "css", "js",

  // Otros
  "zip", "rar", "7z"
];


const SOFTWARES_DISPONIBLES = [
  "Blender", "Photoshop", "Figma", "Maya", "Unity", "Unreal", "ZBrush",
  "Illustrator", "Cinema 4D", "Substance Painter", "After Effects", "Premiere"
];

const FormatoChip = ({ formato, activos, onToggle }) => {
  const activo = activos.includes(formato);

  return (
    <button
      type="button"
      className={`${styles.formatChip} ${activo ? styles.active : ""}`}
      onClick={() => onToggle(formato)}
      aria-pressed={activo}
    >
      {formato.toUpperCase()}
    </button>
  );
};

const FiltrosAvanzados = ({ tipo, filtros, onChange }) => {
  const [filtrosLocales, setFiltrosLocales] = useState(filtros);
  const [categoriasDisponibles, setCategoriasDisponibles] = useState([]);
  const [loadingCategorias, setLoadingCategorias] = useState(false);
  const [errorCategorias, setErrorCategorias] = useState(null);
  const [busquedaFormato, setBusquedaFormato] = useState("");
  const [busquedaSoftware, setBusquedaSoftware] = useState("");
  useEffect(() => {
    setFiltrosLocales(filtros);
  }, [filtros]);

  useEffect(() => {
    const fetchCategorias = async () => {
      setLoadingCategorias(true);
      try {
        const res = await getCategorias();
        setCategoriasDisponibles(res);
        setErrorCategorias(null);
      } catch (err) {
        console.error("Error al obtener categorías:", err);
        setErrorCategorias("No se pudieron cargar las categorías.");
      } finally {
        setLoadingCategorias(false);
      }
    };

    if (tipo === "Assets" || tipo === "Usuarios") fetchCategorias();
  }, [tipo]);

  const actualizarFiltro = (clave, valor) => {
    const nuevos = { ...filtrosLocales, [clave]: valor };
    setFiltrosLocales(nuevos);
    onChange(nuevos);
  };

  const toggleFormato = (formato) => {
    const actual = filtrosLocales.formatos || [];
    const nuevos = actual.includes(formato)
      ? actual.filter((f) => f !== formato)
      : [...actual, formato];
    actualizarFiltro("formatos", nuevos);
  };

  const resetFiltros = () => {
    if (JSON.stringify(filtrosLocales) !== '{}') {
      setFiltrosLocales({});
      onChange({});
    }
  };

const renderFiltrosAssets = () => (
  <fieldset
    className={styles.filtrosGrupo}
    aria-labelledby="titulo-filtros-assets"
  >


    {/* 🎯 Categorías como lista de botones en lugar de select múltiple */}
    <div className={styles.categoriaWrapper}>
      <span className={styles.label}><FaList /> Categorías</span>
      {loadingCategorias ? (
        <p className={styles.mensaje}>Cargando categorías...</p>
      ) : errorCategorias ? (
        <p className={styles.error} role="alert" aria-live="assertive">
          {errorCategorias}
        </p>
      ) : (
        <div
          role="group"
          aria-label="Selecciona una o más categorías"
          className={styles.categoriaChipList}
        >
          {categoriasDisponibles.map((cat) => {
            const activa = (filtrosLocales.categorias || []).includes(cat.nombre);
            return (
              <button
                key={cat._id}
                type="button"
                className={`${styles.categoriaChip} ${activa ? styles.active : ""}`}
                onClick={() => {
                  const actuales = filtrosLocales.categorias || [];
                  const nuevas = actuales.includes(cat.nombre)
                    ? actuales.filter((c) => c !== cat.nombre)
                    : [...actuales, cat.nombre];
                  actualizarFiltro("categorias", nuevas);
                }}
                aria-pressed={activa}
              >
                {cat.nombre}
              </button>
            );
          })}
        </div>
      )}
    </div>

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}><FaList /> Formatos</legend>

        <input
          type="text"
          placeholder="Buscar formato..."
          className={styles.input}
          value={busquedaFormato}
          onChange={(e) => setBusquedaFormato(e.target.value.toLowerCase())}
        />

        <div className={styles.chipList}>
          {FORMATOS_DISPONIBLES
            .filter((formato) => formato.toLowerCase().includes(busquedaFormato))
            .map((formato) => (
              <FormatoChip
                key={formato}
                formato={formato}
                activos={filtrosLocales.formatos || []}
                onToggle={toggleFormato}
              />
            ))}
        </div>
      </fieldset>



    {/* 🎯 Disponible toggle */}
    <label htmlFor="filtro-disponible" className={styles.switchLabel}>
      <input
        type="checkbox"
        id="filtro-disponible"
        checked={filtrosLocales.disponible || false}
        onChange={(e) => actualizarFiltro("disponible", e.target.checked)}
      />
      Solo disponibles
    </label>
  </fieldset>
);


  const renderFiltrosUsuarios = () => (
    <fieldset
      className={styles.filtrosGrupo}
      aria-labelledby="titulo-filtros-usuarios"
    >


      <label htmlFor="filtro-pais" className={styles.label}>País</label>
      <input
        id="filtro-pais"
        type="text"
        className={styles.input}
        value={filtrosLocales.pais || ""}
        onChange={(e) => actualizarFiltro("pais", e.target.value)}
        placeholder="Ej: España, México..."
      />

<label htmlFor="filtro-software" className={styles.label}>Software</label>

<input
  type="text"
  placeholder="Buscar software..."
  className={styles.input}
  value={busquedaSoftware}
  onChange={(e) => setBusquedaSoftware(e.target.value.toLowerCase())}
/>

<div className={styles.chipList}>
  {SOFTWARES_DISPONIBLES
    .filter((sw) => sw.toLowerCase().includes(busquedaSoftware))
    .map((sw) => {
      const activos = filtrosLocales.software || [];
      const activo = activos.includes(sw);
      return (
        <button
          key={sw}
          type="button"
          className={`${styles.formatChip} ${activo ? styles.active : ""}`}
          onClick={() => {
            const nuevos = activo
              ? activos.filter((s) => s !== sw)
              : [...activos, sw];
            actualizarFiltro("software", nuevos);
          }}
          aria-pressed={activo}
        >
          {sw}
        </button>
      );
    })}
</div>


      <label htmlFor="filtro-cargo" className={styles.label}>Cargo</label>
      <select
        id="filtro-cargo"
        className={styles.select}
        value={filtrosLocales.cargo || ""}
        onChange={(e) => actualizarFiltro("cargo", e.target.value)}
      >
        <option value="" disabled hidden>
          Selecciona un cargo
        </option>
        <option value="Diseñador Gráfico">Diseñador Gráfico</option>
        <option value="Modelador 3D">Modelador 3D</option>
        <option value="Programador">Programador</option>
      </select>
    </fieldset>
  );

  const renderFiltrosCategorias = () => (
    <fieldset
      className={styles.filtrosGrupo}
      aria-labelledby="titulo-filtros-categorias"
    >


      <label htmlFor="filtro-nombre" className={styles.label}>Nombre contiene</label>
      <input
        id="filtro-nombre"
        type="text"
        className={styles.input}
        value={filtrosLocales.nombre || ""}
        onChange={(e) => actualizarFiltro("nombre", e.target.value)}
        placeholder="Ej: 2D, Modelado..."
      />

      <label htmlFor="filtro-fecha-desde" className={styles.label}>Fecha desde</label>
      <input
        id="filtro-fecha-desde"
        type="date"
        className={styles.input}
        value={filtrosLocales.fechaDesde || ""}
        onChange={(e) => actualizarFiltro("fechaDesde", e.target.value)}
      />

      <label htmlFor="filtro-fecha-hasta" className={styles.label}>Fecha hasta</label>
      <input
        id="filtro-fecha-hasta"
        type="date"
        className={styles.input}
        value={filtrosLocales.fechaHasta || ""}
        onChange={(e) => actualizarFiltro("fechaHasta", e.target.value)}
      />
    </fieldset>
  );

  return (
    <section className={styles.panel} aria-labelledby="titulo-panel-filtros">
      <h3 id="titulo-panel-filtros" className={styles.panelTitle}>
        <FaFilter /> Filtros Avanzados
      </h3>

      {tipo === "Assets" && renderFiltrosAssets()}
      {tipo === "Usuarios" && renderFiltrosUsuarios()}
      {tipo === "Categorías" && renderFiltrosCategorias()}

      <div className={styles.footer}>
        <button
          onClick={resetFiltros}
          className={styles.resetButton}
          aria-label="Limpiar todos los filtros"
        >
          Limpiar filtros
        </button>
      </div>
    </section>
  );
};

export default FiltrosAvanzados;
