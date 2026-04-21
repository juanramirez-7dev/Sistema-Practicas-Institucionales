import { Link } from 'react-router';
import { IconUser } from '@tabler/icons-react';

export function Navbar() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300"
      style={{ backgroundColor: 'var(--color-primary)' }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo y nombre */}
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-white)' }}
          >
            <span
              className="font-bold text-xl"
              style={{ color: 'var(--color-primary)' }}
            >
              ITM
            </span>
          </div>
          <div>
            <h2 className="text-white font-bold text-lg leading-tight">
              Sistema de Prácticas
            </h2>
            <p className="text-white/80 text-xs">
              Instituto Tecnológico Metropolitano
            </p>
          </div>
        </div>

        {/* Enlaces de navegación */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('inicio')}
            className="text-white/90 hover:text-white transition-colors"
          >
            Inicio
          </button>
          <button
            onClick={() => scrollToSection('empresas')}
            className="text-white/90 hover:text-white transition-colors"
          >
            Empresas
          </button>
          <button
            onClick={() => scrollToSection('contacto')}
            className="text-white/90 hover:text-white transition-colors"
          >
            Contacto
          </button>
        </div>

        {/* Botón de inicio de sesión */}
        <Link
          to="/login"
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-white font-bold transition-all hover:scale-105"
          style={{ backgroundColor: 'var(--color-secondary)' }}
        >
          <IconUser size={20} />
          <span>Iniciar Sesión</span>
        </Link>
      </div>

      {/* Menú móvil */}
      <div className="md:hidden mt-4 flex gap-4 justify-center">
        <button
          onClick={() => scrollToSection('inicio')}
          className="text-white/90 hover:text-white transition-colors text-sm"
        >
          Inicio
        </button>
        <button
          onClick={() => scrollToSection('empresas')}
          className="text-white/90 hover:text-white transition-colors text-sm"
        >
          Empresas
        </button>
        <button
          onClick={() => scrollToSection('contacto')}
          className="text-white/90 hover:text-white transition-colors text-sm"
        >
          Contacto
        </button>
      </div>
    </nav>
  );
}
