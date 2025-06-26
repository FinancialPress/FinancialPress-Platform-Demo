
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { BalanceProvider } from "./contexts/BalanceContext";
import AppLayout from "./components/layout/AppLayout";
import Index from "./pages/Index";
import ProfilePage from "./pages/ProfilePage";
import ContentCreatorPage from "./pages/ContentCreatorPage";
import UserFeedPage from "./pages/UserFeedPage";
import DashboardPage from "./pages/DashboardPage";
import StockChartDataPage from "./pages/StockChartDataPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <BalanceProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<AppLayout />}>
                  <Route index element={<Index />} />
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/create" element={<ContentCreatorPage />} />
                  <Route path="/feed" element={<UserFeedPage />} />
                  <Route path="/dashboard" element={<DashboardPage />} />
                  <Route path="/stockchartdata" element={<StockChartDataPage />} />
                  <Route path="/auth" element={<Navigate to="/" replace />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </BalanceProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
