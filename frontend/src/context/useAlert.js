import { useContext } from "react";
import { AlertContext } from "./AlertContext"; // Importa el contexto

export const useAlert = () => useContext(AlertContext);
