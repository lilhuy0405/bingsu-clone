import {useEffect, useState} from "react";

const useWindowSize = (breakPoint: number) => {
  const [isMobile, setIsMobile] = useState(false);
  const handleResize = () => {
    if (window.innerWidth < breakPoint) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };
  useEffect(() => {
    if (window.innerWidth < breakPoint) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return isMobile
}

export default useWindowSize