import { Routes, Route, Navigate } from "react-router";

import { useAuth } from "./hooks/useAuth.ts";

import { LandingPage } from "./feactures/landing/pages/LandingPage.tsx";
import { LoginPage } from "./feactures/auth/pages/LoginPage.tsx";

import { ProcesoPage } from "./feactures/student/pages/ProcesoPage.tsx";
import { PerfilPage } from "./feactures/student/pages/PerfilPage.tsx";
import { EmpresasPage } from "./feactures/student/pages/EmpresasPage.tsx";
import { DocumentosPage } from "./feactures/student/pages/DocumentosPage.tsx";

import { PerfilesPage } from "./feactures/company/pages/PerfilesPage.tsx";
import { MiSeleccionPage } from "./feactures/company/pages/MiSeleccionPage.tsx";

import { GestionPage } from "./feactures/asesor/pages/GestionPage.tsx";

import { GestionEstudiantesPage } from "./feactures/office/pages/GestionEstudiantesPage.tsx";

import { DashboardLayout } from "./layouts/DashboardLayout.tsx";

import { Navbar } from "./shared/ui/Navbar.tsx";
import { Footer } from "./shared/ui/Footer.tsx";

function DashboardRoutes() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;

  // Rutas según rol
  switch (user.rol) {
    case 'estudiante':
      return (
        <Routes>
          <Route index element={<Navigate to="/dashboard/proceso" replace />} />
          <Route path="proceso" element={<ProcesoPage />} />
          <Route path="perfil" element={<PerfilPage />} />
          <Route path="empresas" element={<EmpresasPage />} />
          <Route path="documentos" element={<DocumentosPage />} />
        </Routes>
      );
    case 'empresa':
      return (
        <Routes>
          <Route index element={<Navigate to="/dashboard/perfiles" replace />} />
          <Route path="perfiles" element={<PerfilesPage />} />
          <Route path="mi-seleccion" element={<MiSeleccionPage />} />
        </Routes>
      );
    case 'asesor':
      return (
        <Routes>
          <Route index element={<Navigate to="/dashboard/gestion" replace />} />
          <Route path="gestion" element={<GestionPage />} />
        </Routes>
      );
    case 'oficina':
      return (
        <Routes>
          <Route index element={<Navigate to="/dashboard/gestion-estudiantes" replace />} />
          <Route path="gestion-estudiantes" element={<GestionEstudiantesPage />} />
        </Routes>
      );
    default:
      return <Navigate to="/login" replace />;
  }
}

export default function App() {
  return (
        <div className="min-h-screen flex flex-col">
          <Routes>
            {/* Ruta de login sin Navbar y Footer */}
            <Route path="/login" element={<LoginPage />} />

            {/* Rutas del Dashboard (requieren autenticación) */}

            <Route
              path="/dashboard/*"
              element={
                <DashboardLayout>
                  <DashboardRoutes />
                </DashboardLayout>
              }
            />

            {/* Rutas con Navbar y Footer */}
            <Route
              path="/*"
              element={
                <>
                  <Navbar />
                  <div className="flex-1">
                    <Routes>
                      <Route path="/" element={<LandingPage />} />
                    </Routes>
                  </div>
                  <Footer />
                </>
              }
            />
          </Routes>
        </div>
  );
}
