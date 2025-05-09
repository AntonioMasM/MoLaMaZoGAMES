// src/components/Category/SidebarFilters.jsx
import styles from "./SidebarFilters.module.css";

const SidebarFilters = ({
  formatoFiltro,
  setFormatoFiltro,
  ordenFiltro,
  setOrdenFiltro,
  busqueda,
  setBusqueda,
}) => {
  return (
    <aside className={styles.sidebar} aria-label="Filtros de búsqueda">
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Buscar</h2>
        <input
          type="text"
          placeholder="Buscar assets..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className={styles.input}
          aria-label="Buscar assets"
        />
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Formato</h2>
        <select
          value={formatoFiltro}
          onChange={(e) => setFormatoFiltro(e.target.value)}
          className={styles.select}
          aria-label="Filtrar por formato"
        >
          <option value="">Todos</option>

        {/* Formatos 3D */}
        <option value="obj">OBJ</option>
        <option value="fbx">FBX</option>
        <option value="stl">STL</option>
        <option value="blend">BLEND</option>
        <option value="gltf">GLTF</option>
        <option value="glb">GLB</option>
        <option value="wrml">WRML</option>

        {/* Formatos 2D */}
        <option value="png">PNG</option>
        <option value="jpg">JPG</option>
        <option value="jpeg">JPEG</option>
        <option value="svg">SVG</option>
        <option value="webp">WEBP</option>
        <option value="gif">GIF</option>

        {/* Formatos Audio */}
        <option value="mp3">MP3</option>
        <option value="wav">WAV</option>
        <option value="aac">AAC</option>
        <option value="ogg">OGG</option>

        {/* Formatos Video */}
        <option value="mp4">MP4</option>
        <option value="webm">WEBM</option>
        <option value="avi">AVI</option>
        <option value="mov">MOV</option>

        {/* Formatos Código */}
        <option value="txt">TXT</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="js">JS</option>
        <option value="json">JSON</option>

        {/* Otros */}
        <option value="zip">ZIP</option>
        <option value="rar">RAR</option>
        <option value="7z">7Z</option>
        <option value="bin">BIN</option>

        </select>
      </div>

      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Ordenar por</h2>
        <select
          value={ordenFiltro}
          onChange={(e) => setOrdenFiltro(e.target.value)}
          className={styles.select}
          aria-label="Ordenar resultados"
        >
          <option value="reciente">Más reciente</option>
          <option value="descargados">Más descargado</option>
        </select>
      </div>
    </aside>
  );
};

export default SidebarFilters;
