import { lazy } from "react";
import { ROUTES } from "./paths";
import PublicRoute from "./guards/PublicRoute";
import PrivateRoute from "./guards/PrivateRoute";

// 🖥️ Páginas Públicas
const Home = lazy(() => import("@/pages/Home"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const Accesibility = lazy(() => import("@/pages/Accesibility"));
const Contact = lazy(() => import("@/pages/Contact"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const Terms = lazy(() => import("@/pages/Terms"));
const Help = lazy(() => import("@/pages/Help"));

// 🔒 Páginas Privadas
const UserProfile = lazy(() => import("@/pages/UserProfile"));
const UserSettings = lazy(() => import("@/pages/UserSettings"));
const NewAsset = lazy(() => import("@/pages/UploadAsset"));
const Gallery = lazy(() => import("@/pages/UserGalleryPage"));
const UserExternal = lazy(() => import("@/pages/UserExternal"));
const MessagesPage = lazy(() => import("@/pages/MessagesPage"));
const MessageDetailPage = lazy(() => import("@/pages/MessageDetailPage"));
const NotificationsPage = lazy(() => import("@/pages/NotificationsPage"));
const NotificationDetailPage = lazy(() => import("@/pages/NotificationDetailPage"));
const AssetView = lazy(() => import("@/pages/AssetView"));
const UserFavouritesPage = lazy(() => import("@/pages/UserFavouritesPage"));
const UserFollowingPage = lazy(() => import("@/pages/UserFollowingPage"));
const SearchResultsPage = lazy(() => import("@/pages/SearchResultsPage"));
const CategoryPage = lazy(() => import("@/pages/CategoryPage"));
const CategoriesPage = lazy(() => import("@/pages/CategoriesPage"));
const GroupPage = lazy(() => import("@/pages/GroupPage"));
const AssetEdit = lazy(() => import("@/pages/AssetEdit"))

const publicRoutes = [
  { path: ROUTES.HOME, element: <Home /> },
  { path: ROUTES.LOGIN, element: <PublicRoute><Login /></PublicRoute> },
  { path: ROUTES.REGISTER, element: <PublicRoute><Register /></PublicRoute> },
  { path: ROUTES.ACCESIBILITY, element: <Accesibility /> },
  { path: ROUTES.CONTACT, element: <Contact /> },
  { path: ROUTES.PRIVACY, element: <Privacy /> },
  { path: ROUTES.TERMS, element: <Terms /> },
  { path: ROUTES.HELP, element: <Help /> },
];

const privateRoutes = [
  { path: ROUTES.PROFILE, element: <PrivateRoute><UserProfile /></PrivateRoute> },
  { path: ROUTES.SETTINGS, element: <PrivateRoute><UserSettings /></PrivateRoute> },
  { path: ROUTES.UPLOAD_ASSET, element: <PrivateRoute><NewAsset /></PrivateRoute> },
  { path: ROUTES.GALLERY, element: <PrivateRoute><Gallery /></PrivateRoute> },
  { path: ROUTES.USER_EXTERNAL(), element: <UserExternal /> },
  { path: ROUTES.MESSAGES, element: <MessagesPage /> },
  { path: ROUTES.MESSAGE_DETAIL(), element: <MessageDetailPage /> },
  { path: ROUTES.NOTIFICATIONS, element: <NotificationsPage /> },
  { path: ROUTES.NOTIFICATION_DETAIL(), element: <NotificationDetailPage /> },
  { path: ROUTES.ASSET_VIEW(), element: <PrivateRoute><AssetView /></PrivateRoute> },
  { path: ROUTES.FAVOURITES, element: <PrivateRoute><UserFavouritesPage /></PrivateRoute> },
  { path: ROUTES.FOLLOWING, element: <PrivateRoute><UserFollowingPage /></PrivateRoute> },
  { path: ROUTES.SEARCH, element: <PrivateRoute><SearchResultsPage /></PrivateRoute> },
  { path: ROUTES.CATEGORY(), element: <PrivateRoute><CategoryPage /></PrivateRoute> },
  { path: ROUTES.CATEGORIES, element: <PrivateRoute><CategoriesPage /></PrivateRoute> },
  { path: ROUTES.GROUP_PAGE(), element: <PrivateRoute><GroupPage /></PrivateRoute> },
  { path: ROUTES.ASSET_EDIT(), element: <PrivateRoute><AssetEdit /></PrivateRoute>},
];

export const routeConfig = [...publicRoutes, ...privateRoutes].map(route => ({
  ...route,
  layout: true, // Puedes refinar esto si en el futuro tienes rutas sin layout
}));
