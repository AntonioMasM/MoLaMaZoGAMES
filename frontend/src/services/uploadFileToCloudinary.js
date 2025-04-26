// services/uploadFileToCloudinary.js
const uploadFileToCloudinary = async (file) => {
    const cloudName = "dqh9ubdgg";
    const uploadPreset = "default_preset";
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
  
    // Detectar tipo MIME
    const mimeType = file.type;
    let resourceType = "auto"; // auto por defecto
  
    if (mimeType.startsWith("image/")) resourceType = "image";
    else if (mimeType.startsWith("video/")) resourceType = "video";
    else resourceType = "raw"; // Para otros: zip, json, obj, fbx, etc.
  
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`Error al subir archivo a Cloudinary`);
      }
  
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
  
  export default uploadFileToCloudinary;
  