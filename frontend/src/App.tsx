import { Navigate, Route, Routes } from "react-router";

import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";

import { DashboardLayout } from "./layouts/DashboardLayout";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

import { ProcesoPage } from "./pages/estudiante/ProcesoPage";
import { PerfilPage } from "./pages/estudiante/PerfilPage";
import { EmpresasPage } from "./pages/estudiante/EmpresasPage";
import { DocumentosPage } from "./pages/estudiante/DocumentosPage";
import { PerfilesPage } from "./pages/empresa/PerfilesPage";
import { MiSeleccionPage } from "./pages/empresa/MiSeleccionPage";
import { GestionPage } from "./pages/asesor/GestionPage";
import { GestionEstudiantesPage } from "./pages/oficina/GestionEstudiantesPage";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute roles={["estudiante"]} />}>
          <Route path="/estudiante" element={<DashboardLayout />}>
            <Route index element={<Navigate to="proceso" replace />} />
            <Route path="proceso" element={<ProcesoPage />} />
            <Route path="perfil" element={<PerfilPage />} />
            <Route path="empresas" element={<EmpresasPage />} />
            <Route path="documentos" element={<DocumentosPage />} />
            <Route path="*" element={<Navigate to="proceso" replace />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute roles={["empresa"]} />}>
          <Route path="/empresa" element={<DashboardLayout />}>
            <Route index element={<Navigate to="perfiles" replace />} />
            <Route path="perfiles" element={<PerfilesPage />} />
            <Route path="mi-seleccion" element={<MiSeleccionPage />} />
            <Route path="*" element={<Navigate to="perfiles" replace />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute roles={["asesor"]} />}>
          <Route path="/asesor" element={<DashboardLayout />}>
            <Route index element={<Navigate to="gestion" replace />} />
            <Route path="gestion" element={<GestionPage />} />
            <Route path="*" element={<Navigate to="gestion" replace />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute roles={["oficina"]} />}>
          <Route path="/oficina" element={<DashboardLayout />}>
            <Route index element={<Navigate to="gestion-estudiantes" replace />} />
            <Route path="gestion-estudiantes" element={<GestionEstudiantesPage />} />
            <Route path="*" element={<Navigate to="gestion-estudiantes" replace />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
