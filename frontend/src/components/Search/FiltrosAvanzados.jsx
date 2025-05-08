import { useState, useEffect } from "react";
import styles from "./FiltrosAvanzados.module.css";
import { getCategorias } from "@/services/categorias";

const FiltrosAvanzados = ({ tipo, filtros, onChange }) => {
  const [filtrosLocales, setFiltrosLocales] = useState(filtros);
  const [categoriasDisponibles, setCategoriasDisponibles] = useState([]);

  useEffect(() => {
    setFiltrosLocales(filtros);
  }, [filtros]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await getCategorias();
        setCategoriasDisponibles(res);
      } catch (err) {
        console.error("Error al obtener categorías:", err);
      }
    };

    if (tipo === "Assets" || tipo === "Usuarios") fetchCategorias();
  }, [tipo]);

  const actualizarFiltro = (clave, valor) => {
    const nuevos = { ...filtrosLocales, [clave]: valor };
    setFiltrosLocales(nuevos);
    onChange(nuevos);
  };

  const renderFiltrosAssets = () => (
    <div className={styles.filtrosGrupo}>
      <label className={styles.label}>Categorías</label>
      <select
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

      <fieldset className={styles.fieldset}>
        <legend className={styles.legend}>Formatos</legend>
        {["png", "fbx", "obj", "glb", "mp4"].map((formato) => (
          <label key={formato} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={filtrosLocales.formatos?.includes(formato) || false}
              onChange={(e) => {
                const actual = filtrosLocales.formatos || [];
                const nuevos = e.target.checked
                  ? [...actual, formato]
                  : actual.filter(f => f !== formato);
                actualizarFiltro("formatos", nuevos);
              }}
            />
            {formato.toUpperCase()}
          </label>
        ))}
      </fieldset>

      <label className={styles.switchLabel}>
        <input
          type="checkbox"
          checked={filtrosLocales.disponible || false}
          onChange={(e) => actualizarFiltro("disponible", e.target.checked)}
        />
        Solo disponibles
      </label>

      <label className={styles.label}>Orden</label>
      <select
        value={filtrosLocales.orden || "vistas_desc"}
        onChange={(e) => actualizarFiltro("orden", e.target.value)}
        className={styles.select}
      >
        <option value="vistas_desc">Más vistos</option>
        <option value="vistas_asc">Menos vistos</option>
        <option value="fecha_desc">Más recientes</option>
        <option value="fecha_asc">Más antiguos</option>
      </select>
    </div>
  );

  const renderFiltrosUsuarios = () => (
    <div className={styles.filtrosGrupo}>
      <label className={styles.label}>País</label>
      <input
        type="text"
        className={styles.select}
        value={filtrosLocales.pais || ""}
        onChange={(e) => actualizarFiltro("pais", e.target.value)}
      />

      <label className={styles.label}>Software</label>
      <select
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

      <label className={styles.label}>Cargo</label>
      <select
        className={styles.select}
        value={filtrosLocales.cargo || ""}
        onChange={(e) => actualizarFiltro("cargo", e.target.value)}
      >
        <option value="">Todos</option>
        <option value="Diseñador Gráfico">Diseñador Gráfico</option>
        <option value="Modelador 3D">Modelador 3D</option>
        <option value="Programador">Programador</option>
      </select>
    </div>
  );

  const renderFiltrosCategorias = () => (
    <div className={styles.filtrosGrupo}>
      <label className={styles.label}>Nombre contiene</label>
      <input
        type="text"
        className={styles.select}
        value={filtrosLocales.nombre || ""}
        onChange={(e) => actualizarFiltro("nombre", e.target.value)}
        placeholder="Ej: 2D, Modelado..."
      />

      <label className={styles.label}>Fecha desde</label>
      <input
        type="date"
        className={styles.select}
        value={filtrosLocales.fechaDesde || ""}
        onChange={(e) => actualizarFiltro("fechaDesde", e.target.value)}
      />

      <label className={styles.label}>Fecha hasta</label>
      <input
        type="date"
        className={styles.select}
        value={filtrosLocales.fechaHasta || ""}
        onChange={(e) => actualizarFiltro("fechaHasta", e.target.value)}
      />
    </div>
  );

  return (
    <section className={styles.panel}>
      <h3 className={styles.panelTitle}>Filtros avanzados</h3>
      {tipo === "Assets" && renderFiltrosAssets()}
      {tipo === "Usuarios" && renderFiltrosUsuarios()}
      {tipo === "Categorías" && renderFiltrosCategorias()}
    </section>
  );
};

export default FiltrosAvanzados;
