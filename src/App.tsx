import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Tools from "./pages/Tools";
import GSTCalculator from "./pages/tools/GSTCalculator";
import EMICalculator from "./pages/tools/EMICalculator";
import SalaryCalculator from "./pages/tools/SalaryCalculator";
import AdvanceTaxCalculator from "./pages/tools/AdvanceTaxCalculator";
import InvestmentPlanner from "./pages/tools/InvestmentPlanner";
import DocumentChecklist from "./pages/tools/DocumentChecklist";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/gst-calculator" element={<GSTCalculator />} />
          <Route path="/tools/emi-calculator" element={<EMICalculator />} />
          <Route path="/tools/salary-calculator" element={<SalaryCalculator />} />
          <Route path="/tools/advance-tax-calculator" element={<AdvanceTaxCalculator />} />
          <Route path="/tools/investment-planner" element={<InvestmentPlanner />} />
          <Route path="/tools/document-checklist" element={<DocumentChecklist />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
