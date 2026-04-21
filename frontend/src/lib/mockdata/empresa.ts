// Mock data para el dashboard de empresas

export interface EstudianteDisponible {
  id: string;
  nombre: string;
  foto?: string;
  programa: string;
  semestre: number;
  promedio: number;
  descripcion: string;
  habilidades: string[];
  areasInteres: string[];
  email: string;
  telefono: string;
  hojaVidaUrl?: string;
}

export interface EstudianteSeleccionado {
  id: string;
  estudianteId: string;
  empresaId: string;
  fechaSeleccion: string;
}

// Listado de estudiantes disponibles para las empresas
export const ESTUDIANTES_DISPONIBLES: EstudianteDisponible[] = [
  {
    id: '1',
    nombre: 'Juan Pérez García',
    programa: 'Ingeniería de Sistemas',
    semestre: 8,
    promedio: 3.8,
    descripcion:
      'Estudiante de Ingeniería de Sistemas apasionado por el desarrollo web y la ciencia de datos. Con experiencia en proyectos académicos utilizando React, Node.js y Python. Busco oportunidades para aplicar mis conocimientos en un entorno empresarial.',
    habilidades: ['React', 'TypeScript', 'Node.js', 'Python', 'SQL', 'Git', 'Docker'],
    areasInteres: ['Desarrollo Web', 'Ciencia de Datos', 'Cloud Computing'],
    email: 'estudiante@correo.itm.edu.co',
    telefono: '+57 300 123 4567',
    hojaVidaUrl: '/documentos/hoja-vida-juan-perez.pdf',
  },
  {
    id: '2',
    nombre: 'María González López',
    programa: 'Ingeniería de Sistemas',
    semestre: 7,
    promedio: 4.0,
    descripcion:
      'Estudiante destacada con gran interés en el desarrollo móvil y UX/UI. He trabajado en varios proyectos de aplicaciones móviles durante mis estudios y me apasiona crear experiencias de usuario intuitivas.',
    habilidades: ['Flutter', 'Dart', 'Figma', 'React Native', 'Firebase', 'JavaScript'],
    areasInteres: ['Desarrollo Móvil', 'UX/UI Design', 'Desarrollo Web'],
    email: 'maria.gonzalez@correo.itm.edu.co',
    telefono: '+57 300 234 5678',
  },
  {
    id: '3',
    nombre: 'Carlos Rodríguez Sánchez',
    programa: 'Ingeniería de Sistemas',
    semestre: 8,
    promedio: 3.9,
    descripcion:
      'Apasionado por la seguridad informática y el desarrollo backend. Experiencia en desarrollo de APIs RESTful y manejo de bases de datos. Interesado en aprender sobre arquitecturas escalables.',
    habilidades: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'Kubernetes', 'AWS'],
    areasInteres: ['Backend Development', 'Seguridad Informática', 'DevOps'],
    email: 'carlos.rodriguez@correo.itm.edu.co',
    telefono: '+57 300 345 6789',
    hojaVidaUrl: '/documentos/hoja-vida-carlos-rodriguez.pdf',
  },
  {
    id: '4',
    nombre: 'Ana María Ramírez',
    programa: 'Ingeniería Electrónica',
    semestre: 9,
    promedio: 4.2,
    descripcion:
      'Estudiante de Ingeniería Electrónica con fuerte enfoque en IoT y sistemas embebidos. He desarrollado proyectos de automatización y tengo conocimientos en programación de microcontroladores.',
    habilidades: ['C++', 'Arduino', 'Raspberry Pi', 'Python', 'MQTT', 'Linux'],
    areasInteres: ['Internet of Things', 'Sistemas Embebidos', 'Automatización'],
    email: 'ana.ramirez@correo.itm.edu.co',
    telefono: '+57 300 456 7890',
  },
  {
    id: '5',
    nombre: 'Luis Fernando Torres',
    programa: 'Ingeniería de Telecomunicaciones',
    semestre: 8,
    promedio: 3.7,
    descripcion:
      'Interesado en redes de datos y telecomunicaciones. Experiencia práctica con configuración de routers, switches y administración de redes. Busco expandir mis conocimientos en infraestructura IT.',
    habilidades: ['Cisco', 'Networking', 'Linux', 'Python', 'Wireshark', 'TCP/IP'],
    areasInteres: ['Redes', 'Infraestructura IT', 'Ciberseguridad'],
    email: 'luis.torres@correo.itm.edu.co',
    telefono: '+57 300 567 8901',
  },
  {
    id: '6',
    nombre: 'Diana Patricia Múnera',
    programa: 'Ingeniería de Sistemas',
    semestre: 7,
    promedio: 4.1,
    descripcion:
      'Desarrolladora full-stack con pasión por crear soluciones tecnológicas innovadoras. Experiencia en desarrollo de aplicaciones web modernas y gestión de bases de datos.',
    habilidades: ['Vue.js', 'Node.js', 'MongoDB', 'Express', 'HTML', 'CSS', 'JavaScript'],
    areasInteres: ['Desarrollo Full-Stack', 'Bases de Datos', 'Desarrollo Web'],
    email: 'diana.munera@correo.itm.edu.co',
    telefono: '+57 300 678 9012',
    hojaVidaUrl: '/documentos/hoja-vida-diana-munera.pdf',
  },
  {
    id: '7',
    nombre: 'Andrés Felipe Gómez',
    programa: 'Ingeniería de Sistemas',
    semestre: 8,
    promedio: 3.6,
    descripcion:
      'Entusiasta del análisis de datos y machine learning. He trabajado con Python para análisis estadístico y visualización de datos. Busco aplicar técnicas de IA en problemas reales.',
    habilidades: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Matplotlib', 'SQL'],
    areasInteres: ['Data Science', 'Machine Learning', 'Business Intelligence'],
    email: 'andres.gomez@correo.itm.edu.co',
    telefono: '+57 300 789 0123',
  },
  {
    id: '8',
    nombre: 'Catalina Vélez Restrepo',
    programa: 'Ingeniería Electrónica',
    semestre: 7,
    promedio: 3.9,
    descripcion:
      'Estudiante con interés en procesamiento de señales y desarrollo de hardware. Experiencia en diseño de circuitos y programación de microcontroladores para aplicaciones industriales.',
    habilidades: ['C', 'Verilog', 'MATLAB', 'PCB Design', 'Embedded Systems', 'ARM'],
    areasInteres: ['Procesamiento de Señales', 'Hardware Design', 'Electrónica Industrial'],
    email: 'catalina.velez@correo.itm.edu.co',
    telefono: '+57 300 890 1234',
  },
];

