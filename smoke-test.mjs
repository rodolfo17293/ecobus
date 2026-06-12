// Headless smoke test: load the built bundle in a jsdom DOM and verify React renders.
import { JSDOM } from "jsdom";
import { readdirSync } from "fs";

const dom = new JSDOM(`<!DOCTYPE html><html><body><div id="root"></div></body></html>`, {
  url: "https://rodolfo17293.github.io/ecobus/",
  pretendToBeVisual: true,
});

const { window } = dom;
for (const k of ["HTMLElement", "Element", "Node", "CustomEvent", "getComputedStyle"]) {
  try { globalThis[k] = window[k]; } catch { /* read-only global */ }
}
globalThis.window = window;
globalThis.document = window.document;
window.matchMedia = window.matchMedia || ((q) => ({ matches: false, media: q, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} }));
globalThis.matchMedia = window.matchMedia;
globalThis.requestAnimationFrame = window.requestAnimationFrame || ((cb) => setTimeout(() => cb(performance.now()), 16));
globalThis.cancelAnimationFrame = window.cancelAnimationFrame || clearTimeout;
globalThis.IntersectionObserver = window.IntersectionObserver || class { observe() {} unobserve() {} disconnect() {} };
window.IntersectionObserver = globalThis.IntersectionObserver;
globalThis.MutationObserver = window.MutationObserver || class { observe() {} disconnect() {} takeRecords() { return []; } };
globalThis.performance = globalThis.performance || window.performance;

process.on("uncaughtException", (e) => { console.error("UNCAUGHT:", e.message); process.exit(1); });
process.on("unhandledRejection", (e) => { console.error("REJECTION:", e?.message || e); process.exit(1); });

const js = readdirSync("dist/assets").find((f) => f.endsWith(".js"));
try {
  await import("./dist/assets/" + js);
  // Give React a tick to mount
  await new Promise((r) => setTimeout(r, 500));
  const root = window.document.getElementById("root");
  const html = root.innerHTML;
  console.log("RENDERED CHARS:", html.length);
  console.log("HAS NAV:", html.includes("ECOBUS"));
  console.log("HAS HERO:", html.includes("Nosotros, el camino"));
  console.log(html.length > 1000 ? "OK: page renders" : "FAIL: empty render");
} catch (e) {
  console.error("IMPORT/RENDER ERROR:", e.message);
  console.error(e.stack?.split("\n").slice(0, 6).join("\n"));
  process.exit(1);
}
