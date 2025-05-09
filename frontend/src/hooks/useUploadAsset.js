import { useState, useCallback, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import uploadFileToCloudinary from "../services/uploadFileToCloudinary";
import { createAsset } from "@/services/assets";
import { useUser } from "../context/UserContext";
import { agregarAssetAlGrupo } from "../services/grupoService";

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

  const { user } = useUser();

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

  // ✅ Añadir nuevo formato con ID
  const handleAddFormato = useCallback(() => {
    const nuevoFormato = {
      id: uuidv4(),
      file: null,
      tipo: "",
      tamaño: "",
    };
    setFormData((prev) => ({
      ...prev,
      formatos: [...prev.formatos, nuevoFormato],
    }));
  }, []);

  // ✅ Cambiar archivo de un formato por ID
  const handleFormatoFileChange = useCallback((e, id) => {
    const file = e.target.files[0];
    if (!file) return;

    const tipo = file.name.split(".").pop().toUpperCase();
    const tamaño = (file.size / (1024 * 1024)).toFixed(2);

    setFormData((prev) => ({
      ...prev,
      formatos: prev.formatos.map((f) =>
        f.id === id ? { ...f, file, tipo, tamaño } : f
      ),
    }));
  }, []);

  // ✅ Eliminar formato por ID
  const handleFormatoRemove = useCallback((id) => {
    setFormData((prev) => ({
      ...prev,
      formatos: prev.formatos.filter((f) => f.id !== id),
    }));
  }, []);

  const handleFileDrop = useCallback((file) => {
    const tipo = file.name.split(".").pop().toUpperCase();
    const tamaño = (file.size / (1024 * 1024)).toFixed(2);

    const nuevoFormato = {
      id: uuidv4(),
      file,
      tipo,
      tamaño,
    };

    setFormData((prev) => ({
      ...prev,
      imagenPrincipal: file,
      formatos: [...prev.formatos, nuevoFormato],
    }));
  }, []);

  const handleGalleryChange = useCallback((files) => {
    setFormData((prev) => ({ ...prev, galeriaMultimedia: files }));
  }, []);

  const handleGroupChange = useCallback((e) => {
    setFormData((prev) => ({ ...prev, grupo: e.target.value }));
  }, []);

  const handleSubmitAsset = useCallback(async (e) => {
    e.preventDefault();
    setStatus({ mensaje: "", error: "", loading: true });
    setErrors({});

    try {
      const imagenPrincipalSubida = await uploadFileToCloudinary(formData.imagenPrincipal);

      const galeriaSubida = await Promise.all(
        formData.galeriaMultimedia.map((file) => uploadFileToCloudinary(file))
      );

      const formatosSubidos = await Promise.all(
        formData.formatos.map(async (formato) => {
          if (!formato.file) return null;

          if (formato.file === formData.imagenPrincipal) {
            return {
              secure_url: imagenPrincipalSubida.secure_url,
              public_id: imagenPrincipalSubida.public_id,
              resource_type: imagenPrincipalSubida.resource_type,
            };
          }

          return await uploadFileToCloudinary(formato.file);
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
        galeriaMultimedia: galeriaSubida.map((file) => ({
          tipo: file.resource_type,
          url: file.secure_url,
          public_id: file.public_id,
        })),
        formatos: formatosSubidos
          .map((file, idx) => {
            if (!file) return null;
            const original = formData.formatos[idx];
            return {
              tipo: original.tipo.toLowerCase(),
              tamaño: parseFloat(original.tamaño),
              url: file.secure_url,
              public_id: file.public_id,
            };
          })
          .filter(Boolean),
        categorias: [
          formData.categoriaPrincipal,
          ...formData.otrasCategorias,
        ],
        usuarioCreador: user._id,
      };

      const assetCreado = await createAsset(nuevoAsset);

      if (formData.grupo) {
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
  }, [formData, scrollToTop, user]);

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
    handleSubmitAsset,
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
