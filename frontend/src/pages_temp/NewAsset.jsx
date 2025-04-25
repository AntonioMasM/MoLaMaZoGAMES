import React, { useState } from "react";
import "../styles/NewAsset.css";

const DROPBOX_ACCESS_TOKEN = "sl.u.AFr4DfKh55IK3-J3JJ1hpQWzbkM5eLpZEnjMFK8GLX-AGUlBwRYbsgBOq66vaAYdfoIsCfUQGav2-aAM_pJ7oZ7Er87Br2ixOyhdL6xo2apI-SsvKQ3fvMkloYkcNuO8f8NhBqWc4t6jedu2E2nvqmRozx5adJ2QOsN5JOkgcdW9a6Gz6NLLk7qFljhhxjGrHhpogLfa9hLTQiAQZFG0eMKgDX2R3uV8MhHzhLBjjY-MSv802Kh3sWAG3J91TWk-WIcHsohRD_wpZiJBjHHFItl6p6r3aRbLJleHx9WoMFhg33Lj8gIzjI5d-ehNU_RbnpbPMLF-03wOBShDKPlac6-sGBdu1axoMFRIr6-L9aMbmoo1N4O3sJkQTnXjyLU96B6YKrcXKLye1Q9TSm2xEqqZ7n93EDx4u3dkJw8q2ivKZaOfuzmNTSW97Blteqi-W9u2JpXAWOyadUi3LL1gQasIcTHTBLoTRC1SW0oCH9atunuRvsXp16WKNMAGhgqyGtxnvJsm2-eGaIy0TQz5JndiBUunvN_dvPCdIyDTd-Lz_pAGn3Q7WmHxMRjj5Z7nTa6BJMgyHWtykVFW5S6yfC0a0RR9h6QzJkh_WEQ1LE_fbz3QWEPny__NIicekybPTjA21L3emhsWqCSMZjkV9OQpET546VkZbJldBqzdJxl9JneqZQC53UWp8Z_dDv4R63meQCU2Ckwf0ACETENQjuJiL3LpJUCxB2-kgeLJKmc3mTcDp6r9Lxy2gxzGGrt-Q-wgWPqUOSfrkcC-Uyw7tKRP2GBFTxRG0sB4DIlmz8wQBcRfC_GBfea7vEJw0XTck1GEi342gAtickBgk1nq-UsF39sDvMkUmIpDRfW7jpc--fsrB3L_ZmVqdH5TLIGB9VosX93kGGXeDC12zyJPKBA16m-RzN6qlkTn-UH20bnP1l0mOjHv0xKXUXqVegdwib6k3izorOYlVEUb8IKO-oqCOYTHw4C5XacX_1KDidicJtKzls91_IU3pJREqMfngp6SzwlAU6zxj2iz_jy4sO6sSG9V4kGiCiqlNn8AN_6AB7tS5RXGQFXC-LfUYyZts5gzHm2Mseg9Z8tYFmj3SAE8f-AhzdTJnaPhbN0_2Zua_RJUh7hR-qOitV-yusDhLswqDu68JcRxBrlkKzqhWUF9FbKXS-UkLLhwnxblo9OOo0d3ppYKHthcPsWY-po0PG9iYKXRvUBNDI52XGTr3dZt-EY1ZK6OWCuprvdAXZ0SoJ0YXZGmzWO21QwEMtyS6oyvbASqSEFfc43jiML8bO0eRBGe0GJX2QS8yyiSvzxhD50RBGerv1ADpcbOPhcAJpmAgWW9M218hizeoEKFPOWJzCrn3rdqfXQsiKJMjjYEK7OtQureKyYaYOfDAmoI2OPCnrDkJ_Ns_YzbS_X-lQ4J1PPre6mjJ5jxkrXcpFfrA8IxH4afPR4r8lo-H2KxqoQ"; // token truncated

const CATEGORIAS_PRINCIPALES = ["2D", "3D", "Animaciones", "UI/UX", "Texturas"];
const LICENCIAS = ["CC0", "CC BY", "CC BY-SA", "Propietaria"];
const OPCIONES = [
  { key: "Mature", label: "Mature" },
  { key: "NoLA", label: "NoLA" },
  { key: "IA", label: "IA" }
];

