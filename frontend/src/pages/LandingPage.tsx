import { InicioSection } from "../components/landing/InicioSection";
import { EmpresasSection } from "../components/landing/EmpresaSection";
import { ContactoSection } from "../components/landing/ContactoSection";
import { Navbar } from "../components/ui/Navbar";
import { Footer } from "../components/ui/Footer";

export function LandingPage() {
  return (
    <>
      <Navbar />

      <main>
        <InicioSection />
        <EmpresasSection />
        <ContactoSection />
      </main>

      <Footer />
    </>
  );
}
