import { useState, useEffect } from "react";

/* Floating WhatsApp button — bottom-right, fades in after 300ms.
   Hides while the mobile menu is open (Navbar dispatches `ecobus:menu`). */
export function WhatsAppButton() {
  const [shown, setShown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const reduce =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(true);
      return;
    }
    const t = setTimeout(() => setShown(true), 300);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const onMenu = (e) => setMenuOpen(!!(e.detail && e.detail.open));
    window.addEventListener("ecobus:menu", onMenu);
    return () => window.removeEventListener("ecobus:menu", onMenu);
  }, []);

  return (
    <a
      href="https://wa.me/56999688045?text=Hola%20DECOBUS%2C%20quiero%20cotizar%20un%20viaje."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className={
        "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 motion-reduce:transition-none " +
        (shown && !menuOpen ? "opacity-100" : "opacity-0 pointer-events-none")
      }
      style={{ backgroundColor: "#25D366" }}
    >
      <svg viewBox="0 0 32 32" width="28" height="28" fill="#FFFFFF" aria-hidden="true">
        <path d="M16.004 3.2c-7.07 0-12.8 5.73-12.8 12.8 0 2.257.59 4.46 1.71 6.4L3.2 28.8l6.59-1.71a12.74 12.74 0 0 0 6.21 1.6h.005c7.07 0 12.8-5.73 12.8-12.8 0-3.42-1.332-6.635-3.75-9.052A12.715 12.715 0 0 0 16.004 3.2zm0 23.04h-.004a10.63 10.63 0 0 1-5.42-1.484l-.388-.23-4.01 1.04 1.07-3.91-.253-.402a10.6 10.6 0 0 1-1.626-5.654c0-5.874 4.78-10.654 10.66-10.654a10.58 10.58 0 0 1 7.53 3.124 10.58 10.58 0 0 1 3.12 7.538c0 5.874-4.78 10.654-10.659 10.654zm5.844-7.98c-.32-.16-1.894-.934-2.188-1.04-.293-.107-.507-.16-.72.16-.213.32-.826 1.04-1.013 1.254-.187.213-.373.24-.693.08-.32-.16-1.352-.498-2.576-1.59-.952-.85-1.594-1.898-1.78-2.218-.187-.32-.02-.493.14-.652.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.72-1.736-.987-2.376-.26-.624-.524-.54-.72-.55l-.613-.01c-.213 0-.56.08-.853.4-.293.32-1.12 1.094-1.12 2.67 0 1.574 1.146 3.096 1.306 3.31.16.213 2.256 3.446 5.466 4.832.764.33 1.36.527 1.825.674.767.244 1.464.21 2.016.127.615-.092 1.894-.774 2.16-1.522.267-.747.267-1.388.187-1.522-.08-.133-.293-.213-.613-.373z"/>
      </svg>
    </a>
  );
}
