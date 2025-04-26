// components/layouts/Layout.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {children}
      </main>
      <Footer />
    </>
  );
}
