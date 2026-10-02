import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { hideBanner, isNativeApp, showBanner } from "@/lib/admob";

// Banner shows only on content screens; never on legal, generator, try-on or admin pages.
const BANNER_ROUTES = [/^\/$/, /^\/gallery/, /^\/blog\/.+/];

const AppBanner = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    if (!isNativeApp()) return;
    if (BANNER_ROUTES.some((r) => r.test(pathname))) showBanner();
    else hideBanner();
  }, [pathname]);
  return null;
};

export default AppBanner;
