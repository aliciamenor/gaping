/* eslint-disable react-refresh/only-export-components -- SSR-only entry
   point, never loaded by the Vite dev server's HMR runtime; fast refresh
   doesn't apply here. */
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ErrorBoundary from "@/components/ErrorBoundary";
import Home from "@/pages/Home";
import GoToMarket from "@/pages/GoToMarket";
import Projects from "@/pages/Projects";
import WhoIAm from "@/pages/WhoIAm";
import Contacto from "@/pages/Contacto";
import ExperienceDetail from "@/pages/ExperienceDetail";
import { experiences } from "@/data/experiences";

// SSR-only entry point, built separately (see package.json "build" script /
// scripts/prerender.mjs) and never shipped to the browser. It exists purely
// to prerender static HTML for each route at build time, so crawlers/tools
// that don't execute JavaScript (many AI browsing tools, unlike Googlebot)
// still see real content instead of the empty `<div id="root"></div>` that
// client-only rendering would otherwise serve.
//
// Uses eager imports (not the app's React.lazy code-splitting) because
// `renderToString` doesn't wait for Suspense/lazy boundaries to resolve —
// code-splitting is a client-only performance concern, irrelevant here.
// Insignias/BadgeDetail are intentionally NOT prerendered (not in the
// sitemap, disallowed in robots.txt, unlinked from the site).

const SITE_NAME = "GAPING";
const DEFAULT_TITLE = "GAPING";
const DEFAULT_DESCRIPTION =
  "Un proyecto de innovación personal, diseñado como si fuera un producto.";

// Keep in sync with each page's usePageMeta(...) call.
const STATIC_META: Record<string, { title: string; description: string }> = {
  "/go-to-market": {
    title: `Go To Market · ${SITE_NAME}`,
    description: "Cómo diseñé GAPING como proyecto de producto",
  },
  "/proyecto": {
    title: `Proyecto · ${SITE_NAME}`,
    description: "GAPING como case study de producto",
  },
  "/aboutme": {
    title: `About me · ${SITE_NAME}`,
    description: "Mi propuesta de valor como PM y mi trayectoria profesional",
  },
  "/contact": {
    title: `Contact · ${SITE_NAME}`,
    description: "Escríbeme. Me encantan los cafés (incluso si son virtuales)",
  },
};

export interface PrerenderRoute {
  path: string;
  title: string;
  description: string;
}

export function getRoutes(): PrerenderRoute[] {
  const staticRoutes: PrerenderRoute[] = [
    { path: "/", title: DEFAULT_TITLE, description: DEFAULT_DESCRIPTION },
    ...Object.entries(STATIC_META).map(([path, meta]) => ({ path, ...meta })),
  ];
  const experienceRoutes: PrerenderRoute[] = experiences.map((exp) => ({
    path: `/experiencias/${exp.id}`,
    title: `${exp.skill} · ${SITE_NAME}`,
    description: exp.subtitle,
  }));
  return [...staticRoutes, ...experienceRoutes];
}

// Mirrors AppRoutes in App.tsx (Suspense/AnimatePresence/Routes wrapping,
// key={location.pathname}) so the DOM shape matches exactly what the client
// produces on its first hydration pass — a structural difference here (e.g.
// missing the Suspense/AnimatePresence wrapper) is what causes a React
// hydration mismatch, since AnimatePresence's own mount behavior needs to
// be identical on both sides. Only actually-lazy differs: real page
// components imported eagerly here (renderToString doesn't wait for
// React.lazy/Suspense to resolve, so the client's code-splitting is
// irrelevant/counterproductive for this SSR-only tree).
function SsrRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="min-h-[100svh]" aria-hidden />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/go-to-market" element={<GoToMarket />} />
          <Route path="/proyecto" element={<Projects />} />
          <Route path="/aboutme" element={<WhoIAm />} />
          <Route path="/contact" element={<Contacto />} />
          <Route path="/experiencias/:id" element={<ExperienceDetail />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

export function render(path: string): string {
  return renderToString(
    <StaticRouter location={path}>
      <Header />
      <ErrorBoundary>
        <SsrRoutes />
      </ErrorBoundary>
      <Footer />
    </StaticRouter>
  );
}
