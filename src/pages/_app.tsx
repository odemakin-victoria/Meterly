import { store } from "@/redux/store/store";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { Provider } from "react-redux";
import usePageVisibility from "@/redux/hooks/session/usePageVisibilty";
import usePageInactivity from "@/redux/hooks/session/usePageInactivity";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const getFingerprint = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();
    };
    getFingerprint();
  }, []);
  // usePageVisibility();
  // usePageInactivity();
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
