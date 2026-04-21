// Mock data para el dashboard de oficina de prácticas

import type { EstadoProceso, DocumentoEstado } from './estudiante.ts';

export interface EstudianteOficina {
  id: string;
  nombre: string;
  documento: string;
  email: string;
  programa: string;
  semestre: number;
  promedio: number;
  estadoProceso: EstadoProceso;
  estadoNombre: string;
  fechaInicio: string;
  documentos: DocumentoOficina[];
}

export interface DocumentoOficina {
  id: string;
  tipo: 'certificado-prepracticas' | 'hoja-vida' | 'compromiso-academico';
  nombre: string;
  estado: DocumentoEstado;
  fechaSubida?: string;
  urlArchivo?: string;
  motivoRechazo?: string;
}

// Lista completa de estudiantes con proceso activo
export const ESTUDIANTES_OFICINA: EstudianteOficina[] = [
  {
    id: '1',
    nombre: 'Juan Pérez García',
    documento: '1234567890',
    email: 'estudiante@correo.itm.edu.co',
    programa: 'Ingeniería de Sistemas',
    semestre: 8,
    promedio: 3.8,
    estadoProceso: 2,
    estadoNombre: 'Curso Preprácticas',
    fechaInicio: '2026-03-15',
    documentos: [
      {
        id: 'doc-1-1',
        tipo: 'certificado-prepracticas',
        nombre: 'Certificado Curso Preprácticas',
        estado: 'enviado',
        fechaSubida: '2026-04-10',
        urlArchivo: '/uploads/certificado-juan.pdf',
      },
      {
        id: 'doc-1-2',
        tipo: 'hoja-vida',
        nombre: 'Hoja de Vida Institucional',
        estado: 'pendiente',
      },
      {
        id: 'doc-1-3',
        tipo: 'compromiso-academico',
        nombre: 'Compromiso Académico',
        estado: 'pendiente',
      },
    ],
  },
  {
    id: '2',
    nombre: 'María González López',
    documento: '9876543210',
    email: 'maria.gonzalez@correo.itm.edu.co',
    programa: 'Ingeniería de Sistemas',
    semestre: 7,
    promedio: 4.0,
    estadoProceso: 3,
    estadoNombre: 'Documentación',
    fechaInicio: '2026-02-28',
    documentos: [
      {
        id: 'doc-2-1',
        tipo: 'certificado-prepracticas',
        nombre: 'Certificado Curso Preprácticas',
        estado: 'aceptado',
        fechaSubida: '2026-03-15',
        urlArchivo: '/uploads/certificado-maria.pdf',
      },
      {
        id: 'doc-2-2',
        tipo: 'hoja-vida',
        nombre: 'Hoja de Vida Institucional',
        estado: 'enviado',
        fechaSubida: '2026-04-18',
        urlArchivo: '/uploads/hoja-vida-maria.pdf',
      },
      {
        id: 'doc-2-3',
        tipo: 'compromiso-academico',
        nombre: 'Compromiso Académico',
        estado: 'rechazado',
        fechaSubida: '2026-04-15',
        urlArchivo: '/uploads/compromiso-maria.pdf',
        motivoRechazo:
          'El documento no está firmado correctamente. Por favor, firmar en la sección indicada y volver a subir.',
      },
    ],
  },
  {
    id: '3',
    nombre: 'Carlos Rodríguez Sánchez',
    documento: '5555555555',
    email: 'carlos.rodriguez@correo.itm.edu.co',
    programa: 'Ingeniería de Sistemas',
    semestre: 8,
    promedio: 3.9,
    estadoProceso: 4,
    estadoNombre: 'Visible para Empresas',
    fechaInicio: '2026-02-01',
    documentos: [
      {
        id: 'doc-3-1',
        tipo: 'certificado-prepracticas',
        nombre: 'Certificado Curso Preprácticas',
        estado: 'aceptado',
        fechaSubida: '2026-02-20',
        urlArchivo: '/uploads/certificado-carlos.pdf',
      },
      {
        id: 'doc-3-2',
        tipo: 'hoja-vida',
        nombre: 'Hoja de Vida Institucional',
        estado: 'aceptado',
        fechaSubida: '2026-03-05',
        urlArchivo: '/uploads/hoja-vida-carlos.pdf',
      },
      {
        id: 'doc-3-3',
        tipo: 'compromiso-academico',
        nombre: 'Compromiso Académico',
        estado: 'aceptado',
        fechaSubida: '2026-03-05',
        urlArchivo: '/uploads/compromiso-carlos.pdf',
      },
    ],
  },
  {
    id: '4',
    nombre: 'Ana María Ramírez',
    documento: '1111111111',
    email: 'ana.ramirez@correo.itm.edu.co',
    programa: 'Ingeniería Electrónica',
    semestre: 9,
    promedio: 4.2,
    estadoProceso: 3,
    estadoNombre: 'Documentación',
    fechaInicio: '2026-03-01',
    documentos: [
      {
        id: 'doc-4-1',
        tipo: 'certificado-prepracticas',
        nombre: 'Certificado Curso Preprácticas',
        estado: 'aceptado',
        fechaSubida: '2026-03-20',
        urlArchivo: '/uploads/certificado-ana.pdf',
      },
      {
        id: 'doc-4-2',
        tipo: 'hoja-vida',
        nombre: 'Hoja de Vida Institucional',
        estado: 'enviado',
        fechaSubida: '2026-04-19',
        urlArchivo: '/uploads/hoja-vida-ana.pdf',
      },
      {
        id: 'doc-4-3',
        tipo: 'compromiso-academico',
        nombre: 'Compromiso Académico',
        estado: 'enviado',
        fechaSubida: '2026-04-19',
        urlArchivo: '/uploads/compromiso-ana.pdf',
      },
    ],
  },
  {
    id: '5',
    nombre: 'Luis Fernando Torres',
    documento: '6666666666',
    email: 'luis.torres@correo.itm.edu.co',
    programa: 'Ingeniería de Telecomunicaciones',
    semestre: 8,
    promedio: 3.7,
    estadoProceso: 2,
    estadoNombre: 'Curso Preprácticas',
    fechaInicio: '2026-03-20',
    documentos: [
      {
        id: 'doc-5-1',
        tipo: 'certificado-prepracticas',
        nombre: 'Certificado Curso Preprácticas',
        estado: 'pendiente',
      },
      {
        id: 'doc-5-2',
        tipo: 'hoja-vida',
        nombre: 'Hoja de Vida Institucional',
        estado: 'pendiente',
      },
      {
        id: 'doc-5-3',
        tipo: 'compromiso-academico',
        nombre: 'Compromiso Académico',
        estado: 'pendiente',
      },
    ],
  },
];

// Función para obtener estudiantes con documentos pendientes de revisión
export function getEstudiantesConDocumentosPendientes(): EstudianteOficina[] {
  return ESTUDIANTES_OFICINA.filter((estudiante) =>
    estudiante.documentos.some((doc) => doc.estado === 'enviado')
  );
}

// Función para contar documentos por estado
export function contarDocumentosPorEstado() {
  const contador = {
    pendiente: 0,
    enviado: 0,
    aceptado: 0,
    rechazado: 0,
  };

  ESTUDIANTES_OFICINA.forEach((estudiante) => {
    estudiante.documentos.forEach((doc) => {
      contador[doc.estado]++;
    });
  });

  return contador;
}
