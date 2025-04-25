import { createContext, useReducer, useEffect } from "react";
import { authReducer } from "./authReducer";
import { LOGIN, LOGOUT, RESTORE } from "./types";

const initialState = {
  isAuthenticated: false,
  user: null,
};

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) {
      dispatch({ type: RESTORE, payload: savedUser });
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    dispatch({ type: LOGIN, payload: userData });
  };

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
