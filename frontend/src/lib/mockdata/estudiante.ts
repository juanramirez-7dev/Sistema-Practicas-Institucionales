// Mock data para el proceso y datos del estudiante

export type EstadoProceso = 1 | 2 | 3 | 4;

export type DocumentoEstado = 'pendiente' | 'enviado' | 'aceptado' | 'rechazado';

export interface ProcesoEstado {
  id: EstadoProceso;
  nombre: string;
  descripcion: string;
  completado: boolean;
  actual: boolean;
}

export interface AccionPendiente {
  id: string;
  titulo: string;
  descripcion: string;
  tipo: 'documento' | 'tarea' | 'revision';
}

export interface Documento {
  id: string;
  nombre: string;
  descripcion: string;
  estado: DocumentoEstado;
  tienePlantilla: boolean;
  urlPlantilla?: string;
  archivoSubido?: {
    nombre: string;
    fecha: string;
    url: string;
  };
  motivoRechazo?: string;
}

export interface Empresa {
  id: string;
  nombre: string;
  sector: string;
  contacto: {
    nombre: string;
    email: string;
    telefono: string;
  };
  descripcion: string;
  fechaInteres: string;
}

export interface PerfilEstudiante {
  id: string;
  nombre: string;
  documento: string;
  email: string;
  foto?: string;
  descripcion: string;
  programa: string;
  semestre: number;
  promedio: number;
  creditos: number;
  habilidades: string[];
  areasInteres: string[];
}

// Estados del proceso
export const ESTADOS_PROCESO: ProcesoEstado[] = [
  {
    id: 1,
    nombre: 'Requisitos Mínimos',
    descripcion:
      'Has cumplido con todos los requisitos mínimos para iniciar tu proceso de prácticas profesionales. Esto incluye créditos aprobados, promedio académico y documentos al día.',
    completado: true,
    actual: false,
  },
  {
    id: 2,
    nombre: 'Curso Preprácticas',
    descripcion:
      'Debes completar el curso de preprácticas obligatorio y cargar el certificado de asistencia. Este curso te prepara con las herramientas necesarias para tu proceso de prácticas.',
    completado: false,
    actual: true,
  },
  {
    id: 3,
    nombre: 'Documentación',
    descripcion:
      'Debes diligenciar y cargar los documentos requeridos: hoja de vida institucional y compromiso académico. Estos documentos serán revisados por la oficina de prácticas.',
    completado: false,
    actual: false,
  },
  {
    id: 4,
    nombre: 'Visible para Empresas',
    descripcion:
      'Tu perfil está visible para las empresas aliadas. Podrás ver las empresas interesadas y gestionar tu proceso de prácticas. Recuerda subir el informe de prácticas al finalizar tu experiencia laboral.',
    completado: false,
    actual: false,
  },
];

// Acciones pendientes según el estado actual
export const ACCIONES_PENDIENTES: Record<EstadoProceso, AccionPendiente[]> = {
  1: [
    {
      id: '1-1',
      titulo: 'Continuar al siguiente paso',
      descripcion: 'Ya cumples los requisitos. Avanza al curso de preprácticas.',
      tipo: 'tarea',
    },
  ],
  2: [
    {
      id: '2-1',
      titulo: 'Realizar curso de preprácticas',
      descripcion:
        'Completa el curso obligatorio de preparación para prácticas profesionales.',
      tipo: 'tarea',
    },
    {
      id: '2-2',
      titulo: 'Cargar certificado de asistencia',
      descripcion:
        'Sube el certificado del curso de preprácticas en la sección de Documentos.',
      tipo: 'documento',
    },
  ],
  3: [
    {
      id: '3-1',
      titulo: 'Diligenciar hoja de vida',
      descripcion:
        'Descarga la plantilla, diligénciala y súbela en la sección de Documentos.',
      tipo: 'documento',
    },
    {
      id: '3-2',
      titulo: 'Diligenciar compromiso académico',
      descripcion:
        'Descarga, completa y sube el documento de compromiso académico.',
      tipo: 'documento',
    },
    {
      id: '3-3',
      titulo: 'Esperar aprobación',
      descripcion: 'La oficina de prácticas revisará tus documentos.',
      tipo: 'revision',
    },
  ],
  4: [
    {
      id: '4-1',
      titulo: 'Revisar empresas interesadas',
      descripcion: 'Consulta las empresas que han mostrado interés en tu perfil.',
      tipo: 'tarea',
    },
    {
      id: '4-2',
      titulo: 'Subir informe final',
      descripcion:
        'Al finalizar tus prácticas, deberás subir el informe final de prácticas.',
      tipo: 'documento',
    },
  ],
};

