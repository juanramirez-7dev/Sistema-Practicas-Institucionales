// Mock data para usuarios del sistema de prácticas ITM

export type UserRole = 'estudiante' | 'empresa' | 'oficina' | 'asesor';

export interface User {
  id: string;
  nombre: string;
  email: string;
  documento: string;
  rol: UserRole;
  activo: boolean;
}

export const MOCK_USERS: Record<string, User> = {
  // Estudiantes
  'estudiante@correo.itm.edu.co': {
    id: '1',
    nombre: 'Juan Pérez García',
    email: 'estudiante@correo.itm.edu.co',
    documento: '1234567890',
    rol: 'estudiante',
    activo: true,
  },
  'maria.gonzalez@correo.itm.edu.co': {
    id: '2',
    nombre: 'María González López',
    email: 'maria.gonzalez@correo.itm.edu.co',
    documento: '9876543210',
    rol: 'estudiante',
    activo: true,
  },
  'carlos.rodriguez@correo.itm.edu.co': {
    id: '3',
    nombre: 'Carlos Rodríguez Sánchez',
    email: 'carlos.rodriguez@correo.itm.edu.co',
    documento: '5555555555',
    rol: 'estudiante',
    activo: true,
  },

  // Empresas
  'empresa@correo.itm.edu.co': {
    id: '4',
    nombre: 'TechCorp Colombia',
    email: 'empresa@correo.itm.edu.co',
    documento: 'EMP123456',
    rol: 'empresa',
    activo: true,
  },
  'innovatech@correo.itm.edu.co': {
    id: '5',
    nombre: 'InnovaTech Solutions',
    email: 'innovatech@correo.itm.edu.co',
    documento: 'EMP789012',
    rol: 'empresa',
    activo: true,
  },

  // Oficina de prácticas
  'oficina@correo.itm.edu.co': {
    id: '6',
    nombre: 'Coordinador de Prácticas',
    email: 'oficina@correo.itm.edu.co',
    documento: 'ADMIN001',
    rol: 'oficina',
    activo: true,
  },

  // Asesores
  'asesor@correo.itm.edu.co': {
    id: '7',
    nombre: 'Ana María Ramírez',
    email: 'asesor@correo.itm.edu.co',
    documento: 'ASES001',
    rol: 'asesor',
    activo: true,
  },
};

// Función para autenticar usuario
export function authenticateUser(email: string, password: string): User | null {
  const user = MOCK_USERS[email.toLowerCase()];

  if (!user) {
    return null;
  }

  if (user.documento !== password) {
    return null;
  }

  if (!user.activo) {
    return null;
  }

  return user;
}

// Credenciales de prueba para mostrar al usuario
export const CREDENTIALS_EXAMPLES = {
  estudiante: {
    email: 'estudiante@correo.itm.edu.co',
    password: '1234567890',
  },
  empresa: {
    email: 'empresa@correo.itm.edu.co',
    password: 'EMP123456',
  },
  oficina: {
    email: 'oficina@correo.itm.edu.co',
    password: 'ADMIN001',
  },
  asesor: {
    email: 'asesor@correo.itm.edu.co',
    password: 'ASES001',
  },
};
