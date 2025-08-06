import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const useHandleSession = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if the user is authenticated
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");

    if (!sessionStorage.getItem("isReloaded") && !isAuthenticated) {
      console.log("or its hereeee");
      // Redirect to login if not authenticated
      if (
        router.pathname !== "/auth/signup" &&
        router.pathname !== "/support" &&
        router.pathname !== "/auth/login"
      ) {
        router.replace("/auth/login");
      }
    } else {
      // Remove the reload flag if reloading
      sessionStorage.removeItem("isReloaded");
    }

    const handleBeforeUnload = () => {
      // Set reload flag in sessionStorage when the page is refreshed
      sessionStorage.setItem("isReloaded", "true");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Set loading to false after handling session check
    setIsLoading(false);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [router]);

  return isLoading;
};

export default useHandleSession;
