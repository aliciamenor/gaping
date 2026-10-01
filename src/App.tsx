import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useEffect, lazy, Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import Home from "@/pages/Home";

// Code-split secondary routes to keep the Home LCP fast.
const GoToMarket = lazy(() => import("@/pages/GoToMarket"));
const Projects = lazy(() => import("@/pages/Projects"));
const WhoIAm = lazy(() => import("@/pages/WhoIAm"));
const Contacto = lazy(() => import("@/pages/Contacto"));
const BadgeDetail = lazy(() => import("@/pages/BadgeDetail"));
const ExperienceDetail = lazy(() => import("@/pages/ExperienceDetail"));
const NotFound = lazy(() => import("@/pages/NotFound"));

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      // Reset to the top instantly first — otherwise the scroll position
      // from the previous page carries over while the next (possibly
      // lazy-loaded) page is still mounting, and since Footer is always
      // rendered, a scrolled-down starting point flashes it into view
      // before the poll below finds the real target and scrolls to it.
      // `behavior: 'instant'` is required here, not the 2-arg scrollTo(0,0)
      // shorthand — that defaults to 'auto', which defers to the global
      // `scroll-behavior: smooth` on <html> and animates instead of jumping,
      // which is exactly the slow, interruptible motion causing the flash.
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      // The target can be inside a React.lazy-loaded page, which on a hard
      // navigation may still be mid-fetch when this effect first runs — so
      // poll for it instead of assuming one or two frames is enough.
      let attempts = 0;
      const id_ = window.setInterval(() => {
        const el = document.getElementById(id);
        attempts += 1;
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.clearInterval(id_);
        } else if (attempts > 40) {
          window.clearInterval(id_);
        }
      }, 100);
      return () => window.clearInterval(id_);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function RouteFallback() {
  // Tall enough to keep the footer off-screen during the loading gap between
  // one page unmounting and the next page's real content mounting — a short
  // fallback here let the (visually heavy, teal) footer flash into view.
  return <div className="min-h-[100svh]" aria-hidden />;
}

function AppRoutes() {
  const location = useLocation();
  return (
    <>
      <ScrollToTop />
      <Header />
      <ErrorBoundary>
        <AnimatePresence mode="wait">
          <Suspense fallback={<RouteFallback />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<Home />} />
              <Route path="/go-to-market" element={<GoToMarket />} />
              <Route path="/proyecto" element={<Projects />} />
              <Route path="/aboutme" element={<WhoIAm />} />
              <Route path="/contact" element={<Contacto />} />
              <Route path="/insignias/:id" element={<BadgeDetail />} />
              <Route path="/experiencias/:id" element={<ExperienceDetail />} />
              <Route path="/projects" element={<Navigate to="/proyecto" replace />} />
              <Route path="/who-i-am" element={<Navigate to="/aboutme" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AnimatePresence>
      </ErrorBoundary>
      <Footer />
    </>
  );
}

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);

export default App;
