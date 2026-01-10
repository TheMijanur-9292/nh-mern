import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // ১. সাধারণ উইন্ডো স্ক্রল (যদি বডি স্ক্রল হয়)
    window.scrollTo(0, 0);

    // ২. যদি আপনার অ্যাপের কোনো নির্দিষ্ট কন্টেইনার স্ক্রল হয় (যেমন .app-container বা .main-content)
    const appContainer = document.querySelector('.app-container');
    if (appContainer) {
      appContainer.scrollTo(0, 0);
    }

    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.scrollTo(0, 0);
    }

  }, [pathname]);

  return null;
};

export default ScrollToTop;