import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import App from "./App.tsx";
import "./index.css";

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
