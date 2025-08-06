import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { returnCookie } from "@/utils";

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthenticatedComponent = (props: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
      const checkAuth = async () => {
        const authStatus = await returnCookie("RIB_AT");
        authStatus && setIsAuthenticated(true);
        if (!authStatus) {
          router.replace("/auth/login");
        }
        setLoading(false);
      };

      checkAuth();
    }, [router]);

    if (loading) {
      return null;
    }

    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return AuthenticatedComponent;
};

export default withAuth;
