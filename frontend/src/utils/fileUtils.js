// utils/fileUtils.js

// Devuelve el icono adecuado según el nombre del archivo
export const getFileIcon = (filename = "") => {
    const ext = filename.split('.').pop().toLowerCase();
    if (["png", "jpg", "jpeg", "gif", "svg"].includes(ext)) return "🖼️";
    if (["fbx", "obj", "blend", "gltf", "glb"].includes(ext)) return "🌀";
    if (["zip", "rar", "7z"].includes(ext)) return "🗜️";
    if (["pdf", "doc", "docx"].includes(ext)) return "📄";
    if (["mp3", "wav"].includes(ext)) return "🎵";
    if (["mp4", "avi", "mov"].includes(ext)) return "🎬";
    return "📁"; // Default
  };
  
  // Formatea el tamaño del archivo en MB
  export const formatFileSize = (bytes) => {
    const mb = bytes / (1024 * 1024);
    return `${mb.toFixed(2)} MB`;
  };
  
  // Trunca nombres de archivo largos
  export const truncateFileName = (name = "", maxLength = 18) => {
    if (name.length <= maxLength) return name;
    return `${name.slice(0, maxLength - 3)}...`;
  };
  