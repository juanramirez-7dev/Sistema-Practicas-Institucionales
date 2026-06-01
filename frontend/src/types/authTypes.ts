type UserRole = "estudiante" | "empresa" | "oficina" | "asesor";

interface Login {
  login: string;
  password: string;
}

interface User {
  id: string;
  rol: UserRole;
}

export type { Login, User, UserRole };