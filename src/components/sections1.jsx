import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Reveal, useReveal, useCountUp, Picture, ASSET_BASE, IMG_BASE } from "./motion.jsx";

const LOGO = "assets/ecobus-logo.png";

/* Shared WhatsApp quote deep link — the primary conversion path. */
export const WA_QUOTE =
  "https://wa.me/56999688045?text=" +
  encodeURIComponent("Hola ECOBUS, quiero pedir una cotización.");

/* ---------------------------------- NAVBAR --------------------------------- */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuBtnRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : prev || "";
    window.dispatchEvent(new CustomEvent("ecobus:menu", { detail: { open } }));
    return () => { document.body.style.overflow = prev || ""; };
  }, [open]);

  // Mobile menu a11y: focus the first link on open, close on Escape, trap Tab
  // inside the panel, and return focus to the trigger on close.
  useEffect(() => {
    if (!open) return;
    const panel = menuRef.current;
    const focusables = panel ? panel.querySelectorAll("a, button") : [];
    focusables[0]?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key === "Tab" && focusables.length) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const closeMenu = () => {
    setOpen(false);
    menuBtnRef.current?.focus();
  };

  const navLinks = [
    { label: "Servicios", href: "#servicios" },
    { label: "Flota", href: "#flota" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "Norma vigente", href: "#norma" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <header
      className={
        "fixed top-0 inset-x-0 z-30 transition-colors duration-300 animate-fade-in-up " +
        (scrolled
          ? "bg-[#EFEFED]/90 backdrop-blur border-b border-[#1C2331]/10"
          : "bg-transparent border-b border-transparent")
      }
      style={{ animationDelay: "0.1s", opacity: 0 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Left: logo */}
        <a href="#top" className="flex items-center">
          <img src={LOGO} alt="ECOBUS" width={179} height={77} className="h-8 w-auto" />
        </a>

        {/* Center: nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm text-[#1C2331]/70">
          {navLinks.map((l) => (
            <a key={l.label} href={l.href} className="flex items-center gap-1 px-2 py-2.5 hover:text-[#1C2331] transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        {/* Right: actions */}
        <div className="hidden sm:flex items-center gap-2">
          <a
            href={WA_QUOTE}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1C2331] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#2A3447] transition-colors"
          >
            Pida su cotización
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          ref={menuBtnRef}
          className="sm:hidden text-[#1C2331] p-2.5 -mr-1"
          aria-label={open ? "Cerrar menú" : "Menú"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          className="sm:hidden absolute top-[60px] inset-x-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 animate-fade-in-overlay"
        >
          <div className="flex flex-col px-6 py-2 text-[#1C2331]">
            {navLinks.map((l) => (
              <a key={l.label} href={l.href} onClick={closeMenu} className="py-3 text-base hover:text-[#1C2331]/60 transition-colors">
                {l.label}
              </a>
            ))}
            <a
              href={WA_QUOTE}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="mt-2 border-t border-gray-200 pt-4 w-full text-center bg-[#1C2331] text-white px-5 py-3 rounded-full text-sm font-medium hover:bg-[#2A3447] transition-colors"
            >
              Pida su cotización
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ----------------------------------- HERO ---------------------------------- */
const HERO_VIDEO_4K = ASSET_BASE + "hf_20260611_014439_66bdea1a-6fae-4b4f-8e8c-dc5b13663852.mp4";
const HERO_VIDEO_720 = ASSET_BASE + "hf_20260611_013708_6cf30703-feb0-4d5b-a605-5828a52e6450.mp4";
const HERO_POSTER = IMG_BASE + "hf_20260611_012037_e5a1be19-7e2f-4dfc-838a-5b7664142817_min.webp";

export function Hero() {
  // Pick the video source + decide autoplay once on mount.
  const [videoSrc, setVideoSrc] = useState(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 1024px)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setReduceMotion(reduce);
    setIsMobile(mobile);
    setVideoSrc(mobile ? HERO_VIDEO_720 : HERO_VIDEO_4K);
  }, []);

  return (
    <section id="top" className="relative h-screen bg-[#EFEFED] overflow-hidden">
      {/* Background video (or static poster on mobile / reduced-motion) */}
      <div className="absolute inset-0 z-0 pt-[120px] md:pt-[200px]">
        {reduceMotion || isMobile ? (
          <img
            src={HERO_POSTER}
            alt=""
            aria-hidden="true"
            decoding="async"
            loading="eager"
            fetchPriority="high"
            className="w-full h-full object-contain object-bottom md:object-cover md:object-center"
          />
        ) : (
          <video
            className="w-full h-full object-contain object-bottom md:object-cover md:object-center"
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster={HERO_POSTER}
            src={videoSrc || undefined}
          />
        )}
      </div>

      {/* Fade overlays */}
      <div
        className="absolute inset-x-0 z-10 pointer-events-none"
        style={{ top: "120px", height: "200px", background: "linear-gradient(to bottom, #EFEFED, rgba(239,239,237,0))" }}
      />
      <div
        className="hidden md:block absolute inset-x-0 z-10 pointer-events-none"
        style={{ top: "200px", height: "300px", background: "linear-gradient(to bottom, #EFEFED, rgba(239,239,237,0))" }}
      />

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto text-center px-4 sm:px-6 pt-20 sm:pt-12">
        {/* Heading */}
        <h1
          className="text-[38px] sm:text-6xl md:text-7xl lg:text-[80px] font-normal leading-[1.1] tracking-tight text-[#1C2331] mb-4 sm:mb-5 animate-fade-in-up"
          style={{ animationDelay: "0.3s", opacity: 0, textWrap: "balance" }}
        >
          <span className="block">
            <span className="md:hidden">Usted elige</span>
            <span className="hidden md:inline">Usted elige el destino.</span>
          </span>
          <span className="block md:hidden">el destino.</span>
          <span className="block bg-gradient-to-r from-[#1C2331] via-[#8A9BA8] to-[#E8DFC8] bg-clip-text text-transparent">
            Nosotros, el camino.
          </span>
        </h1>

        {/* Subheading */}
        <p
          className="text-base sm:text-lg md:text-xl text-[#1C2331]/60 max-w-2xl mx-auto mb-6 sm:mb-8 animate-fade-in-up"
          style={{ animationDelay: "0.4s", opacity: 0 }}
        >
          Bus, conductor y combustible corren por nuestra cuenta. Transporte privado para empresas,
          estudiantes y particulares — puntual, seguro y cómodo, las 24 horas.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.5s", opacity: 0 }}
        >
          <a
            href={WA_QUOTE}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#1C2331] text-white px-6 sm:px-8 py-3 rounded-full font-medium hover:bg-[#2A3447] transition-colors"
          >
            Pida su cotización
          </a>
          <a href="#servicios" className="text-[#1C2331] underline-offset-4 hover:underline py-3 px-2">
            Ver servicios
          </a>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- TRUST BAR -------------------------------- */
export function TrustBar() {
  const [ref, visible] = useReveal();
  const years = useCountUp(30, visible);
  const pax = useCountUp(4000, visible);

  const fmtYears = "+" + Math.round(years) + " años";
  const fmtPax = "+" + Math.round(pax).toLocaleString("es-CL");

  const stats = [
    { big: fmtYears, label: "de trayectoria" },
    { big: fmtPax, label: "pasajeros diarios" },
    { big: "24/7", label: "operación continua" },
    { big: "100%", label: "flota acondicionada" },
  ];
  return (
    <section className="bg-white py-10 border-y border-[#1C2331]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <Reveal as="p" className="inline-block text-sm sm:text-base text-[#1C2331]/70 border border-[#1C2331]/15 rounded-full px-5 py-2">
          La ruta de confianza de empresas, colegios y familias desde hace tres décadas
        </Reveal>
        <div ref={ref} className="flex flex-wrap justify-center gap-8 sm:gap-16 mt-6">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-semibold text-[#1C2331] tabular-nums">{s.big}</div>
              <div className="text-sm text-[#5C6E7D]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------- GALLERY -------------------------------- */
export function Gallery() {
  return (
    <section className="bg-[#E4E6E8] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <Reveal as="p" delay={0} className="text-sm uppercase tracking-widest text-[#5C6E7D] mb-3">La flota</Reveal>
          <Reveal as="h2" delay={120} className="text-3xl sm:text-5xl font-normal tracking-tight text-[#1C2331] mb-4">
            El viaje empieza antes de subir
          </Reveal>
          <Reveal as="p" delay={240} className="text-[#1C2331]/60">
            Buses acondicionados y conductores capacitados: cada detalle preparado para que el
            trayecto sea tan grato como el destino.
          </Reveal>
        </div>

        <Reveal delay={240} className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[160px] sm:auto-rows-[200px] lg:auto-rows-[230px] gap-3 sm:gap-4">
          {/* Featured large wide */}
          <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden group">
            <Picture
              name="hf_20260611_012037_e5a1be19-7e2f-4dfc-838a-5b7664142817"
              alt="Bus ECOBUS en movimiento por la costa"
              width={1280}
              height={960}
              className="parallax-img w-full h-full object-cover"
            />
          </div>
          <div className="rounded-2xl overflow-hidden group">
            <Picture
              name="hf_20260611_012045_c846bbd2-c6af-4ec8-a75e-20eb6755e883"
              alt="Vista aérea de bus en ruta de montaña"
              width={640}
              height={480}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
          {/* Tall narrow vertical tile — portrait night shot */}
          <div className="row-span-2 rounded-2xl overflow-hidden group">
            <Picture
              name="hf_20260611_012213_bfd4d990-7f1c-41e6-a00d-e51485d6b3e3"
              alt="Bus ECOBUS de noche en entorno urbano"
              width={480}
              height={720}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
          <div className="rounded-2xl overflow-hidden group">
            <Picture
              name="hf_20260611_012035_d76d162d-0d88-44fb-bf5c-b9fb394345d9"
              alt="Bus ECOBUS vista frontal 3/4"
              width={640}
              height={480}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
