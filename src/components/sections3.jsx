import { ShieldCheck, Star, Instagram, Facebook, Linkedin } from "lucide-react";
import { Reveal, Picture } from "./motion.jsx";

const LOGO = "assets/ecobus-logo.png";

/* -------------------------------- CÓMO COTIZAR ----------------------------- */
export function ComoCotizar() {
  const steps = [
    { n: "1", title: "Cuéntenos quién viaja", copy: "Empresa, estudiantes o particulares." },
    { n: "2", title: "Defina la ruta", copy: "Día o días del servicio, origen y destino." },
    { n: "3", title: "Horarios y pasajeros", copy: "Entre qué horas y cuántas personas." },
    { n: "4", title: "Reciba su propuesta", copy: "Cotización clara y a valor de mercado." },
  ];
  return (
    <section id="cotizar" className="bg-[#EFEFED] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <Reveal as="h2" delay={0} className="text-3xl sm:text-4xl font-normal tracking-tight text-[#1C2331] mb-4">
            Su cotización, en cuatro pasos
          </Reveal>
          <Reveal as="p" delay={120} className="text-[#1C2331]/60 max-w-2xl mx-auto">
            Con estos datos le entregamos una propuesta fidedigna, acorde a los valores de mercado.
          </Reveal>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={Math.min(500, i * 100)}>
              <div className="w-10 h-10 rounded-full bg-[#1C2331] text-white flex items-center justify-center font-medium mb-4">
                {s.n}
              </div>
              <h3 className="text-base font-semibold text-[#1C2331] mb-1">{s.title}</h3>
              <p className="text-[#1C2331]/60 text-sm">{s.copy}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="text-center mt-12">
          <a href="#contacto" className="inline-block bg-[#1C2331] text-white px-8 py-3 rounded-full font-medium hover:bg-[#2A3447] transition-colors">
            Solicitar cotización
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------- NORMA VIGENTE ----------------------------- */
export function NormaVigente() {
  const pills = [
    "Resolución 80.2004",
    "Resolución 98.1986",
    "Constancia de autorización",
    "Seguro de asiento por pasajero",
  ];
  return (
    <section id="norma" className="bg-white py-12 border-y border-[#1C2331]/10">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <Reveal as="p" delay={0} className="text-sm uppercase tracking-widest text-[#8A9BA8] mb-3">Norma vigente</Reveal>
        <Reveal as="h2" delay={120} className="text-2xl sm:text-3xl font-normal text-[#1C2331]">
          Cada viaje, respaldado por la normativa
        </Reveal>
        <Reveal delay={240} className="flex flex-wrap justify-center gap-6 mt-6">
          {pills.map((p) => (
            <span key={p} className="inline-flex items-center gap-2 border border-[#1C2331]/15 rounded-full px-4 py-2 text-sm text-[#1C2331]/70">
              <ShieldCheck className="w-4 h-4 text-[#8A9BA8]" />
              {p}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* -------------------------------- TESTIMONIALS ----------------------------- */
export function Testimonials() {
  const quotes = [
    {
      quote: "Nuestro personal llega todos los días a la hora, sin excepciones. Eso no tiene precio.",
      who: "Jefe de Operaciones, empresa de servicios.",
    },
    {
      quote: "La gira de estudios fue impecable de principio a fin. Los apoderados, tranquilos; los alumnos, felices.",
      who: "Profesora jefe, colegio de Santiago.",
    },
    {
      quote: "Contratamos un viaje familiar y la experiencia fue de primera: flota impecable y un trato excelente.",
      who: "Cliente particular.",
    },
  ];
  return (
    <section className="bg-[#E4E6E8] py-20 sm:py-28">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <Reveal as="h2" className="text-3xl sm:text-4xl font-normal tracking-tight text-[#1C2331]">
            La confianza también viaja
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {quotes.map((q, i) => (
            <Reveal key={q.who} delay={Math.min(500, i * 100)} className="bg-white rounded-2xl p-6 border border-[#1C2331]/10 flex flex-col">
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-[#1C2331]" fill="currentColor" />
                ))}
              </div>
              <p className="text-[#1C2331] flex-1">{q.quote}</p>
              <p className="text-sm text-[#8A9BA8] mt-4">{q.who}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- FINAL CTA ------------------------------- */
export function FinalCTA() {
  return (
    <section className="relative py-28 sm:py-36 overflow-hidden">
      <Picture
        name="hf_20260611_012051_7f135cf6-2913-473d-98d3-45f8dbaa4171"
        alt="Bus ECOBUS saliendo del terminal al atardecer"
        width={1920}
        height={1080}
        fill={false}
        pictureClassName="absolute inset-0 w-full h-full"
        className="parallax-img absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-[#1C2331]/60" />
      <Reveal className="relative z-10 text-white max-w-2xl mx-auto px-4 text-center">
        <h2 className="text-4xl sm:text-6xl font-normal tracking-tight">
          Hay un bus esperando su llamada.
        </h2>
        <p className="text-white/80 mt-4">
          Cuéntenos su ruta y reciba hoy mismo una cotización a su medida.
        </p>
        <div className="mt-8">
          <a href="#contacto" className="inline-block bg-white text-[#1C2331] px-8 py-3 rounded-full font-medium hover:bg-[#E8DFC8] transition-colors">
            Pida su cotización
          </a>
        </div>
        <p className="text-white/70 text-sm mt-6">
          22 812 00 60 · 22 812 03 00 · ventas@ecobus.cl
        </p>
      </Reveal>
    </section>
  );
}

/* ----------------------------------- FOOTER -------------------------------- */
export function Footer() {
  const cols = [
    {
      title: "Servicios",
      links: ["Traslado de personal", "Salidas pedagógicas", "Eventos en la ciudad", "Salidas turísticas", "Viajes privados"],
    },
    {
      title: "Empresa",
      links: ["Somos ECOBUS", "Flota", "Norma vigente", "Cotizar"],
    },
  ];
  return (
    <footer id="contacto" className="bg-[#1C2331] text-white/80 py-16">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
        {/* Col 1 */}
        <div>
          <div className="mb-4">
            <img src={LOGO} alt="ECOBUS" width={179} height={77} className="h-9 w-auto" />
          </div>
          <p className="text-sm text-white/70 mb-4">
            Transporte privado de personas. Más de 60 años moviendo a empresas, estudiantes y familias.
          </p>
          <p className="text-xs text-white/50">
            Operamos bajo norma vigente, con seguro de asiento por pasajero.
          </p>
        </div>

        {/* Cols 2 & 3 */}
        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="text-white font-semibold mb-4">{c.title}</h4>
            <ul className="space-y-1 text-sm text-white/70">
              {c.links.map((l) => (
                <li key={l}>
                  <a href="#" className="inline-block py-1.5 hover:text-white transition-colors">{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Col 4 */}
        <div>
          <h4 className="text-white font-semibold mb-4">Contacto</h4>
          <ul className="space-y-1 text-sm text-white/70">
            <li className="py-1.5">Tel: 22 812 00 60</li>
            <li className="py-1.5">Tel: 22 812 03 00</li>
            <li><a href="mailto:info@ecobus.cl" className="inline-block py-1.5 hover:text-white transition-colors">info@ecobus.cl</a></li>
            <li><a href="mailto:ventas@ecobus.cl" className="inline-block py-1.5 hover:text-white transition-colors">ventas@ecobus.cl</a></li>
          </ul>
          <div className="flex gap-2 mt-3 -ml-2.5">
            <a href="#" aria-label="Instagram" className="w-11 h-11 flex items-center justify-center text-white/70 hover:text-white transition-colors"><Instagram className="w-5 h-5" /></a>
            <a href="#" aria-label="Facebook" className="w-11 h-11 flex items-center justify-center text-white/70 hover:text-white transition-colors"><Facebook className="w-5 h-5" /></a>
            <a href="#" aria-label="LinkedIn" className="w-11 h-11 flex items-center justify-center text-white/70 hover:text-white transition-colors"><Linkedin className="w-5 h-5" /></a>
          </div>
        </div>
      </div>

      {/* Mapa */}
      <div className="max-w-7xl mx-auto px-4 mt-12">
        <div className="rounded-2xl overflow-hidden border border-white/10">
          <iframe
            title="Ubicación de ECOBUS en Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3220.1793256654555!2d-70.88717700763188!3d-33.59877690019549!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662e6b93fa13867%3A0xfbcd28937dddaefd!2sBuses%20Ecobus!5e0!3m2!1ses!2scl!4v1783361070106!5m2!1ses!2scl"
            width="100%"
            height="320"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="block w-full grayscale-[0.2]"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 border-t border-white/10 mt-12 pt-6 text-sm text-white/50 flex flex-wrap justify-between gap-2">
        <span>© 2026 ECOBUS. Todos los derechos reservados.</span>
        <span>Política de privacidad · Términos</span>
      </div>
    </footer>
  );
}
