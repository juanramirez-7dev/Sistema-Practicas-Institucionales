type UserRole = "Estudiante" | "Empresa" | "Oficina" | "Asesor";

interface Login {
  login: string;
  password: string;
}

interface User {
  id: string;
  rol: UserRole;
}

export type { Login, User, UserRole };