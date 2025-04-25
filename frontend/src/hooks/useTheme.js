import { useEffect, useState } from "react";

const THEME_KEY = "preferred-theme";
const THEMES = ["dark", "light", "high-contrast"];

export function useTheme() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem(THEME_KEY) || "dark";
  });

  useEffect(() => {
    const root = document.documentElement;
  
    // 👉 Añadir transición solo en el cambio de tema
    root.classList.add("theme-transition");
  
    // Eliminar clases de tema anteriores
    THEMES.forEach((t) => root.classList.remove(t));
    root.classList.add(theme);
  
    // Guardar en localStorage
    localStorage.setItem(THEME_KEY, theme);
  
    // ❌ Quitar la clase después de la animación
    const timeout = setTimeout(() => {
      root.classList.remove("theme-transition");
    }, 300); // misma duración que en el CSS
  
    return () => clearTimeout(timeout); // limpieza por seguridad
  }, [theme]);
  

  const toggleTheme = () => {
    const currentIndex = THEMES.indexOf(theme);
    const nextIndex = (currentIndex + 1) % THEMES.length;
    setTheme(THEMES[nextIndex]);
  };

  const setDark = () => setTheme("dark");
  const setLight = () => setTheme("light");
  const setContrast = () => setTheme("high-contrast");

  return { theme, toggleTheme, setDark, setLight, setContrast };
}
