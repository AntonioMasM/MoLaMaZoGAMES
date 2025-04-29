import React, { createContext, useState, useEffect, useContext } from "react";
import { getUsuarioPorEmail } from "../services/userService";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser);
      setToken(storedToken);

      getUsuarioPorEmail(parsedUser.email)
        .then((fullUser) => {
          if (!fullUser._id) {
            console.warn("⚠️ Usuario cargado sin _id:", fullUser);
          }
          setUser(fullUser);
          localStorage.setItem("user", JSON.stringify(fullUser));
        })
        .catch((err) => {
          console.error("❌ Error al obtener el usuario completo:", err);
          // Fallback si no se puede recargar desde la API
          if (parsedUser._id || parsedUser.id) {
            setUser({
              ...parsedUser,
              _id: parsedUser._id || parsedUser.id,
            });
          } else {
            setUser(null);
          }
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = ({ userData, token }) => {
    const normalizedUser = {
      ...userData,
      _id: userData._id || userData.id, // Normalizar para siempre tener _id
    };

    localStorage.setItem("user", JSON.stringify(normalizedUser));
    localStorage.setItem("token", token);
    setUser(normalizedUser);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  const updateUser = (updatedData) => {
    const updatedUser = {
      ...user,
      ...updatedData,
    };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
  };

  return (
    <UserContext.Provider
      value={{ user, token, login, logout, updateUser, loading }}
    >
      {loading ? (
        <div style={{ textAlign: "center", marginTop: "5rem" }}>
          Cargando sesión...
        </div>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
};

export default UserProvider;
