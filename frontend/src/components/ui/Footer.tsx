import { IconHeart } from '@tabler/icons-react';

export function Footer() {
  return (
    <footer
      className="py-8 px-6"
      style={{ backgroundColor: 'var(--color-primary)' }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center">
          <p className="text-white/90 flex items-center justify-center gap-2">
            Desarrollado con
            <IconHeart size={18} className="text-red-400" />
            por la Oficina de Prácticas del ITM
          </p>
          <p className="text-white/70 text-sm mt-2">
            © {new Date().getFullYear()} Instituto Tecnológico Metropolitano.
            Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
