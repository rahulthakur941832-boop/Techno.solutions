import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppWidget from "./components/WhatsAppWidget";
import AIChatbot from "./components/AIChatbot";
import SEOHead from "./components/SEOHead";

// Pages
import Home from "./pages/Home";
import About from "./pages/About";
import ServicesMainPage from "./pages/ServicesMain";
import ServiceDetail from "./pages/ServiceDetail";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";
import Contact from "./pages/Contact";
import AdminPage from "./pages/AdminPage";

// ScrollToTop helper on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function MainLayout() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <Routes>
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden antialiased font-sans bg-white text-[#1B1B1B]">
      {/* Absolute Global Backdrop Effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-50/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-[20%] left-0 w-[500px] h-[500px] bg-amber-500/[0.01] rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header Navigation */}
      <Header />

      {/* Main Routed Content */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<ServicesMainPage />} />
          <Route path="/services/:id" element={<ServiceDetail />} />
          <Route path="/digital-transformation" element={<ServiceDetail />} />
          <Route path="/business-automation" element={<ServiceDetail />} />
          <Route path="/artificial-intelligence" element={<ServiceDetail />} />
          <Route path="/blockchain-solutions" element={<ServiceDetail />} />
          <Route path="/smart-home-installation-services" element={<ServiceDetail />} />
          <Route path="/solar-panel-installation" element={<ServiceDetail />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      {/* Footer Section */}
      <Footer />

      {/* Floating Widgets */}
      <WhatsAppWidget />
      <AIChatbot />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SEOHead />
      <ScrollToTop />
      <MainLayout />
    </BrowserRouter>
  );
}
