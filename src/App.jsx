import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "@/lib/query-client";
import { Toaster } from "@/components/ui/toaster";
import ScrollToTop from "@/components/ScrollToTop";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import DecisionGuidePage from "@/pages/DecisionGuidePage";
import Encyclopedia from "@/pages/Encyclopedia";
import ThemeDetail from "@/pages/ThemeDetail";
import Materials from "@/pages/Materials";
import AreaTrail from "@/pages/AreaTrail";
import SectorTrail from "@/pages/SectorTrail";
import ISO9001 from "@/pages/ISO9001";
import PageNotFound from "@/lib/PageNotFound";

export default function App() {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/decisao" element={<DecisionGuidePage />} />
            <Route path="/enciclopedia" element={<Encyclopedia />} />
            <Route path="/tema/:id" element={<ThemeDetail />} />
            <Route path="/area/:areaId" element={<AreaTrail />} />
            <Route path="/setor/:sectorId" element={<SectorTrail />} />
            <Route path="/iso" element={<ISO9001 />} />
            <Route path="/acervo" element={<Materials />} />

            {/* Rotas administrativas/auth temporariamente redirecionadas até o novo backend */}
            <Route path="/login" element={<Navigate to="/" replace />} />
            <Route path="/register" element={<Navigate to="/" replace />} />
            <Route path="/forgot-password" element={<Navigate to="/" replace />} />
            <Route path="/reset-password" element={<Navigate to="/" replace />} />
            <Route path="/adicionar" element={<Navigate to="/" replace />} />
            <Route path="/oauth" element={<Navigate to="/" replace />} />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <Toaster />
    </QueryClientProvider>
  );
}
