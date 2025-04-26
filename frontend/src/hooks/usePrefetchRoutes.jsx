import { useEffect } from "react";

export default function usePrefetchRoutes() {
  useEffect(() => {
    import("../pages_temp/UserProfile");
    import("../pages_temp/UserSettings");
    import("../pages_temp/UploadAsset");
  }, []);
}
