// components/layouts/Layout.jsx
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";

export default function Layout({ children }) {
  return (
    <div className="layout-wrapper">
      <Navbar />
      <main className="layout-main">{children}</main>
      <Footer />
    </div>
  );
}
