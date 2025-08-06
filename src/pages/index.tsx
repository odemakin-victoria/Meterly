import { useEffect } from "react";
import { useRouter } from "next/router";
import LandingPage from "./landing-page/index"; // Adjusted path

// import { Outlet } from "react-router-dom";

const Main = () => {
  const router = useRouter();
  const { pathname, query } = router;

  useEffect(() => {
    //To reset incase an action is to be performed
    // dispatch(shouldRefresh(true));
    if (location.pathname == "/") {
      router.push("/landing-page");
    }
  }, []);
	

  return <LandingPage />;
};

export default Main;
