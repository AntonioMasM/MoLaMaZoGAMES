const cloudName = "dqh9ubdgg";
const uploadPreset = "default_preset";

/* 📷 Subir imagen */
export const uploadImage = async (file) => {
  if (!file) throw new Error("No se proporcionó ningún archivo");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Error al subir imagen");

    const data = await response.json();
    return {
      secure_url: data.secure_url,
      public_id: data.public_id,
    };
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};

/* 📦 Subir cualquier archivo (image, video, raw) */
export const uploadFile = async (file) => {
  if (!file) throw new Error("No se proporcionó archivo");

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  const mimeType = file.type;
  const resourceType = mimeType.startsWith("image/")
    ? "image"
    : mimeType.startsWith("video/")
    ? "video"
    : "raw";

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) throw new Error("Error al subir archivo");

    const data = await response.json();
    return {
      secure_url: data.secure_url,
      format: data.format,
      resource_type: data.resource_type,
      public_id: data.public_id,
      bytes: data.bytes,
      original_filename: data.original_filename,
    };
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};

/* 🗑️ Eliminar archivo de Cloudinary desde tu API */
export const deleteFile = async (publicId) => {
const BASE_URL = import.meta.env.VITE_API_URL;

if (!BASE_URL) {
  throw new Error("⚠️ VITE_API_URL no está definido en el entorno.");
}

const API_URL = `${BASE_URL}/cloudinary/eliminar`;
  try {
    const response = await fetch(`${API_URL}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ public_id: publicId }),
    });

    if (!response.ok) throw new Error("Error al eliminar el archivo de Cloudinary");

    return await response.json();
  } catch (error) {
    console.error("Error al eliminar imagen de Cloudinary:", error);
    throw error;
  }
};
