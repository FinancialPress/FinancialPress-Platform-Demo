
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { BalanceProvider } from "./contexts/BalanceContext";
import Header from "./components/Header";
import LandingPage from "./components/LandingPage";
import UserFeed from "./components/UserFeed";
import Dashboard from "./components/Dashboard";
import ContentCreator from "./components/ContentCreator";
import StockChartData from "./components/StockChartData";
import SignUpPage from "./components/SignUpPage";
import OnboardingFlow from "./components/OnboardingFlow";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import { useTheme } from "./contexts/ThemeContext";
import { useAuth } from "./contexts/AuthContext";
import { useProfile } from "./hooks/useProfile";
import { useSearchParams } from "react-router-dom";

const queryClient = new QueryClient();

// Main app layout with persistent header
const AppLayout = () => {
  const { isDarkMode } = useTheme();
  const { user } = useAuth();
  const { profile } = useProfile();

  const themeClasses = isDarkMode 
    ? "page-background bg-black"
    : "page-background bg-gray-50";

  const handleNavigate = (screen: number, symbol?: string) => {
    // Legacy support for any remaining onNavigate calls
    console.log('Legacy onNavigate called:', screen, symbol);
  };

  return (
    <div className={`${themeClasses} w-full overflow-x-hidden`}>
      <Header 
        onNavigate={handleNavigate}
        isDarkMode={isDarkMode}
        userProfile={profile}
        isLoggedIn={!!user}
      />
      <div className="max-w-[1350px] mx-auto px-6 sm:px-10 lg:px-16">
        <Routes>
          <Route path="/" element={<LandingPage onNavigate={handleNavigate} isDarkMode={isDarkMode} />} />
          <Route path="/signup" element={<SignUpPage onNavigate={handleNavigate} isDarkMode={isDarkMode} />} />
          <Route path="/onboarding" element={<OnboardingFlow onNavigate={handleNavigate} isDarkMode={isDarkMode} />} />
          <Route path="/feed" element={<UserFeed onNavigate={handleNavigate} isDarkMode={isDarkMode} showOnboarding={false} />} />
          <Route path="/dashboard" element={<Dashboard onNavigate={handleNavigate} isDarkMode={isDarkMode} />} />
          <Route path="/create" element={<ContentCreator onNavigate={handleNavigate} isDarkMode={isDarkMode} />} />
          <Route path="/stockchartdata" element={<StockChartDataRoute />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/auth" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

// Component for stock chart route with search params
const StockChartDataRoute = () => {
  const [searchParams] = useSearchParams();
  const symbol = searchParams.get('symbol') || '';
  const { isDarkMode } = useTheme();

  const handleNavigate = (screen: number, symbol?: string) => {
    console.log('StockChart onNavigate:', screen, symbol);
  };

  return <StockChartData symbol={symbol} onNavigate={handleNavigate} isDarkMode={isDarkMode} />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <BalanceProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppLayout />
            </BrowserRouter>
          </TooltipProvider>
        </BalanceProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
