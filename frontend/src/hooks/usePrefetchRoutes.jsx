import { useEffect } from "react";

export default function usePrefetchRoutes() {
  useEffect(() => {
    import("../pages/UserProfile");
    import("../pages/UserSettings");
    import("../pages/UploadAsset");
  }, []);
}
