import { logOutCleanUp } from "@/utils";
import { useEffect, useState } from "react";

const usePageVisibility = () => {
  const [isTabActive, setIsTabActive] = useState(true);

  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsTabActive(false);
        inactivityTimer = setTimeout(() => {
          logOutCleanUp();
        }, 300000);
      } else {
        setIsTabActive(true);
        clearTimeout(inactivityTimer);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearTimeout(inactivityTimer); // Cleanup timer on unmount
    };
  }, []);

  return isTabActive;
};

export default usePageVisibility;
