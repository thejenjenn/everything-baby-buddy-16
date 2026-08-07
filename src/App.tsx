import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FloatingWhatsAppButton from "@/components/FloatingWhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import ShopByStage from "./pages/ShopByStage";
import NotFound from "./pages/NotFound";
import RegistryPublic from "./pages/registry/RegistryPublic";
import RegistryLogin from "./pages/registry/RegistryLogin";
import RegistryAuthCallback from "./pages/registry/RegistryAuthCallback";
import RegistryNew from "./pages/registry/RegistryNew";
import RegistryDashboard from "./pages/registry/RegistryDashboard";
import ClaimUndo from "./pages/registry/ClaimUndo";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/shop" element={<ShopByStage />} />

            <Route path="/registry/login" element={<RegistryLogin />} />
            <Route path="/registry/auth/callback" element={<RegistryAuthCallback />} />
            <Route path="/registry/new" element={<RegistryNew />} />
            <Route path="/registry/dashboard" element={<RegistryDashboard />} />
            <Route path="/registry/claim/undo" element={<ClaimUndo />} />
            <Route path="/registry/:slug" element={<RegistryPublic />} />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <FloatingWhatsAppButton />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
