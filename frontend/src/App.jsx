// 📦 Librerías principales
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute"; // ✅ Importamos la ruta privada

// 🔐 Autenticación
import { AuthProvider } from "./features/auth/AuthProvider";
import { UserProvider, useUser } from "./context/UserContext";

// 🔔 Alerta global
import { AlertProvider } from "./context/AlertContext";

// 🧩 Componentes comunes
import Navbar from "./components/Navbar";
import Footer from "./components/Footer/Footer";

// 🖥️ Páginas públicas
import Home from "./pages_temp/Home";
import Login from "./pages_temp/Login";
import Register from "./pages_temp/Register";
import Accesibility from "./pages_temp/Accesibility";
import Contact from "./pages_temp/Contact";
import Privacy from "./pages_temp/Privacy";
import Terms from "./pages_temp/Terms";
import Help from "./pages_temp/Help";

// 🔒 Página privada
import UserProfile from "./pages_temp/UserProfile";

// 🎨 Estilos globales
import "./styles/global.css";

// ✅ Subcomponente para gestionar el renderizado condicionado a loading
function AppRoutes() {
  const { loading } = useUser();

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: "1.2rem", color: "#888" }}>Cargando sesión...</p>
      </div>
    );
  }

  return (
    <>
      {/* 🌐 Navegación principal */}
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/accesibility" element={<Accesibility />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/help" element={<Help />} />

        {/* 🔐 Ruta privada: Perfil de usuario */}
        <Route path="/profile" element={<PrivateRoute><UserProfile /></PrivateRoute>} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <UserProvider>
      <AuthProvider>
        <Router>
          <AlertProvider>
            <AppRoutes />
          </AlertProvider>
        </Router>
      </AuthProvider>
    </UserProvider>
  );
}

export default App;
