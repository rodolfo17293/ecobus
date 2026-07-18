import { useState } from "react";
import { Snowflake, Bath, Tv, UserCheck, Users } from "lucide-react";
import { Reveal } from "./motion.jsx";

/* Fleet selector — "¿Cuántos viajan?". A passenger slider drives which
   vehicle takes the stage; the CTA pre-fills a WhatsApp quote with the
   recommended vehicle and group size. */

const FLEET_CDN = "https://d2ol7oe51mr4n9.cloudfront.net/user_3EsEl3qJ3ZKxReLoGNp3Ln0RKSf/";

const FLEET = [
  {
    id: "van",
    name: "Van",
    capacity: "9 a 15 pasajeros",
    maxPax: 15,
    article: "una",
    img: FLEET_CDN + "21eb24b2-97f0-4cb8-946e-db690a60cc42.png",
    specs: [
      { Icon: Snowflake, label: "Aire acondicionado" },
      { Icon: UserCheck, label: "Conductor profesional" },
    ],
    blurb: "Ágil y cómoda para grupos pequeños: transfers, comités y delegaciones.",
  },
  {
    id: "taxibus",
    name: "Taxibús",
    capacity: "32 a 33 pasajeros",
    maxPax: 33,
    article: "un",
    img: FLEET_CDN + "eca25b9c-8c28-46eb-9ee6-3ecaa36bb2e2.png",
    specs: [
      { Icon: Snowflake, label: "Aire acondicionado" },
      { Icon: Tv, label: "TV a bordo" },
      { Icon: UserCheck, label: "Conductor profesional" },
    ],
    blurb: "El equilibrio justo para cursos, equipos de trabajo y salidas institucionales.",
  },
  {
    id: "bus-full",
    name: "Bus Full",
    capacity: "43 a 45 pasajeros",
    maxPax: 45,
    article: "un",
    img: FLEET_CDN + "b85958ab-378d-4817-b5f0-db944f5c25b3.png",
    specs: [
      { Icon: Snowflake, label: "Aire acondicionado" },
      { Icon: Bath, label: "Baño a bordo" },
      { Icon: Tv, label: "TV a bordo" },
      { Icon: UserCheck, label: "Conductor profesional" },
    ],
    blurb: "Máximo confort para viajes largos: giras, turismo y grandes delegaciones.",
  },
];

function recommendFor(pax) {
  return FLEET.find((v) => pax <= v.maxPax) || FLEET[FLEET.length - 1];
}

export function FleetSelector() {
  const [pax, setPax] = useState(20);
  const vehicle = recommendFor(pax);

  const waText = encodeURIComponent(
    `Hola ECOBUS, quiero cotizar ${vehicle.article} ${vehicle.name} para ${pax} pasajeros.`
  );
  const waHref = `https://wa.me/56999688045?text=${waText}`;

  return (
    <section id="flota" className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <Reveal as="p" delay={0} className="text-sm uppercase tracking-widest text-[#5C6E7D] mb-3">
            Nuestra flota
          </Reveal>
          <Reveal as="h2" delay={120} className="text-3xl sm:text-5xl font-normal tracking-tight text-[#1C2331] mb-4">
            ¿Cuántos viajan?
          </Reveal>
          <Reveal as="p" delay={240} className="text-[#1C2331]/60">
            Mueva el control y le mostramos la máquina justa para su grupo.
          </Reveal>
        </div>

        {/* Passenger slider */}
        <Reveal delay={240} className="max-w-xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-3 mb-4 text-[#1C2331]">
            <Users className="w-5 h-5 text-[#5C6E7D]" />
            <span className="text-3xl font-semibold tabular-nums">{pax}</span>
            <span className="text-[#1C2331]/60">pasajeros</span>
          </div>
          <input
            type="range"
            min={1}
            max={45}
            value={pax}
            onChange={(e) => setPax(Number(e.target.value))}
            aria-label="Cantidad de pasajeros"
            className="fleet-range w-full"
          />
          <div className="flex justify-between text-xs text-[#5C6E7D] mt-2 px-0.5">
            <span>1</span>
            <span>15</span>
            <span>33</span>
            <span>45</span>
          </div>
        </Reveal>

        {/* Stage */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center max-w-5xl mx-auto">
          {/* Photo stage — all images stacked, the active one fades in */}
          <Reveal className="relative aspect-square rounded-2xl overflow-hidden bg-[#E4E6E8]">
            {FLEET.map((v) => (
              <img
                key={v.id}
                src={v.img || undefined}
                alt={v.id === vehicle.id ? v.name + " ECOBUS" : ""}
                aria-hidden={v.id !== vehicle.id}
                loading="lazy"
                decoding="async"
                width={800}
                height={800}
                className={
                  "absolute inset-0 w-full h-full object-cover transition-opacity duration-500 " +
                  (v.id === vehicle.id ? "opacity-100" : "opacity-0")
                }
              />
            ))}
          </Reveal>

          {/* Vehicle info */}
          <Reveal delay={120}>
            <div key={vehicle.id} className="animate-fade-in-up" style={{ opacity: 0 }}>
              <p className="text-sm uppercase tracking-widest text-[#5C6E7D] mb-2">Le recomendamos</p>
              <h3 className="text-3xl sm:text-4xl font-normal tracking-tight text-[#1C2331] mb-1">
                {vehicle.name}
              </h3>
              <p className="text-[#1C2331]/60 mb-5">{vehicle.capacity}</p>

              <div className="flex flex-wrap gap-2 mb-5">
                {vehicle.specs.map((s) => (
                  <span
                    key={s.label}
                    className="inline-flex items-center gap-2 border border-[#1C2331]/15 rounded-full px-4 py-2 text-sm text-[#1C2331]/70"
                  >
                    <s.Icon className="w-4 h-4 text-[#5C6E7D]" />
                    {s.label}
                  </span>
                ))}
              </div>

              <p className="text-[#1C2331]/60 text-sm mb-7">{vehicle.blurb}</p>

              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#1C2331] text-white px-7 py-3 rounded-full font-medium hover:bg-[#2A3447] transition-colors"
              >
                Cotizar para {pax} pasajeros →
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
