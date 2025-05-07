// src/utils/generateNotificationLink.js
import { ROUTES } from "@/routes";

export default function generateNotificationLink(notificacion) {
  if (!notificacion.referencia) return ROUTES.NOTIFICATIONS;

  switch (notificacion.tipo) {
    case "mensaje":
      return ROUTES.MESSAGE_DETAIL(notificacion.referencia);
    case "seguimiento":
      return ROUTES.USER_EXTERNAL(notificacion.referencia);
    case "grupo":
      return ROUTES.GROUP_PAGE(notificacion.referencia);
    default:
      return ROUTES.NOTIFICATIONS;
  }
}
