// 📦 Librerías principales
import { BrowserRouter as Router } from "react-router-dom";

// 🧩 Providers agrupados
import AppProviders from "./layouts/AppProviders";

// 🛤️ Rutas y navegación
import { AppRoutes } from "./routes";

// 🎨 Estilos globales
import "./styles/Global.css";

export default function App() {
  return (
    <Router>
      <AppProviders>
        <AppRoutes />
      </AppProviders>
    </Router>
  );
}
