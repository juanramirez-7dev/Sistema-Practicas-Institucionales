import { InicioSection } from '../components/InicioSection.tsx';
import { EmpresasSection } from '../components/EmpresaSection.tsx';
import { ContactoSection } from '../components/ContactoSection.tsx';

export function LandingPage() {
  return (
    <main>
      <InicioSection />
      <EmpresasSection />
      <ContactoSection />
    </main>
  );
}
