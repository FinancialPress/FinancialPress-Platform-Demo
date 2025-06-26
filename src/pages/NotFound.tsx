
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTheme } from "../contexts/ThemeContext";
import PageWrapper from "../components/layout/PageWrapper";

const NotFound = () => {
  const location = useLocation();
  const { isDarkMode } = useTheme();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const bgClasses = isDarkMode ? "text-white" : "text-black";

  return (
    <PageWrapper className="min-h-[50vh] flex items-center justify-center">
      <div className={`text-center ${bgClasses}`}>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl mb-4 opacity-70">Oops! Page not found</p>
        <a href="/" className="text-fpYellow hover:text-fpYellowDark underline font-semibold">
          Return to Home
        </a>
      </div>
    </PageWrapper>
  );
};

export default NotFound;