// Estudiantes seleccionados por empresas (ejemplo para la empresa con id '4')
export const SELECCIONES_EMPRESA: EstudianteSeleccionado[] = [
  {
    id: 'sel-1',
    estudianteId: '1',
    empresaId: '4',
    fechaSeleccion: '2026-04-15T10:30:00',
  },
  {
    id: 'sel-2',
    estudianteId: '3',
    empresaId: '4',
    fechaSeleccion: '2026-04-16T14:20:00',
  },
  {
    id: 'sel-3',
    estudianteId: '6',
    empresaId: '4',
    fechaSeleccion: '2026-04-18T09:15:00',
  },
];

// Función para obtener estudiantes seleccionados por una empresa
export function getEstudiantesSeleccionados(
  empresaId: string
): EstudianteDisponible[] {
  const selecciones = SELECCIONES_EMPRESA.filter(
    (sel) => sel.empresaId === empresaId
  );

  return selecciones
    .map((sel) => {
      const estudiante = ESTUDIANTES_DISPONIBLES.find(
        (est) => est.id === sel.estudianteId
      );
      return estudiante;
    })
    .filter((est): est is EstudianteDisponible => est !== undefined);
}

// Función para verificar si un estudiante ya fue seleccionado
export function isEstudianteSeleccionado(
  empresaId: string,
  estudianteId: string
): boolean {
  return SELECCIONES_EMPRESA.some(
    (sel) => sel.empresaId === empresaId && sel.estudianteId === estudianteId
  );
}

// Programas disponibles para filtros
export const PROGRAMAS_DISPONIBLES = [
  'Todos',
  'Ingeniería de Sistemas',
  'Ingeniería Electrónica',
  'Ingeniería de Telecomunicaciones',
];
