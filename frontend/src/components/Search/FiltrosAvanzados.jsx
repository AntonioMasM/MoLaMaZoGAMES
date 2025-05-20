import { useState, useEffect } from "react";
import styles from "./FiltrosAvanzados.module.css";
import { getCategorias } from "@/services/categorias";
import { FaFilter, FaCheckSquare, FaList, FaSortAmountDown } from "react-icons/fa";

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
    <fieldset className={styles.filtrosGrupo} aria-labelledby="titulo-filtros-assets">
      <legend id="titulo-filtros-assets" className={styles.subtitulo}><FaFilter /> Filtros de Assets</legend>

      <label htmlFor="filtro-categorias" className={styles.label}><FaList /> Categorías</label>
      {loadingCategorias ? (
        <p className={styles.mensaje}>Cargando categorías...</p>
      ) : errorCategorias ? (
        <p className={styles.error} role="alert">{errorCategorias}</p>
      ) : (
        <select
          id="filtro-categorias"
          multiple
          className={styles.selectMultiple}
          value={filtrosLocales.categorias || []}
          onChange={(e) => {
            const opciones = Array.from(e.target.selectedOptions).map(o => o.value);
            actualizarFiltro("categorias", opciones);
          }}
        >
          {categoriasDisponibles.map(cat => (
            <option key={cat._id} value={cat.nombre}>{cat.nombre}</option>
          ))}
        </select>
      )}

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}><FaCheckSquare /> Formatos</legend>
        {["png", "fbx", "obj", "glb", "mp4"].map((formato) => (
          <FormatoChip
            key={formato}
            formato={formato}
            activos={filtrosLocales.formatos || []}
            onToggle={toggleFormato}
          />
        ))}
      </fieldset>

      <label htmlFor="filtro-disponible" className={styles.switchLabel}>
        <input
          type="checkbox"
          id="filtro-disponible"
          checked={filtrosLocales.disponible || false}
          onChange={(e) => actualizarFiltro("disponible", e.target.checked)}
        />
        Solo disponibles
      </label>

      <label htmlFor="filtro-orden" className={styles.label}><FaSortAmountDown /> Orden</label>
      <select
        id="filtro-orden"
        value={filtrosLocales.orden || "vistas_desc"}
        onChange={(e) => actualizarFiltro("orden", e.target.value)}
        className={styles.select}
      >
        <option value="vistas_desc">Más vistos</option>
        <option value="vistas_asc">Menos vistos</option>
        <option value="fecha_desc">Más recientes</option>
        <option value="fecha_asc">Más antiguos</option>
      </select>
    </fieldset>
  );

  const renderFiltrosUsuarios = () => (
    <fieldset className={styles.filtrosGrupo} aria-labelledby="titulo-filtros-usuarios">
      <legend id="titulo-filtros-usuarios" className={styles.subtitulo}><FaFilter /> Filtros de Usuarios</legend>

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
      <select
        id="filtro-software"
        multiple
        className={styles.selectMultiple}
        value={filtrosLocales.software || []}
        onChange={(e) => {
          const opciones = Array.from(e.target.selectedOptions).map(o => o.value);
          actualizarFiltro("software", opciones);
        }}
      >
        {["Blender", "Photoshop", "Figma", "Maya", "Unity", "Unreal"].map(sw => (
          <option key={sw} value={sw}>{sw}</option>
        ))}
      </select>

      <label htmlFor="filtro-cargo" className={styles.label}>Cargo</label>
      <select
        id="filtro-cargo"
        className={styles.select}
        value={filtrosLocales.cargo || ""}
        onChange={(e) => actualizarFiltro("cargo", e.target.value)}
      >
        <option value="" disabled hidden>Selecciona un cargo</option>
        <option value="Diseñador Gráfico">Diseñador Gráfico</option>
        <option value="Modelador 3D">Modelador 3D</option>
        <option value="Programador">Programador</option>
      </select>
    </fieldset>
  );

  const renderFiltrosCategorias = () => (
    <fieldset className={styles.filtrosGrupo} aria-labelledby="titulo-filtros-categorias">
      <legend id="titulo-filtros-categorias" className={styles.subtitulo}><FaFilter /> Filtros de Categorías</legend>

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
      <h3 id="titulo-panel-filtros" className={styles.panelTitle}><FaFilter /> Filtros Avanzados</h3>

      {tipo === "Assets" && renderFiltrosAssets()}
      {tipo === "Usuarios" && renderFiltrosUsuarios()}
      {tipo === "Categorías" && renderFiltrosCategorias()}

      <div className={styles.footer}>
        <button onClick={resetFiltros} className={styles.resetButton}>Limpiar filtros</button>
      </div>
    </section>
  );
};

export default FiltrosAvanzados;
