import { useState, useCallback, useRef } from "react";
import uploadFileToCloudinary from "../services/uploadFileToCloudinary"; // ⚡ servicio Cloudinary
import { createAssetInDB } from "../services/assetService"; // ⚡ servicio API backend
import { useUser  } from "../context/UserContext"; // ⚡ para obtener usuario logueado (ajusta a tu proyecto)
import { agregarAssetAlGrupo } from "../services/grupoService"; 

// 🎯 Estado inicial limpio
const initialFormData = {
  titulo: "",
  descripcion: "",
  categoriaPrincipal: "",
  licencia: "",
  otrasCategorias: [],
  opciones: {},
  imagenPrincipal: null,
  galeriaMultimedia: [],
  formatos: [],
  grupo: "",
};

export function useUploadAsset() {
  const [formData, setFormData] = useState(initialFormData);
  const [status, setStatus] = useState({ mensaje: "", error: "", loading: false });
  const [errors, setErrors] = useState({});

  const { user } = useUser (); // ⚡ tu contexto de autenticación real

  // 🎯 Refs para focus en errores
  const tituloRef = useRef(null);
  const descripcionRef = useRef(null);
  const categoriaRef = useRef(null);
  const licenciaRef = useRef(null);
  const imagenRef = useRef(null);
  const formatosRef = useRef(null);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const focusOnError = useCallback((campo) => {
    const refs = {
      titulo: tituloRef,
      descripcion: descripcionRef,
      categoriaPrincipal: categoriaRef,
      licencia: licenciaRef,
      imagenPrincipal: imagenRef,
      formatos: formatosRef,
    };
    refs[campo]?.current?.focus();
  }, []);

  // 🎯 Handlers memoizados
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleToggleOption = useCallback((key) => {
    setFormData((prev) => ({
      ...prev,
      opciones: { ...prev.opciones, [key]: !prev.opciones[key] },
    }));
  }, []);

  const handleAddFormato = useCallback(() => {
    setFormData((prev) => ({
      ...prev,
      formatos: [...prev.formatos, { file: null, tipo: "", tamaño: "" }],
    }));
  }, []);

  const handleFormatoFileChange = useCallback((e, idx) => {
    const file = e.target.files[0];
    if (file) {
      const extension = file.name.split('.').pop().toUpperCase();
      const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);

      const updatedFormatos = [...formData.formatos];
      updatedFormatos[idx] = { file, tipo: extension, tamaño: sizeInMB };

      setFormData((prev) => ({ ...prev, formatos: updatedFormatos }));
    }
  }, [formData.formatos]);

  const handleFormatoRemove = useCallback((idx) => {
    setFormData((prev) => {
      const updated = [...prev.formatos];
      updated.splice(idx, 1);
      return { ...prev, formatos: updated };
    });
  }, []);

  const handleFileDrop = useCallback((file) => {
    const extension = file.name.split('.').pop().toUpperCase();
    const sizeInMB = (file.size / (1024 * 1024)).toFixed(2);
  
    setFormData((prev) => ({
      ...prev,
      imagenPrincipal: file,
      formatos: [
        ...prev.formatos,
        {
          file,
          tipo: extension,
          tamaño: sizeInMB
        }
      ]
    }));
  }, []);
  

  const handleGalleryChange = useCallback((files) => {
    setFormData((prev) => ({ ...prev, galeriaMultimedia: files }));
  }, []);

  const handleGroupChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, grupo: e.target.value }));
  }, []);

  // 🎯 Submit real
  const handleSubmitAsset = useCallback(async (e) => {
    e.preventDefault();
    setStatus({ mensaje: "", error: "", loading: false });
    setErrors({});
  
    try {
      setStatus({ mensaje: "Subiendo asset...", error: "", loading: true });
  
      const imagenPrincipalSubida = await uploadFileToCloudinary(formData.imagenPrincipal);
  
      const galeriaSubida = await Promise.all(
        formData.galeriaMultimedia.map(file => uploadFileToCloudinary(file))
      );
  
      const formatosSubidos = await Promise.all(
        formData.formatos.map(async (formatoObj) => {
          if (!formatoObj.file) return null;
          if (formatoObj.file === formData.imagenPrincipal) {
            return {
              secure_url: imagenPrincipalSubida.secure_url,
              public_id: imagenPrincipalSubida.public_id,
              resource_type: imagenPrincipalSubida.resource_type
            };
          }
          return await uploadFileToCloudinary(formatoObj.file);
        })
      );
  
      const nuevoAsset = {
        titulo: formData.titulo,
        descripcion: formData.descripcion,
        autor: user.nickname,
        imagenPrincipal: {
          url: imagenPrincipalSubida.secure_url,
          public_id: imagenPrincipalSubida.public_id,
        },
        galeriaMultimedia: galeriaSubida.map(file => ({
          tipo: file.resource_type,
          url: file.secure_url,
          public_id: file.public_id
        })),
        formatos: formatosSubidos
          .filter(Boolean)
          .map((file, idx) => ({
            tipo: formData.formatos[idx].tipo.toLowerCase(),
            tamaño: parseFloat(formData.formatos[idx].tamaño),
            url: file.secure_url,
            public_id: file.public_id
          })),
        categorias: [
          formData.categoriaPrincipal,
          ...formData.otrasCategorias
        ],
        usuarioCreador: user._id,
      };
  
      console.log("🚀 Enviando datos del asset:", nuevoAsset);
  
      // 🔥 Guardamos el asset en la base de datos y capturamos la respuesta
      const assetCreado = await createAssetInDB(nuevoAsset);
  
      // 🔥 Si el usuario seleccionó un grupo, agregar el asset al grupo
      if (formData.grupo) {
        console.log("📦 formData.grupo:", formData.grupo);
        console.log("📦 assetCreado:", assetCreado); // queremos ver si tiene _id
        console.log("📦 assetCreado._id:", assetCreado?._id);

        await agregarAssetAlGrupo(formData.grupo, assetCreado._id);
      }
  
      setStatus({ mensaje: "Asset subido correctamente 🎉", error: "", loading: false });
      setFormData(initialFormData);
      scrollToTop();
  
    } catch (err) {
      console.error(err);
      setStatus({ mensaje: "", error: "Error al subir el asset ❌", loading: false });
      scrollToTop();
    }
  }, [formData, scrollToTop, focusOnError, user]);
  
  

  return {
    formData,
    status,
    errors,
    handleInputChange,
    handleToggleOption,
    handleAddFormato,
    handleFormatoFileChange,
    handleFormatoRemove,
    handleFileDrop,
    handleGalleryChange,
    handleGroupChange,
    handleSubmitAsset, // 🔥 actualizado
    refs: {
      tituloRef,
      descripcionRef,
      categoriaRef,
      licenciaRef,
      imagenRef,
      formatosRef,
    },
  };
}
