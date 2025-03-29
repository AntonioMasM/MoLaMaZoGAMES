import React, { createContext, useState, useEffect, useContext } from "react";

// Crear el contexto
const UserContext = createContext();

// Hook personalizado para consumir el contexto fácilmente
export const useUser = () => useContext(UserContext);

// Componente proveedor del contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado del usuario
  const [token, setToken] = useState(null); // Token de autenticación

  // Cargar datos del usuario desde localStorage al montar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  // Función para iniciar sesión
  const login = ({ userData, token }) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
    setToken(token);
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ user, token, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
