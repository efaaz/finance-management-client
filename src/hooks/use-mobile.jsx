import { useState, useEffect } from "react";

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
      setIsMobile(mediaQuery.matches);
    };

    // Initial check
    checkMobile();

    // Add resize listener
    window.addEventListener("resize", checkMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile);
  }, [breakpoint]); // Re-run if breakpoint changes

  return isMobile;
};

export default useIsMobile;