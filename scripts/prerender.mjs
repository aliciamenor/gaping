// Runs after `vite build` + `vite build --ssr src/entry-server.tsx`.
// For each route, renders real HTML via entry-server.js and writes it as a
// static dist/<route>/index.html (dist/index.html for "/"), with the
// route's title/description/canonical/OG/Twitter tags swapped in. This is
// what lets non-JS-executing crawlers (many AI browsing tools) see real
// content instead of an empty `<div id="root"></div>`.
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const distDir = join(root, "dist");
const ssrDir = join(root, "dist-ssr");

const { render, getRoutes } = await import(join(ssrDir, "entry-server.js"));

let template = readFileSync(join(distDir, "index.html"), "utf-8");

// Inline the (single, ~9KB gzipped) stylesheet directly into the HTML instead
// of a render-blocking <link>, so first paint doesn't wait on a second
// request — this is the one render-blocking resource PageSpeed flags, and
// the whole site shares this one CSS file (Tailwind bundles all routes'
// classes together), so there's no "critical subset" to extract: either the
// full file blocks via a <link>, or it ships inline. Every prerendered route
// below reuses this same `template`, so they all get it inlined. Trade-off:
// the stylesheet is no longer cached separately across page navigations
// within the site — acceptable here since most traffic is a single-page
// first visit (a shared link), where first paint matters more than repeat-
// navigation caching.
const cssLinkMatch = template.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/);
if (cssLinkMatch) {
  const cssPath = join(distDir, cssLinkMatch[1].replace(/^\//, ""));
  const css = readFileSync(cssPath, "utf-8");
  template = template.replace(cssLinkMatch[0], `<style>${css}</style>`);
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

for (const route of getRoutes()) {
  const appHtml = render(route.path);
  const canonicalUrl =
    route.path === "/" ? "https://gaping.vercel.app/" : `https://gaping.vercel.app${route.path}`;
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);

  const html = template
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
    .replace(
      /<meta name="description" content=".*?">/,
      `<meta name="description" content="${description}">`
    )
    .replace(
      /<link rel="canonical" href=".*?"\s*\/>/,
      `<link rel="canonical" href="${canonicalUrl}" />`
    )
    .replace(
      /<meta property="og:title" content=".*?">/,
      `<meta property="og:title" content="${title}">`
    )
    .replace(
      /<meta name="twitter:title" content=".*?">/,
      `<meta name="twitter:title" content="${title}">`
    )
    .replace(
      /<meta property="og:description" content=".*?">/,
      `<meta property="og:description" content="${description}">`
    )
    .replace(
      /<meta name="twitter:description" content=".*?">/,
      `<meta name="twitter:description" content="${description}">`
    );

  const outPath =
    route.path === "/"
      ? join(distDir, "index.html")
      : join(distDir, route.path.replace(/^\//, ""), "index.html");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, html);
  console.log(`prerendered ${route.path} -> ${outPath.replace(root + "/", "")}`);
}

// dist-ssr was only a build-time intermediate — remove it so it never ships.
rmSync(ssrDir, { recursive: true, force: true });
