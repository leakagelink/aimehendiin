import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Generate from "./pages/Generate";
import Gallery from "./pages/Gallery";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import BridalMehendi2026 from "./pages/landing/BridalMehendi2026";
import KarwaChauthMehendi from "./pages/landing/KarwaChauthMehendi";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/generate" element={<Generate />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/gallery/:category" element={<Gallery />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/about" element={<About />} />
          {/* SEO Landing Pages */}
          <Route path="/bridal-mehendi-design-2026" element={<BridalMehendi2026 />} />
          <Route path="/karwa-chauth-mehndi-design" element={<KarwaChauthMehendi />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
