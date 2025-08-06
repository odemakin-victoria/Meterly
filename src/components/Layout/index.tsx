import { useEffect } from "react";
import { useRouter } from "next/router";
import Header from "./Header";


type LayoutProps = {
  children: any;
};

const Layout = ({ children }: LayoutProps) => {
  const router = useRouter();
  const { pathname, query } = router;

  useEffect(() => {
    //To reset incase an action is to be performed
    // dispatch(shouldRefresh(true));
    if (location.pathname == "/") {
      router.push("/home");
    }
  }, []);

  return (
    <div className="flex-2 w-full h-screen md:overflow-hidden ">

        <div className="h-screen">
          <Header  />
          {children}
        </div>
    </div>
  );
};

export default Layout;
