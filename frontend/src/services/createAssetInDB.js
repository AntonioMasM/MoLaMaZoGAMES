// services/assetService.js

export const createAssetInDB = async (assetData) => {
    try {
      const response = await fetch("/api/assets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(assetData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al crear el Asset en el servidor");
      }
  
      const data = await response.json();
      return data; // 🔥 Devuelve el Asset creado
    } catch (error) {
      console.error("Error creando el Asset:", error);
      throw error;
    }
  };
  