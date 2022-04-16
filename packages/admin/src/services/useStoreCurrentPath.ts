import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// stores current route path that can be returned to with useReturnToStoredPath() hook
export function useStoreCurrentPath(enabled = true) {
  const { pathname } = useLocation();

  useEffect(() => {
    // don't do anything if not enabled
    if (!enabled) {
      return;
    }

    // store the path to return to using useReturnToStoredPath() hook
    window.localStorage.returnPath = pathname;
  }, [enabled, pathname]);
}
