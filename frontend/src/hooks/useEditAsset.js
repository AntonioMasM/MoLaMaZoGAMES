import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { getAssetById, updateAsset } from "@/services/assets";
import uploadFileToCloudinary from "@/services/uploadFileToCloudinary";
import { getGruposPorUsuario } from "@/services/grupoService";
import { v4 as uuidv4 } from "uuid";

export const useEditAsset = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: sessionUser } = useUser();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState({ mensaje: "", errors: {} });

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    categoriaPrincipal: "",
    otrasCategorias: [],
    licencia: "",
    opciones: {},
    grupo: "",
    formatos: [],
    imagenPrincipal: null,
  });

  const [media, setMedia] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [userGroups, setUserGroups] = useState([]);

  const refs = {
    tituloRef: useRef(null),
    descripcionRef: useRef(null),
    categoriaRef: useRef(null),
    licenciaRef: useRef(null),
    formatosRef: useRef(null),
    imagenRef: useRef(null),
    grupoRef: useRef(null),
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const asset = await getAssetById(id);
        const categorias = asset.categorias || [];
        const principal = categorias[0] || "";

        setFormData({
          titulo: asset.titulo || "",
          descripcion: asset.descripcion || "",
          categoriaPrincipal: principal,
          otrasCategorias: categorias.filter((cat) => cat !== principal),
          licencia: asset.licencia || "",
          opciones: asset.opciones || {},
          grupo: asset.grupo || "",
          formatos: asset.formatos?.map((f) => ({ ...f, id: uuidv4() })) || [],
          imagenPrincipal: asset.imagenPrincipal || null,
        });

        setMedia(
          (asset.galeriaMultimedia || []).map((item) => ({
            file: null,
            preview: item.url,
            tipo: item.tipo,
            public_id: item.public_id,
            isNew: false,
          }))
        );
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar el asset.");
      } finally {
        setLoading(false);
      }
    };

    const fetchUserGroups = async () => {
      try {
        if (!sessionUser?._id) return;
        const grupos = await getGruposPorUsuario(sessionUser._id);
        setUserGroups(grupos);
      } catch (err) {
        console.error("Error al cargar grupos del usuario:", err);
      }
    };

    fetchInitialData();
    fetchUserGroups();
  }, [id, sessionUser?._id]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggleOption = (key) => {
    setFormData((prev) => ({
      ...prev,
      opciones: { ...prev.opciones, [key]: !prev.opciones[key] },
    }));
  };

  const handleGroupChange = (e) => {
    setFormData((prev) => ({ ...prev, grupo: e.target.value }));
  };

  const handleAddFormato = (nuevo) => {
    setFormData((prev) => ({
      ...prev,
      formatos: [...prev.formatos, nuevo],
    }));
  };

 const handleFormatoFileChange = (e, id) => {
  const file = e.target.files[0];
  if (!file) return;

  const tipo = file.name.split(".").pop()?.toUpperCase() || "";
  const tamaño = (file.size / (1024 * 1024)).toFixed(2); // tamaño en MB como string

  setFormData((prev) => ({
    ...prev,
    formatos: prev.formatos.map((f) =>
      f.id === id ? { ...f, file, tipo, tamaño } : f
    ),
  }));
};


  const handleFormatoRemove = (id) => {
    setFormData((prev) => ({
      ...prev,
      formatos: prev.formatos.filter((f) => f.id !== id),
    }));
  };

  const handleGalleryChange = (updatedItems) => {
    setMedia(updatedItems);
    setNewFiles(
      updatedItems
        .filter((item) => item.isNew && item.file instanceof File)
        .map((item) => item.file)
    );
  };

  const handleMainImageChange = (file) => {
    setFormData((prev) => ({ ...prev, imagenPrincipal: file }));
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus({ mensaje: "", errors: {} });
    setError(null);

    try {
      const errors = {};
      if (!formData.titulo.trim()) errors.titulo = "El título es obligatorio.";
      if (!formData.descripcion.trim()) errors.descripcion = "La descripción es obligatoria.";
      if (!formData.categoriaPrincipal) errors.categoriaPrincipal = "Selecciona una categoría.";
      if (!formData.licencia) errors.licencia = "Selecciona una licencia.";

      if (Object.keys(errors).length > 0) {
        setStatus({ mensaje: "", errors });
        refs[Object.keys(errors)[0] + "Ref"]?.current?.focus();
        setSaving(false);
        return;
      }

const nuevasImagenes = await Promise.all(
  newFiles.map(async (file) => {
    const subida = await uploadFileToCloudinary(file);
    return {
      url: subida.secure_url,
      public_id: subida.public_id,
      tipo: subida.resource_type || "raw",
    };
  })
);


      const galeriaFinal = [
        ...media
          .filter((item) => !item.isNew)
          .map(({ preview, tipo, public_id }) => ({
            url: preview,
            public_id,
            tipo,
          })),
        ...nuevasImagenes,
      ];

      let imagenPrincipal = formData.imagenPrincipal;
if (imagenPrincipal instanceof File) {
  const subida = await uploadFileToCloudinary(imagenPrincipal);
  imagenPrincipal = {
    url: subida.secure_url,
    public_id: subida.public_id,
  };
}
else if (typeof imagenPrincipal === "string") {
        imagenPrincipal = {
          url: imagenPrincipal,
          public_id: extraerPublicId(imagenPrincipal),
        };
      }

      if (!imagenPrincipal) {
        const primeraImagen = galeriaFinal.find((i) => i.tipo === "image");
        if (primeraImagen) {
          imagenPrincipal = {
            url: primeraImagen.url,
            public_id: primeraImagen.public_id,
          };
        }
      }

      // Subir nuevos archivos de formatos si tienen .file
const formatosProcesados = await Promise.all(
  formData.formatos.map(async (formato) => {
    if (formato.file) {
      const subida = await uploadFileToCloudinary(formato.file);
      return {
        tipo: formato.tipo.toLowerCase(),
        tamaño: parseFloat(formato.tamaño),
        url: subida.secure_url,
        public_id: subida.public_id,
      };
    } else {
      return {
        tipo: formato.tipo?.toLowerCase() || "desconocido",
        tamaño: parseFloat(formato.tamaño) || 0,
        url: formato.url || "",
        public_id: formato.public_id || "",
      };
    }
  })
);


const updatedData = {
  ...formData,
  imagenPrincipal,
  galeriaMultimedia: galeriaFinal,
  formatos: formatosProcesados,
};


      await updateAsset(id, updatedData);
      setStatus({ mensaje: "Cambios guardados correctamente ✅", errors: {} });
      navigate(`/asset/${id}`);
    } catch (err) {
      console.error("Error al guardar el asset:", err);
      setStatus({ error: "No se pudo guardar el asset.", errors: {} });
    } finally {
      setSaving(false);
    }
  };

  const extraerPublicId = (url) => {
    const partes = url.split("/");
    const nombreArchivo = partes[partes.length - 1];
    return nombreArchivo.split(".")[0];
  };
const handleAddFormatoDesdeZone = (file) => {
  if (!file) return;

  const tipo = file.name.split(".").pop()?.toUpperCase() || "";
  const tamaño = (file.size / (1024 * 1024)).toFixed(2); // MB

  const nuevoFormato = {
    id: uuidv4(),
    file,
    tipo,
    tamaño,
    url: "",       // aún no subido
    public_id: "", // aún no subido
  };

  setFormData((prev) => ({
    ...prev,
    formatos: [...prev.formatos, nuevoFormato],
  }));
};

  return {
    loading,
    saving,
    error,
    formData,
    status,
    refs,
    media,
    userGroups,
    handleFormChange,
    handleToggleOption,
    handleGroupChange,
    handleAddFormato,
    handleFormatoFileChange,
    handleFormatoRemove,
    handleGalleryChange,
    handleMainImageChange,
    handleSave,
    handleAddFormatoDesdeZone,
  };
};
