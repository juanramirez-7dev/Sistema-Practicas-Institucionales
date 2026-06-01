import { useState } from 'react';
import { Link } from 'react-router';
import { IconUser, IconMenu2, IconX } from '@tabler/icons-react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsOpen(false);
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

        {/* Enlaces de navegación (desktop) */}
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

        {/* Acciones: login + móvil toggle */}
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-white font-bold transition-all hover:scale-105"
            style={{ backgroundColor: 'var(--color-secondary)' }}
          >
            <IconUser size={20} />
            <span>Iniciar Sesión</span>
          </Link>

          <button
            onClick={() => setIsOpen((v) => !v)}
            aria-expanded={isOpen}
            aria-label="Abrir menú"
            className="md:hidden p-2 rounded-lg text-white/90 focus:outline-none focus:ring-2 focus:ring-white/30"
          >
            {isOpen ? <IconX size={24} /> : <IconMenu2 size={24} />}
          </button>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ease-in-out ${isOpen ? 'max-h-64' : 'max-h-0'}`}
        aria-hidden={!isOpen}
      >
        <div className="px-4 pt-4 pb-4 flex flex-col gap-3">
          <button
            onClick={() => handleNavClick('inicio')}
            className="text-white/90 hover:text-white transition-colors text-sm text-left"
          >
            Inicio
          </button>
          <button
            onClick={() => handleNavClick('empresas')}
            className="text-white/90 hover:text-white transition-colors text-sm text-left"
          >
            Empresas
          </button>
          <button
            onClick={() => handleNavClick('contacto')}
            className="text-white/90 hover:text-white transition-colors text-sm text-left"
          >
            Contacto
          </button>

          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="mt-2 flex items-center gap-2 px-4 py-2 rounded-xl text-white font-bold transition-all hover:scale-105"
            style={{ backgroundColor: 'var(--color-secondary)' }}
          >
            <IconUser size={18} />
            <span>Iniciar Sesión</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
