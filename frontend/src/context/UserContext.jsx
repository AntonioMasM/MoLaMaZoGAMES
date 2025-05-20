// src/context/UserContext.jsx
import { createContext, useState, useEffect, useContext } from "react";
import { getUsuarioPorEmail } from "@/services/userService";

export const UserContext = createContext({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  updateUser: () => {},
  loading: true,
});

export const useUser = () => useContext(UserContext);

// Utilidad para aplicar el tema desde string
const applyTheme = (theme) => {
  const THEMES = ["light", "dark", "high-contrast"];
  if (!THEMES.includes(theme)) return;
  const root = document.documentElement;
  root.classList.remove(...THEMES);
  root.classList.add(theme);
  localStorage.setItem("preferred-theme", theme);
};

export const UserProvider = ({ children }) => {
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

          // ✅ Aplicar tema si viene definido
          if (fullUser.theme) {
            applyTheme(fullUser.theme);
          }
        })
        .catch((err) => {
          console.error("❌ Error al obtener el usuario completo:", err);
          const fallbackUser = {
            ...parsedUser,
            _id: parsedUser._id || parsedUser.id,
          };
          setUser(fallbackUser);

          // Aplicar tema también al fallback
          if (parsedUser.theme) {
            applyTheme(parsedUser.theme);
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
      _id: userData._id || userData.id,
    };
      console.log(normalizedUser);

    // ✅ Aplicar tema si el usuario tiene uno
    if (normalizedUser.theme) {
      applyTheme(normalizedUser.theme);
    }

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
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));

    // ✅ Aplicar nuevo tema si se actualiza
    if (updatedData.theme) {
      applyTheme(updatedData.theme);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "5rem" }}>
        Cargando sesión...
      </div>
    );
  }

  return (
    <UserContext.Provider
      value={{ user, token, login, logout, updateUser, loading }}
    >
      {children}
    </UserContext.Provider>
  );
};
