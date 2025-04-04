import { useState } from "react";
import "../styles/NewAsset.css";

const DROPBOX_ACCESS_TOKEN = "sl.u.AFp1AIDGsr5jK9IFHF-I6fFiVhGTBtqNwftvEv7sijSB4Rk-L9add0pJIvD2SXQWDG1-cGFdpHFTIS3sSdL23zdlKv8OusrMKO1INXKGglfz3zBMI9aa17VfVmlBacG_1XnWhSxmNpt5DD69XYnQdhSi6zyhnERFnxBN-Q-6MHDGuKCPUhJKaeVcR7hcL6aEp_IAtv49eJXKHp_H8fZXMwftgRhKAoC7n3Y-6WvYo7amnajUD9de2xS_z4HT030krw1fRcGkZy7Xg3ysJT4gMpxSoaA3nH4IsezQavcdatfieY5AQDrbwWSCzz3qhS6Os9gpyACxA6KZ3HJYnfB47Iij2tkQLQijCMXvt8autLDaiWP1LPIYNDSOoNb0oNo-BoZVNfrYQZmnqvOLE2cUA3LSupEoNrfB-7NYt4xsg3S5TNsT8xAQ3R1zz2Ojz1chMu14CEavg7MX96ATinyo4EFV__wYAUB_9kwvsLqs19W_wjTfX64lr4j03IR3TupxwKUwdXfeDu4k_ln4dxpHYIrnqTEjcvASiYKrByq5WhkpHIu1--EsHg47U8Fcy5uWpWc_JyM99msZzjeCOha4Q48inxmWBj0MCg16qZaT_RHZWr6rT-U6VRMdowP2JRoeHIr8pQUBgN2xh_CXZVT4ZyQN2K6mTlTqpAq1M9RjhC3j9v-6zn6uc-Avozh8vRHC9amELcxdCog5J0YG81Os90uDjjCEzhgAje6oeajwmow2yz-u8j8Qc_BkgMNIu9R-iJ63Lv1eWebsnTKgTIWWrQOFe_EOsoUh6LNYuQdNioPCsx9eXBDtCphQWK2q9wJreo5jYg_h2o4hyaAGaZ5rDr7K51qjNNuNKUObR49DSahsBzHjoYt-LfnNgST_fEo3-UXuxlrfgfHufnhqPPF3XQI0rM9_DcEUJnrc-_G12h2VAipTf-xk1mX-KmcSDZT6ZC0yqaE4X_ZtxDANLs1KLgt9Y4Rdirx82vWrVEYESwZjvYci0WmOPAX3vkGbxzqcjKIwzphoM_k5h321MogOehW1laiY0os0MlqrDgR4k2QR4VWCEHsz73h5wPRmVCGpZT7ugPir5gXvhIYdwEfD47KsEbX7P6SruUmnC23soos1B_lub30692Omq6DkNaGCUzVLE5F2KH1cA22nbcAcFHvOHaROiQgIlAGsYrdmnXqzwippyE-1CqvN5c66gObDEH2J2wajh1SHMt8GWG8AOgX-38Vua7OutK3FCV7QzBtFz-zoGxVpXC5Rz-Z4qoR5q7kvgGUAdYKW0JqhxWqtip2hgdwLV9pUQ2q8joP1Xk31TqYuX0dFsl0fHG2LcRDJ5JiMThMbX6TstHXuxK70K7yEAtEP2v2ND5_2SIDAHZx9vv9mQwsufBf744eacYem8tDc8h0a44XZ5pOyJeMvPdf-qj8nsC36znqnny0_OVwLcO9O_asHrRQVzL86zbiCVqk";

const NewAsset = () => {
    const [formData, setFormData] = useState({
      titulo: "",
      descripcion: "",
      autor: "",
      imagenPrincipal: null,
      galeriaMultimedia: [],
      formatos: [],
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
      const galleryItems = files.map((file) => {
        const fileType = file.type.startsWith("image") ? "image" : file.type.startsWith("video") ? "video" : "unknown";
        return {
          tipo: fileType,
          url: null, // Esto se actualizará después de cargar el archivo a Dropbox
        };
      });
      setFormData({ ...formData, galeriaMultimedia: galleryItems });
    };

    const handleFormatosChange = (e) => {
      const newFormats = e.target.value.split(",").map(format => format.trim());
      setFormData({ ...formData, formatos: newFormats });
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
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const basePath = `/uploads/assets/${formData.usuarioCreador}/`;
  
        // Subir imagen principal
        const mainImagePath = `${basePath}main_${Date.now()}.${formData.imagenPrincipal.name.split('.').pop()}`;
        const mainImageUrl = await uploadToDropbox(formData.imagenPrincipal, mainImagePath);
  
        // Subir imágenes de la galería
        const updatedGalleryItems = await Promise.all(
          formData.galeriaMultimedia.map(async (item, index) => {
            const galleryFile = formData.galeriaMultimedia[index];
            const galleryPath = `${basePath}gallery_${index + 1}_${Date.now()}.${galleryFile.tipo}`;
            const url = await uploadToDropbox(galleryFile, galleryPath);
            return { ...item, url };  // Aquí asignamos la URL después de subir el archivo
          })
        );
  
        // Actualizar las URLs de la galería en el formulario
        const assetData = {
          ...formData,
          imagenPrincipal: mainImageUrl,
          galeriaMultimedia: updatedGalleryItems,
        };
  
        const response = await fetch("http://localhost:5000/api/assets", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
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
        setError("Error al subir las imágenes a Dropbox.");
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
          
          <input
            type="text"
            name="formatos"
            placeholder="Formatos (ej: PNG, JPG, MP4)"
            onChange={handleFormatosChange}
            value={formData.formatos.join(", ")} // Mostrar formatos como texto
            required
          />
          
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
