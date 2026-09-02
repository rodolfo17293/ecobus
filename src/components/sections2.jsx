import { Building2, GraduationCap, Users, Briefcase, PartyPopper, Mountain, Heart } from "lucide-react";
import { Reveal, Picture } from "./motion.jsx";

/* ------------------------------- SOMOS ECOBUS ------------------------------ */
export function SomosEcobus() {
  return (
    <section id="nosotros" className="bg-[#EFEFED] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
        <Reveal className="rounded-2xl overflow-hidden aspect-[4/3]">
          <Picture
            name="hf_20260611_012041_3124e45c-5b98-4b10-b74b-72f3d8380b94"
            alt="Personal de ECOBUS al amanecer"
            width={1280}
            height={960}
            className="parallax-img w-full h-full object-cover"
          />
        </Reveal>
        <div>
          <Reveal as="p" delay={0} className="text-sm uppercase tracking-widest text-[#437521] mb-3">Somos DECOBUS</Reveal>
          <Reveal as="h2" delay={120} className="text-3xl sm:text-4xl font-normal tracking-tight text-[#1C2331] mb-6">
            Tres décadas en movimiento
          </Reveal>
          <Reveal delay={240} className="space-y-4 text-[#1C2331]/60 leading-relaxed">
            <p>
              Acompañamos a nuestros clientes antes, durante y después de cada servicio. Seguridad,
              puntualidad, confiabilidad, confort y manejo de contingencias no son promesas: son el
              estándar con el que operamos hace más de 30 años.
            </p>
            <p>
              Trasladamos personal las 24 horas, de manera cordial, oportuna y segura, con las
              mejores condiciones comerciales del mercado.
            </p>
            <p>
              También somos el transporte de confianza de establecimientos educacionales: actividades
              deportivas, visitas educativas, paseos, campeonatos interescolares, viajes fuera de
              Santiago, visitas a museos y empresas, traslados al aeropuerto — todo lo que alumnos y
              profesores necesiten.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- SERVICES -------------------------------- */
export function Services() {
  const cards = [
    {
      Icon: Building2,
      title: "Para empresas",
      img: "hf_20260611_012039_525f3e7c-a280-4bf2-90d3-a501eef4390b",
      copy: "Su equipo llega puntual, todos los días. Traslado de personal desde y hacia el trabajo, con contratos y convenios hechos a la medida.",
    },
    {
      Icon: GraduationCap,
      title: "Para estudiantes",
      img: "hf_20260611_012945_0f34b6f0-73bb-4941-932c-b8a56894b8da",
      copy: "Del aula al museo, del colegio a la gira de estudios. Viajes escolares con la tranquilidad que profesores y apoderados merecen.",
    },
    {
      Icon: Users,
      title: "Para particulares",
      img: "hf_20260611_012947_ad954d9b-4582-47f4-8459-9fe50d9e6bf6",
      copy: "Usted decide cuándo, desde y hacia dónde. Turismo, eventos y celebraciones familiares con el confort de una flota impecable.",
    },
  ];
  return (
    <section id="servicios" className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <Reveal as="h2" delay={0} className="text-3xl sm:text-5xl font-normal tracking-tight text-[#1C2331] mb-4">
            ¿Quién viaja hoy?
          </Reveal>
          <Reveal as="p" delay={120} className="text-[#1C2331]/60 max-w-2xl mx-auto">
            Defina su necesidad — empresas, estudiantes o particulares — y deje el resto en nuestras manos.
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((c, i) => (
            <Reveal key={c.title} delay={Math.min(500, i * 100)} className="rounded-2xl overflow-hidden border border-[#1C2331]/10 bg-[#EFEFED] group">
              <div className="aspect-[4/3] overflow-hidden">
                <Picture
                  name={c.img}
                  alt={c.title}
                  width={800}
                  height={600}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-6">
                <c.Icon className="w-5 h-5 text-[#437521] mb-3" />
                <h3 className="text-xl font-semibold text-[#1C2331] mb-2">{c.title}</h3>
                <p className="text-[#1C2331]/60 text-sm mb-4">{c.copy}</p>
                <a href="#cotizar" className="inline-flex items-center gap-1 text-sm font-medium text-[#1C2331] hover:gap-2 transition-all">
                  Cotizar →
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- TODOS SERVICIOS ----------------------------- */
export function TodosServicios() {
  const families = [
    {
      Icon: Briefcase,
      title: "Traslado de personal",
      items: ["Acercamiento de personal de empresa", "Contratos y convenios con empresas e instituciones"],
    },
    {
      Icon: GraduationCap,
      title: "Salidas pedagógicas",
      items: ["Salidas a museos", "Giras de estudios al sur y norte de Chile", "Salidas a recintos universitarios"],
    },
    {
      Icon: PartyPopper,
      title: "Eventos en la ciudad",
      items: ["Partidos de fútbol", "Conciertos", "Servicios religiosos", "Salidas a aquaparks", "Casinos y centros de entretenimiento"],
    },
    {
      Icon: Mountain,
      title: "Salidas turísticas",
      items: ["Viajes a la costa", "Viajes a la cordillera", "Tours citadinos", "Visitas a viñas y Ruta del Vino"],
    },
    {
      Icon: Heart,
      title: "Viajes privados",
      items: ["Matrimonios", "Bautizos", "Funerales"],
    },
  ];
  return (
    <section className="bg-[#1C2331] text-white py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <Reveal as="h2" delay={0} className="text-3xl sm:text-4xl font-normal tracking-tight text-white mb-4">
            Donde haya un grupo, hay un DECOBUS
          </Reveal>
          <Reveal as="p" delay={120} className="text-white/70 max-w-2xl mx-auto">
            Todos nuestros servicios, con el máximo de comodidad, rapidez, confiabilidad, puntualidad y seguridad.
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {families.map((f, i) => (
            <Reveal key={f.title} delay={Math.min(500, i * 100)}>
              <f.Icon className="w-6 h-6 text-[#6DAB3B] mb-3" />
              <h3 className="text-lg font-semibold text-white mb-3">{f.title}</h3>
              <ul className="space-y-2 text-white/70 text-sm">
                {f.items.map((it) => (
                  <li key={it} className="flex gap-2">
                    <span className="text-[#6DAB3B] select-none">·</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
