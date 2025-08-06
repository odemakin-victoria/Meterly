import { logOutCleanUp } from "@/utils";
import { useEffect } from "react";

const usePageInactivity = () => {
  useEffect(() => {
    let inactivityTimer: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        if (window.location.pathname.includes("auth")) return;
        logOutCleanUp(true);
      }, 300000); // Call the function after inactivity timeout
    };

    const events = ["mousemove", "keydown", "scroll", "click", "touchstart"];

    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });

    // Set the initial timer when the component mounts
    inactivityTimer = setTimeout(() => {
      if (window.location.pathname.includes("auth")) return;
      logOutCleanUp(true);
    }, 300000);

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
      clearTimeout(inactivityTimer);
    };
  }, []);
};

export default usePageInactivity;
