import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import UserProfile from "./Pages/UserProfile";
import Gallery from "./Pages/Gallery";
import Contact from "./Pages/Contact";
import Accesibility from "./Pages/Accesibility";
import Privacy from "./Pages/Privacy";
import Terms from "./Pages/Terms";

import "./styles/global.css";

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="c">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/accesibility" element={<Accesibility />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;
