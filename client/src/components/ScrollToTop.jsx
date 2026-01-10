import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    // ১. ব্রাউজারের মেইন উইন্ডো এবং বডি স্ক্রল রিসেট
    window.scrollTo(0, 0);
    document.documentElement.scrollTo(0, 0);
    document.body.scrollTo(0, 0);

    // ২. যদি অ্যাপ কন্টেইনারের নিজস্ব স্ক্রলবার থাকে, সেটিও রিসেট করা
    const appContainer = document.querySelector('.app-container');
    if (appContainer) {
      appContainer.scrollTo(0, 0);
      appContainer.scrollTop = 0; // ডাবল চেক
    }

    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      mainContent.scrollTo(0, 0);
      mainContent.scrollTop = 0;
    }

  }, [pathname]);

  return null;
};

export default ScrollToTop;