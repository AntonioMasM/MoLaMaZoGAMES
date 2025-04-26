// src/features/auth/useAuth.js
import { useContext } from "react";
import { AuthContext } from "./AuthContext"; // ✅ actualizar la ruta

export function useAuth() {
  return useContext(AuthContext);
}