const NewAsset = () => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    autor: "",
    categoriaPrincipal: "",
    otrasCategorias: [],
    licencia: "",
    opciones: {},
    imagenPrincipal: null,
    vistaPrevia: null,
    galeriaMultimedia: [],
    formatos: [],
    grupo: "",
    usuarioCreador: "",
  });
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const handleInput = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleOpcion = key => {
    setFormData(prev => ({
      ...prev,
      opciones: { ...prev.opciones, [key]: !prev.opciones[key] }
    }));
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      imagenPrincipal: file,
      vistaPrevia: URL.createObjectURL(file)
    }));
  };

  const handleDropzone = e => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({ ...prev, galeriaMultimedia: files }));
  };

  const addFormato = () => {
    setFormData(prev => ({
      ...prev,
      formatos: [...prev.formatos, { tipo: "", tamaño: "", file: null }]
    }));
  };

  const handleFormatoFile = (e, idx) => {
    const file = e.target.files[0];
    setFormData(prev => {
      const formatos = [...prev.formatos];
      formatos[idx].file = file;
      return { ...prev, formatos };
    });
  };

  const handleFormatoField = (e, idx, field) => {
    const value = e.target.value;
    setFormData(prev => {
      const formatos = [...prev.formatos];
      formatos[idx][field] = value;
      return { ...prev, formatos };
    });
  };

  const uploadToDropbox = (file, path) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(file);
    return new Promise((resolve, reject) => {
      reader.onload = async () => {
        try {
          const res = await fetch("https://content.dropboxapi.com/2/files/upload", {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${DROPBOX_ACCESS_TOKEN}`,
              "Dropbox-API-Arg": JSON.stringify({ path, mode: "add", autorename: true, mute: false }),
              "Content-Type": "application/octet-stream"
            },
            body: reader.result
          });
          const data = await res.json();
          if (res.ok) {
            resolve(`https://www.dropbox.com/home${data.path_display}?raw=1`);
          } else reject(data);
        } catch (err) {
          reject(err);
        }
      };
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const basePath = `/uploads/assets/${formData.usuarioCreador}/`;
      // subida imagen principal
      const ext = formData.imagenPrincipal.name.split('.').pop();
      const mainPath = `${basePath}main_${Date.now()}.${ext}`;
      const mainUrl = await uploadToDropbox(formData.imagenPrincipal, mainPath);
      // galería
      const gallery = await Promise.all(
        formData.galeriaMultimedia.map((file, i) => {
          const ex = file.name.split('.').pop();
          const p = `${basePath}gallery_${i+1}_${Date.now()}.${ex}`;
          return uploadToDropbox(file, p);
        })
      );
      // formatos
      const formatosUrls = await Promise.all(
        formData.formatos.map((fmt) => {
          if (!fmt.file) return { ...fmt, url: "" };
          const ex = fmt.file.name.split('.').pop();
          const p = `${basePath}format_${Date.now()}.${ex}`;
          return uploadToDropbox(fmt.file, p).then(url => ({ ...fmt, url }));
        })
      );
      // envío backend
      const payload = { ...formData,
        imagenPrincipal: mainUrl,
        galeriaMultimedia: gallery,
        formatos: formatosUrls
      };
      const res2 = await fetch("http://localhost:5000/api/assets",{
        method: "POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify(payload)
      });
      const d2 = await res2.json();
      if(res2.ok) setMensaje("Asset creado con éxito."); else setError(d2.mensaje||"Error servidor");
    } catch(err) {
      setError("Error al subir archivos.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="new-asset-page">
      {mensaje && <p className="msg success">{mensaje}</p>}
      {error && <p className="msg error">{error}</p>}
      <section className="new-asset-form">
        <label>Título*</label>
        <input name="titulo" onChange={handleInput} required />
        <label>Descripción*</label>
        <textarea name="descripcion" onChange={handleInput} required />
        <label>Autor*</label>
        <input name="autor" onChange={handleInput} required />
        <label>Categoría Principal*</label>
        <select name="categoriaPrincipal" onChange={handleInput} required>
          <option value="">Elige categoría</option>
          {CATEGORIAS_PRINCIPALES.map(c=> <option key={c}>{c}</option>)}
        </select>
        <label>Otras Categorías</label>
        <div className="tags-input">
          {formData.otrasCategorias.map((t,i)=><span key={i} className="tag">{t}</span>)}
          <input onKeyDown={e=>{if(e.key==='Enter'){e.preventDefault();const v=e.target.value.trim();if(v&&!formData.otrasCategorias.includes(v)){setFormData(p=>({...p,otrasCategorias:[...p.otrasCategorias,v]})); e.target.value='';}}}} placeholder="Añade tus tags aquí" />
        </div>
        <label>Licencia*</label>
        <select name="licencia" onChange={handleInput} required>
          <option value="">Licencia a usar</option>
          {LICENCIAS.map(l=><option key={l}>{l}</option>)}
        </select>
        <label>Opciones*</label>
        <div className="options-list">
          {OPCIONES.map(o=><button type="button" key={o.key} className={formData.opciones[o.key]?'opt active':'opt'} onClick={()=>toggleOpcion(o.key)}>{o.label}</button>)}
        </div>
        <label>Vista Previa*</label>
        <div className="preview-box">
          {formData.vistaPrevia?<img src={formData.vistaPrevia}/>:<span>Debes subir mínimo una imagen...</span>}
        </div>
      </section>
      <section className="upload-dropzone">
        <label htmlFor="imagenPrincipal" className="drop-icon">Subir archivo</label>
        <input id="imagenPrincipal" type="file" accept="*/*" onChange={handleFileChange} required />
        <ul className="valid-list">
          <li>Imágenes 2D: PNG, SVG, JPG</li>
          <li>Archivos 3D: FBX, OBJ, BLEND</li>
          <li>Cualquier formato de Audio</li>
          <li>Cualquier formato de Video</li>
          <li>Cualquier formato de Código</li>
        </ul>
        <label htmlFor="galeriaMultimedia" className="drop-icon small">Sube las imágenes aquí</label>
        <input id="galeriaMultimedia" type="file" multiple accept="image/*,video/*" onChange={handleDropzone} />
      </section>
      <section className="uploaded-files">
        {formData.galeriaMultimedia.map((f,i)=><div key={i} className="file-item">{f.name}</div>)}
        <label>Añadir Asset a Grupo</label>
        <select name="grupo" onChange={handleInput}><option>Elige el Grupo</option></select>
      </section>
      <button type="submit" className="publish-button">Publicar</button>
    </form>
  );
};

export default NewAsset;