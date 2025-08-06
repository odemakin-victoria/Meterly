import { useState, useEffect } from "react";

const useCheckContainerSize = (
  ref: React.RefObject<HTMLElement>,
  threshold = 500
) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkSize = () => {
      if (ref.current) {
        setIsSmallScreen(
          ref.current.getBoundingClientRect().width <= threshold
        );
      }
    };

    if (!ref.current) {
      const observer = new MutationObserver(() => {
        if (ref.current) {
          observer.disconnect();
          checkSize();
        }
      });

      observer.observe(document.body, { childList: true, subtree: true });

      return () => observer.disconnect();
    }

    checkSize();
    window.addEventListener("resize", checkSize);

    return () => window.removeEventListener("resize", checkSize);
  }, [ref.current, threshold]); // Trigger effect when ref.current changes

  return isSmallScreen;
};

export default useCheckContainerSize;