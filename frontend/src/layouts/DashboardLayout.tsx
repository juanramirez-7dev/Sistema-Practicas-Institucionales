import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import {
  IconLogout,
  IconUser,
  IconFileText,
  IconBriefcase,
  IconRoute,
  IconMenu2,
  IconX,
  IconUsers,
  IconUserCheck,
} from '@tabler/icons-react';
import { useAuth } from '../hooks/useAuth';

interface SidebarItem {
  path: string;
  icon: typeof IconUser;
  label: string;
}

const ESTUDIANTE_MENU: SidebarItem[] = [
  { path: '/dashboard/proceso', icon: IconRoute, label: 'Proceso' },
  { path: '/dashboard/perfil', icon: IconUser, label: 'Perfil' },
  { path: '/dashboard/empresas', icon: IconBriefcase, label: 'Empresas Interesadas' },
  { path: '/dashboard/documentos', icon: IconFileText, label: 'Documentos' },
];

const EMPRESA_MENU: SidebarItem[] = [
  { path: '/dashboard/perfiles', icon: IconUsers, label: 'Perfiles' },
  { path: '/dashboard/mi-seleccion', icon: IconUserCheck, label: 'Mi Selección' },
];

const ASESOR_MENU: SidebarItem[] = [
  { path: '/dashboard/gestion', icon: IconUsers, label: 'Gestión de Estudiantes' },
];

const OFICINA_MENU: SidebarItem[] = [
  { path: '/dashboard/gestion-estudiantes', icon: IconUsers, label: 'Gestión de Estudiantes' },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getMenuItems = (): SidebarItem[] => {
    switch (user?.rol) {
      case 'estudiante':
        return ESTUDIANTE_MENU;
      case 'empresa':
        return EMPRESA_MENU;
      case 'asesor':
        return ASESOR_MENU;
      case 'oficina':
        return OFICINA_MENU;
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: 'var(--color-gray-light)' }}>
      {/* Sidebar Desktop */}
      <aside
        className="hidden md:flex md:flex-col md:w-64 lg:w-72"
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        {/* Logo y usuario */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
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
              <h2 className="text-white font-bold text-sm">
                Sistema de Prácticas
              </h2>
            </div>
          </div>
          <div
            className="p-3 rounded-xl"
            style={{ backgroundColor: 'var(--color-primary-light)' }}
          >
            <p className="text-white font-bold text-sm">{user?.nombre}</p>
            <p className="text-white/70 text-xs capitalize">{user?.rol}</p>
          </div>
        </div>

        {/* Menú */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                style={{
                  backgroundColor: isActive
                    ? 'var(--color-secondary)'
                    : 'transparent',
                  color: 'white',
                }}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Botón de cerrar sesión */}
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white transition-all hover:bg-white/10"
          >
            <IconLogout size={20} />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Sidebar Mobile */}
      {isSidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
          <aside
            className="fixed inset-y-0 left-0 w-64 z-50 flex flex-col md:hidden"
            style={{ backgroundColor: 'var(--color-primary)' }}
          >
            {/* Logo y usuario */}
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--color-white)' }}
                  >
                    <span
                      className="font-bold text-lg"
                      style={{ color: 'var(--color-primary)' }}
                    >
                      ITM
                    </span>
                  </div>
                  <h2 className="text-white font-bold text-sm">Prácticas</h2>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-white"
                >
                  <IconX size={24} />
                </button>
              </div>
              <div
                className="p-3 rounded-xl"
                style={{ backgroundColor: 'var(--color-primary-light)' }}
              >
                <p className="text-white font-bold text-sm">{user?.nombre}</p>
                <p className="text-white/70 text-xs capitalize">{user?.rol}</p>
              </div>
            </div>

            {/* Menú */}
            <nav className="flex-1 p-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                    style={{
                      backgroundColor: isActive
                        ? 'var(--color-secondary)'
                        : 'transparent',
                      color: 'white',
                    }}
                  >
                    <Icon size={20} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Botón de cerrar sesión */}
            <div className="p-4 border-t border-white/10">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white transition-all hover:bg-white/10"
              >
                <IconLogout size={20} />
                <span className="font-medium">Cerrar Sesión</span>
              </button>
            </div>
          </aside>
        </>
      )}

      {/* Área de contenido principal */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header móvil */}
        <header
          className="md:hidden px-6 py-4 border-b flex items-center justify-between"
          style={{
            backgroundColor: 'var(--color-white)',
            borderColor: 'var(--color-border)',
          }}
        >
          <button
            onClick={() => setIsSidebarOpen(true)}
            style={{ color: 'var(--color-primary)' }}
          >
            <IconMenu2 size={24} />
          </button>
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              <span
                className="font-bold text-sm"
                style={{ color: 'var(--color-white)' }}
              >
                ITM
              </span>
            </div>
            <span className="font-bold" style={{ color: 'var(--color-primary)' }}>
              Prácticas
            </span>
          </div>
          <div className="w-6" />
        </header>

        {/* Contenido */}
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
