import { useState } from "react";
import "../styles/NewAsset.css";

const DROPBOX_ACCESS_TOKEN = "sl.u.AFr4DfKh55IK3-J3JJ1hpQWzbkM5eLpZEnjMFK8GLX-AGUlBwRYbsgBOq66vaAYdfoIsCfUQGav2-aAM_pJ7oZ7Er87Br2ixOyhdL6xo2apI-SsvKQ3fvMkloYkcNuO8f8NhBqWc4t6jedu2E2nvqmRozx5adJ2QOsN5JOkgcdW9a6Gz6NLLk7qFljhhxjGrHhpogLfa9hLTQiAQZFG0eMKgDX2R3uV8MhHzhLBjjY-MSv802Kh3sWAG3J91TWk-WIcHsohRD_wpZiJBjHHFItl6p6r3aRbLJleHx9WoMFhg33Lj8gIzjI5d-ehNU_RbnpbPMLF-03wOBShDKPlac6-sGBdu1axoMFRIr6-L9aMbmoo1N4O3sJkQTnXjyLU96B6YKrcXKLye1Q9TSm2xEqqZ7n93EDx4u3dkJw8q2ivKZaOfuzmNTSW97Blteqi-W9u2JpXAWOyadUi3LL1gQasIcTHTBLoTRC1SW0oCH9atunuRvsXp16WKNMAGhgqyGtxnvJsm2-eGaIy0TQz5JndiBUunvN_dvPCdIyDTd-Lz_pAGn3Q7WmHxMRjj5Z7nTa6BJMgyHWtykVFW5S6yfC0a0RR9h6QzJkh_WEQ1LE_fbz3QWEPny__NIicekybPTjA21L3emhsWqCSMZjkV9OQpET546VkZbJldBqzdJxl9JneqZQC53UWp8Z_dDv4R63meQCU2Ckwf0ACETENQjuJiL3LpJUCxB2-kgeLJKmc3mTcDp6r9Lxy2gxzGGrt-Q-wgWPqUOSfrkcC-Uyw7tKRP2GBFTxRG0sB4DIlmz8wQBcRfC_GBfea7vEJw0XTck1GEi342gAtickBgk1nq-UsF39sDvMkUmIpDRfW7jpc--fsrB3L_ZmVqdH5TLIGB9VosX93kGGXeDC12zyJPKBA16m-RzN6qlkTn-UH20bnP1l0mOjHv0xKXUXqVegdwib6k3izorOYlVEUb8IKO-oqCOYTHw4C5XacX_1KDidicJtKzls91_IU3pJREqMfngp6SzwlAU6zxj2iz_jy4sO6sSG9V4kGiCiqlNn8AN_6AB7tS5RXGQFXC-LfUYyZts5gzHm2Mseg9Z8tYFmj3SAE8f-AhzdTJnaPhbN0_2Zua_RJUh7hR-qOitV-yusDhLswqDu68JcRxBrlkKzqhWUF9FbKXS-UkLLhwnxblo9OOo0d3ppYKHthcPsWY-po0PG9iYKXRvUBNDI52XGTr3dZt-EY1ZK6OWCuprvdAXZ0SoJ0YXZGmzWO21QwEMtyS6oyvbASqSEFfc43jiML8bO0eRBGe0GJX2QS8yyiSvzxhD50RBGerv1ADpcbOPhcAJpmAgWW9M218hizeoEKFPOWJzCrn3rdqfXQsiKJMjjYEK7OtQureKyYaYOfDAmoI2OPCnrDkJ_Ns_YzbS_X-lQ4J1PPre6mjJ5jxkrXcpFfrA8IxH4afPR4r8lo-H2KxqoQ";

