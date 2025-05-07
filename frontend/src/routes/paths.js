// src/routes/paths.js

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",

  PROFILE: "/profile",
  SETTINGS: "/settings",

  UPLOAD_ASSET: "/upload-asset",
  GALLERY: "/gallery",

  USER_EXTERNAL: (email = ":email") => `/user/${email}`,

  MESSAGES: "/messages",
  MESSAGE_DETAIL: (id = ":id") => `/messages/${id}`,

  NOTIFICATIONS: "/notifications",
  NOTIFICATION_DETAIL: (id = ":id") => `/notifications/${id}`,

  ASSET_VIEW: (id = ":id") => `/asset/${id}`,
  FAVOURITES: "/favourites",
  FOLLOWING: "/following",
  SEARCH: "/search",

  CATEGORY: (nombre = ":nombreCategoria") => `/categories/${nombre}`,
  CATEGORIES: "/categories",

  GROUP_PAGE: (id = ":id") => `/groups/${id}`,

  ACCESIBILITY: "/accesibility",
  CONTACT: "/contact",
  PRIVACY: "/privacy-policy",
  TERMS: "/terms",
  HELP: "/help",
};
