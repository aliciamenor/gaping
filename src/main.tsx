import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import App from "./App.tsx";
import "./index.css";

// posthog-js is a heavy dependency — loaded async, after the initial render,
// so it doesn't block Home's LCP the way a synchronous import would (it'd
// otherwise land in the eagerly-loaded main chunk, see CLAUDE.md). Only
// tracks real visitors in production, keeping local dev/testing out of the
// analytics.
if (import.meta.env.PROD) {
  import("posthog-js").then(({ default: posthog }) => {
    posthog.init("phc_oYqCgW8rLLowg22uvTMZLXngajdYry7NdfyyPrTwrrt2", {
      api_host: "https://eu.i.posthog.com",
      defaults: "2026-08-30",
      // SPA: capture the initial pageview *and* one on every client-side
      // route change (React Router's history pushes), not just the first load.
      capture_pageview: "history_change",
      autocapture: true,
      capture_heatmaps: true,
      capture_performance: true, // web vitals
      disable_session_recording: true, // aggregate only, no session replay
    });
  });
}

// After a new deploy, a page still open in the browser can try to fetch a
// JS chunk by its old (now-gone) hashed filename when the user navigates to
// a lazy-loaded route. Vite fires this event when that happens; reloading
// fetches the current index.html and chunk manifest instead of leaving a
// blank screen with an uncaught error.
window.addEventListener("vite:preloadError", () => {
  window.location.reload();
});

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Analytics />
  </>
);
