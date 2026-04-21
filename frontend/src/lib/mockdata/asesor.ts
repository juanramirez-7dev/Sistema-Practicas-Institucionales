// Mock data para el dashboard de asesor

import type { EstadoProceso } from './estudiante.ts';

export interface EstudianteAsignado {
  id: string;
  nombre: string;
  documento: string;
  email: string;
  telefono: string;
  programa: string;
  semestre: number;
  promedio: number;
  estadoProceso: EstadoProceso;
  estadoNombre: string;
  empresaAsignada?: string;
  fechaAsignacion: string;
}

// Lista de estudiantes asignados a un asesor
export const ESTUDIANTES_ASIGNADOS: EstudianteAsignado[] = [
  {
    id: '1',
    nombre: 'Juan Pérez García',
    documento: '1234567890',
    email: 'estudiante@correo.itm.edu.co',
    telefono: '+57 300 123 4567',
    programa: 'Ingeniería de Sistemas',
    semestre: 8,
    promedio: 3.8,
    estadoProceso: 2,
    estadoNombre: 'Curso Preprácticas',
    fechaAsignacion: '2026-03-15',
  },
  {
    id: '3',
    nombre: 'Carlos Rodríguez Sánchez',
    documento: '5555555555',
    email: 'carlos.rodriguez@correo.itm.edu.co',
    telefono: '+57 300 345 6789',
    programa: 'Ingeniería de Sistemas',
    semestre: 8,
    promedio: 3.9,
    estadoProceso: 4,
    estadoNombre: 'Visible para Empresas',
    empresaAsignada: 'TechCorp Colombia',
    fechaAsignacion: '2026-02-20',
  },
  {
    id: '5',
    nombre: 'Luis Fernando Torres',
    documento: '6666666666',
    email: 'luis.torres@correo.itm.edu.co',
    telefono: '+57 300 567 8901',
    programa: 'Ingeniería de Telecomunicaciones',
    semestre: 8,
    promedio: 3.7,
    estadoProceso: 3,
    estadoNombre: 'Documentación',
    fechaAsignacion: '2026-03-01',
  },
  {
    id: '7',
    nombre: 'Andrés Felipe Gómez',
    documento: '7777777777',
    email: 'andres.gomez@correo.itm.edu.co',
    telefono: '+57 300 789 0123',
    programa: 'Ingeniería de Sistemas',
    semestre: 8,
    promedio: 3.6,
    estadoProceso: 4,
    estadoNombre: 'Visible para Empresas',
    empresaAsignada: 'DataLab Analytics',
    fechaAsignacion: '2026-02-10',
  },
  {
    id: '6',
    nombre: 'Diana Patricia Múnera',
    documento: '8888888888',
    email: 'diana.munera@correo.itm.edu.co',
    telefono: '+57 300 678 9012',
    programa: 'Ingeniería de Sistemas',
    semestre: 7,
    promedio: 4.1,
    estadoProceso: 2,
    estadoNombre: 'Curso Preprácticas',
    fechaAsignacion: '2026-03-25',
  },
];
