import { Navbar, Hero, TrustBar, Gallery } from "./components/sections1.jsx";
import { SomosEcobus, Services, TodosServicios } from "./components/sections2.jsx";
import { ComoCotizar, NormaVigente, Testimonials, FinalCTA, Footer } from "./components/sections3.jsx";
import { WhatsAppButton } from "./components/whatsapp.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-[#EFEFED] text-[#1C2331]">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Gallery />
        <SomosEcobus />
        <Services />
        <TodosServicios />
        <ComoCotizar />
        <NormaVigente />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
