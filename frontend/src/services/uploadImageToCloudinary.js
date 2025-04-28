// services/uploadImageToCloudinary.js

const uploadImageToCloudinary = async (file) => {
  const cloudName = "dqh9ubdgg";
  const uploadPreset = "default_preset";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Error al subir imagen a Cloudinary");
    }

    const data = await response.json();

    return {
      secure_url: data.secure_url,      // 📷 URL segura de la imagen subida
      public_id: data.public_id  // 📦 ID necesario para poder borrar después
    };
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
};

export default uploadImageToCloudinary;
