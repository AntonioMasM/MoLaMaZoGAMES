import React, { createContext, useState, useEffect, useContext } from "react";

export const UserContext = createContext();

// ✅ HOOK EXPORTADO DIRECTAMENTE
export function useUser() {
  return useContext(UserContext);
}

// ✅ COMPONENTE EXPORTADO DIRECTAMENTE
export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }

    setLoading(false);
  }, []);

  const login = ({ userData, token }) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
    setUser(userData);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <UserContext.Provider value={{ user, token, login, logout, loading }}>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            fontSize: "1.5rem",
            color: "#888",
          }}
        >
          Cargando sesión...
        </div>
      ) : (
        children
      )}
    </UserContext.Provider>
  );
}