const NewAsset = () => {
    const [formData, setFormData] = useState({
        titulo: "",
        descripcion: "",
        autor: "",
        imagenPrincipal: null,
        galeriaMultimedia: [],
        formatos: [], // 🔴 Ahora es un array de objetos
        categorias: "",
        usuarioCreador: "",
    });
  
    const [mensaje, setMensaje] = useState(null);
    const [error, setError] = useState(null);
  
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleFileChange = (e) => {
      setFormData({ ...formData, imagenPrincipal: e.target.files[0] });
    };
  
    const handleGalleryChange = (e) => {
        const files = Array.from(e.target.files);
        const galleryItems = files.map((file) => ({
            file, // Guardamos el archivo real aquí
            tipo: file.type.startsWith("image") ? "image" : file.type.startsWith("video") ? "video" : "unknown",
            url: null, // Esto se actualizará después de subir el archivo
        }));
        setFormData({ ...formData, galeriaMultimedia: galleryItems });
    };

    const handleFormatosChange = (e, index, field) => {
        const updatedFormatos = [...formData.formatos];
        updatedFormatos[index][field] = e.target.value;
        setFormData({ ...formData, formatos: updatedFormatos });
    };
  
    // Función para subir un archivo a Dropbox
    const uploadToDropbox = async (file, path) => {
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
      
        return new Promise((resolve, reject) => {
          fileReader.onload = async () => {
            try {
              const response = await fetch("https://content.dropboxapi.com/2/files/upload", {
                method: "POST",
                headers: {
                  "Authorization": `Bearer ${DROPBOX_ACCESS_TOKEN}`,
                  "Dropbox-API-Arg": JSON.stringify({
                    path: path,
                    mode: "add",
                    autorename: true,
                    mute: false,
                  }),
                  "Content-Type": "application/octet-stream",
                },
                body: fileReader.result,
              });
      
              const data = await response.json();
      
              if (response.ok) {
                resolve(`https://www.dropbox.com/home${data.path_display}?raw=1`);
              } else {
                reject(data);
              }
            } catch (err) {
              reject(err);
            }
          };
        });
    };
  
    const addFormato = () => {
        setFormData({
            ...formData,
            formatos: [...formData.formatos, { tipo: "", tamaño: "", url: "" }],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const basePath = `/uploads/assets/${formData.usuarioCreador}/`;
    
            // 🟢 Subir imagen principal
            const mainImagePath = `${basePath}main_${Date.now()}.${formData.imagenPrincipal.name.split('.').pop()}`;
            const mainImageUrl = await uploadToDropbox(formData.imagenPrincipal, mainImagePath);
    
            // 🟢 Subir imágenes de la galería
            const updatedGalleryItems = await Promise.all(
                formData.galeriaMultimedia.map(async (item, index) => {
                    const galleryFile = item.file;
                    const extension = galleryFile.name.split('.').pop();
                    const galleryPath = `${basePath}gallery_${index + 1}_${Date.now()}.${extension}`;
                    const url = await uploadToDropbox(galleryFile, galleryPath);
                    return { tipo: item.tipo, url };
                })
            );
    
            // 🟢 Subir archivos de formatos y generar URLs
            const updatedFormatos = await Promise.all(
                formData.formatos.map(async (formato) => {
                    const formatoFile = formato.file;
                    if (!formatoFile) return formato; // Si no hay archivo, mantener los valores actuales
    
                    const extension = formatoFile.name.split('.').pop();
                    const formatoPath = `${basePath}format_${Date.now()}.${extension}`;
                    const url = await uploadToDropbox(formatoFile, formatoPath);
                    return { ...formato, url };
                })
            );
    
            // 🟢 Enviar datos al backend
            const assetData = {
                ...formData,
                imagenPrincipal: mainImageUrl,
                galeriaMultimedia: updatedGalleryItems,
                formatos: updatedFormatos, // ✅ Ahora formatos tiene objetos correctos
            };
    
            const response = await fetch("http://localhost:5000/api/assets", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(assetData),
            });
    
            const data = await response.json();
            if (response.ok) {
                setMensaje("Asset creado con éxito.");
                setError(null);
            } else {
                setError(data.mensaje);
            }
        } catch (err) {
            setError("Error al subir los archivos.");
        }
    };
    
  
    return (
      <div>
        <h2>Crear Nuevo Asset</h2>
        {mensaje && <p style={{ color: "green" }}>{mensaje}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input type="text" name="titulo" placeholder="Título" onChange={handleChange} required />
          <textarea name="descripcion" placeholder="Descripción" onChange={handleChange} required />
          <input type="text" name="autor" placeholder="Autor" onChange={handleChange} required />
          
<h3>Formatos</h3>
{formData.formatos.map((formato, index) => (
    <div key={index}>
        <input
            type="text"
            placeholder="Tipo (ej: PNG, JPG, MP4)"
            value={formato.tipo}
            onChange={(e) => handleFormatosChange(e, index, "tipo")}
            required
        />
        <input
            type="text"
            placeholder="Tamaño (ej: 2MB, 1080p)"
            value={formato.tamaño}
            onChange={(e) => handleFormatosChange(e, index, "tamaño")}
            required
        />
        <button type="button" onClick={addFormato}>Agregar Formato</button>
    </div>
))}

          
          <input type="text" name="categorias" placeholder="Categorías" onChange={handleChange} required />
          <input type="text" name="usuarioCreador" placeholder="ID del usuario" onChange={handleChange} value={formData.usuarioCreador} required />
  
          <label>Imagen Principal:</label>
          <input type="file" name="imagenPrincipal" onChange={handleFileChange} accept="image/*" required />
  
          <label>Galería Multimedia:</label>
          <input type="file" name="galeriaMultimedia" multiple onChange={handleGalleryChange} accept="image/*,video/*" />
  
          <button type="submit">Subir Asset</button>
        </form>
      </div>
    );
};

export default NewAsset;
