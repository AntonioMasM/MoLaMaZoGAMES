export function generateNotificationLink(notificacion) {
    if (!notificacion.referencia) return '/notifications';
  
    switch (notificacion.tipo) {
      case "mensaje":
        return `/messages/${notificacion.referencia}`; // referencia = id del mensaje
      case "seguimiento":
        return `/user/${encodeURIComponent(notificacion.referencia)}`; // referencia = email del usuario
      case "grupo":
        return `/groups/${notificacion.referencia}`; // referencia = id del grupo
      default:
        return '/notifications';
    }
  }
  