// Documentos del estudiante
export const DOCUMENTOS_ESTUDIANTE: Documento[] = [
  {
    id: 'cert-prepracticas',
    nombre: 'Certificado Curso Preprácticas',
    descripcion:
      'Certificado de asistencia al curso obligatorio de preprácticas profesionales.',
    estado: 'pendiente',
    tienePlantilla: false,
  },
  {
    id: 'hoja-vida',
    nombre: 'Hoja de Vida Institucional',
    descripcion:
      'Hoja de vida en formato institucional del ITM para ser presentada a las empresas.',
    estado: 'pendiente',
    tienePlantilla: true,
    urlPlantilla: '/plantillas/hoja-vida-itm.pdf',
  },
  {
    id: 'compromiso',
    nombre: 'Compromiso Académico',
    descripcion:
      'Documento de compromiso académico firmado para el proceso de prácticas.',
    estado: 'pendiente',
    tienePlantilla: true,
    urlPlantilla: '/plantillas/compromiso-academico.pdf',
  },
];

// Empresas interesadas (ejemplo)
export const EMPRESAS_INTERESADAS: Empresa[] = [
  {
    id: 'emp-1',
    nombre: 'TechCorp Colombia',
    sector: 'Tecnología y Software',
    contacto: {
      nombre: 'María Fernanda Gómez',
      email: 'rrhh@techcorp.com.co',
      telefono: '+57 (4) 555-1234',
    },
    descripcion:
      'Empresa líder en desarrollo de software empresarial. Buscamos practicantes en desarrollo web y móvil.',
    fechaInteres: '2026-04-15',
  },
  {
    id: 'emp-2',
    nombre: 'InnovaTech Solutions',
    sector: 'Consultoría Tecnológica',
    contacto: {
      nombre: 'Carlos Andrés Martínez',
      email: 'practicas@innovatech.co',
      telefono: '+57 (4) 555-5678',
    },
    descripcion:
      'Consultora especializada en transformación digital. Ofrecemos prácticas en análisis de datos y UX/UI.',
    fechaInteres: '2026-04-12',
  },
  {
    id: 'emp-3',
    nombre: 'DataLab Analytics',
    sector: 'Ciencia de Datos',
    contacto: {
      nombre: 'Ana Patricia Vélez',
      email: 'contacto@datalab.com.co',
      telefono: '+57 (4) 555-9012',
    },
    descripcion:
      'Empresa especializada en análisis de datos y machine learning. Buscamos estudiantes con conocimientos en Python y estadística.',
    fechaInteres: '2026-04-10',
  },
];

// Perfil del estudiante
export const PERFIL_ESTUDIANTE: PerfilEstudiante = {
  id: '1',
  nombre: 'Juan Pérez García',
  documento: '1234567890',
  email: 'estudiante@correo.itm.edu.co',
  descripcion:
    'Estudiante de Ingeniería de Sistemas apasionado por el desarrollo web y la ciencia de datos. Con experiencia en proyectos académicos utilizando React, Node.js y Python. Busco oportunidades para aplicar mis conocimientos en un entorno empresarial y seguir aprendiendo.',
  programa: 'Ingeniería de Sistemas',
  semestre: 8,
  promedio: 3.8,
  creditos: 120,
  habilidades: [
    'React',
    'TypeScript',
    'Node.js',
    'Python',
    'SQL',
    'Git',
    'Docker',
  ],
  areasInteres: [
    'Desarrollo Web',
    'Ciencia de Datos',
    'Cloud Computing',
    'Desarrollo Móvil',
  ],
};
