// services/assetService.js

const API_URL = "http://localhost:5000/api/assets";

export const createAssetInDB = async (assetData) => {
    try {
      const response = await fetch(API_URL, {
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
      return data;
    } catch (error) {
      console.error("Error creando el Asset:", error);
      throw error;
    }
  };
  