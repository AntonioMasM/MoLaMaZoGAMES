// routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { useUser } from "@/context/UserContext";
import usePrefetchRoutes from "@/hooks/usePrefetchRoutes";

import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import Layout from "@/layouts/Layout";

// 🖥️ Lazy Load de Páginas Públicas
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const Accesibility = lazy(() => import("@/pages/Accesibility"));
const Contact = lazy(() => import("@/pages/Contact"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));
const Help = lazy(() => import("@/pages/Help"));


// 🔒 Lazy Load de Páginas Privadas
const UserProfile = lazy(() => import("@/pages/UserProfile"));
const UserSettings = lazy(() => import("@/pages/UserSettings"));
const NewAsset = lazy(() => import("@/pages/UploadAsset"));
const Gallery = lazy(() => import("@/pages/UserGalleryPage"));
const UserExternal = lazy(() => import("@/pages/UserExternal"));
const MessagesPage = lazy(() => import("@/pages/MessagesPage"));
const MessageDetailPage = lazy(() => import("@/pages/MessageDetailPage"));
const NotificationsPage = lazy(() => import("@/pages/NotificationsPage"));
const NotificationDetailPage = lazy(() => import("@/pages/NotificationDetailPage"));
const AssetView = lazy(() => import("@/pages/AssetView")); /* 🚀 añadido */
const UserFavouritesPage = lazy(() => import("@/pages/UserFavouritesPage")); /* 🚀 añadido */
const UserFollowingPage = lazy(() => import("@/pages/UserFollowingPage")); /* 🚀 añadido */
const SearchResultsPage = lazy(() => import("@/pages/SearchResultsPage"));
const CategoryPage = lazy(() => import("@/pages/CategoryPage"));
const CategoriesPage = lazy(() => import("@/pages/CategoriesPage"));
const GroupPage = lazy(() => import("@/pages/GroupPage"));

export default function AppRoutes() {
  const { loading } = useUser();
  usePrefetchRoutes(); // Prefetch inteligente 🚀

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner" />
        <p>Cargando sesión...</p>
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="loading-container">
        <div className="spinner" />
        <p>Cargando contenido...</p>
      </div>
    }>
      <Routes>
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/login" element={<Layout><PublicRoute><Login /></PublicRoute></Layout>} />
        <Route path="/register" element={<Layout><PublicRoute><Register /></PublicRoute></Layout>} />
        <Route path="/accesibility" element={<Layout><Accesibility /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />
        <Route path="/privacy-policy" element={<Layout><Privacy /></Layout>} />
        <Route path="/terms" element={<Layout><Terms /></Layout>} />
        <Route path="/help" element={<Layout><Help /></Layout>} />

        <Route path="/profile" element={<Layout><PrivateRoute><UserProfile /></PrivateRoute></Layout>} />
        <Route path="/settings" element={<Layout><PrivateRoute><UserSettings /></PrivateRoute></Layout>} />
        <Route path="/upload-asset" element={<Layout><PrivateRoute><NewAsset /></PrivateRoute></Layout>} />
        <Route path="/gallery" element={<Layout><PrivateRoute><Gallery /></PrivateRoute></Layout>} />
        <Route path="/user/:email" element={<Layout><UserExternal /></Layout>} />
        <Route path="/messages" element={<Layout><MessagesPage /></Layout>} />
        <Route path="/messages/:id" element={<Layout><MessageDetailPage /></Layout>} />
        <Route path="/notifications" element={<Layout><NotificationsPage /></Layout>} />
        <Route path="/notifications/:id" element={<Layout><NotificationDetailPage /></Layout>} />
        <Route path="/asset/:id" element={<Layout><PrivateRoute><AssetView /></PrivateRoute></Layout>} />
        <Route path="/favourites" element={<Layout><PrivateRoute><UserFavouritesPage /></PrivateRoute></Layout>} />
        <Route path="/following" element={<Layout><PrivateRoute><UserFollowingPage /></PrivateRoute></Layout>} />
        <Route path="/search" element={<Layout><PrivateRoute><SearchResultsPage /></PrivateRoute></Layout>} />
        <Route path="/categories/:nombreCategoria" element={<Layout><PrivateRoute><CategoryPage /></PrivateRoute></Layout>} />
        <Route path="/categories" element={<Layout><PrivateRoute><CategoriesPage /></PrivateRoute></Layout>} />
        <Route path="/groups/:id" element={<Layout><PrivateRoute><GroupPage/></PrivateRoute></Layout>} />

      </Routes>
    </Suspense>
  );
}
