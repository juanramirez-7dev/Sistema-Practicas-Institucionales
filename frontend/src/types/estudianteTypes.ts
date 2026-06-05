interface ValidateCreditsResponse {
  meetsRequirement: boolean;
  approvedCredits: number;
  requiredCredits: number;
  missingCredits: number;
}

type ProcesoBackendState =
  | 'Requisitos_Minimos'
  | 'Curso_Prepracticas'
  | 'Documentacion'
  | 'Visible_Para_Empresas';

interface ProcesoResponse {
  id: string;
  estado: ProcesoBackendState;
}

interface ProcesoStep {
  id: number;
  estado: ProcesoBackendState;
  nombre: string;
  descripcion: string;
}

interface AccionPendiente {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: 'documento' | 'tarea' | 'revision';
}

type DocumentoProcesoEstado = 'Pendiente' | 'Enviado' | 'Aprobado' | 'Rechazado';

type DocumentoProcesoTipo =
  | 'Certificado_Prepracticas'
  | 'Hoda_De_Vida'
  | 'Compromiso_Academico';

interface DocumentoProcesoResponse {
  id: string;
  estado: DocumentoProcesoEstado;
  tipo: DocumentoProcesoTipo;
  observacion: string | null;
  fechaCarga: string;
  url: string;
  procesoId: string;
}

interface UsuarioResponse {
  id: string;
  carnet: number;
  documentoIdentidad: string;
  nombre: string;
  correo: string;
  telefono: string;
  carrera: string;
  facultad: string;
  creditosAprobados: number;
}

interface EmpresaSeleccionada {
  seleccionId: string;
  empresaId: string;
  razonSocial: string;
  sector: string;
  correo: string;
  telefono: string;
  fechaSeleccion: string;
}

interface SeleccionPerfilResponse {
  totalEmpresasInteresadas: number;
  empresas: EmpresaSeleccionada[];
}

interface SeleccionEmpresaItem {
  seleccionId: string;
  estudianteId: string;
  nombre: string;
  carrera: string;
  descripcion: string;
  habilidades: string;
  tecnologias: string;
  correo: string;
  telefono: string;
  urlFoto: string;
  fechaSeleccion: string;
}

interface SeleccionEmpresaResponse {
  totalSeleccionados: number;
  selecciones: SeleccionEmpresaItem[];
}

interface PerfilProfesionalResponse {
  id: string;
  estudianteId: string;
  nombre: string;
  correo: string;
  telefono: string;
  carrera: string;
  descripcion: string;
  habilidades: string;
  tecnologias: string;
  urlFoto: string;
  urlHojaVida?: string;
}

interface PerfilProfesionalUpdate {
  descripcion: string;
  habilidades: string;
  tecnologias: string;
  urlFoto: string;
}

interface PerfilDisponible {
  estudianteId: string;
  nombre: string;
  carrera: string;
  habilidades: string;
  urlFoto: string;
  seleccionado: boolean;
}

interface ListaPerfilesResponse {
  totalPerfiles: number;
  perfiles: PerfilDisponible[];
}

interface SeleccionarPerfilRequest {
  EstudianteId: string;
}

interface NotificacionItem {
  id: string;
  mensaje: string;
  fechaCreacion: string;
  leida: boolean;
}

interface NotificacionesResponse {
  totalNotificaciones: number;
  noLeidas: number;
  notificaciones: NotificacionItem[];
}

export type {
  ValidateCreditsResponse,
  UsuarioResponse,
  ProcesoBackendState,
  ProcesoResponse,
  ProcesoStep,
  AccionPendiente,
  DocumentoProcesoEstado,
  DocumentoProcesoTipo,
  DocumentoProcesoResponse,
  PerfilProfesionalResponse,
  PerfilProfesionalUpdate,
  PerfilDisponible,
  ListaPerfilesResponse,
  SeleccionarPerfilRequest,
  SeleccionPerfilResponse,
  SeleccionEmpresaItem,
  SeleccionEmpresaResponse,
  NotificacionItem,
  NotificacionesResponse,
};
