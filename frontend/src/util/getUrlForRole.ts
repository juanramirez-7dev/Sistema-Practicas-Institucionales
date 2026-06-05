import type { UserRole } from "../types/authTypes";

export const getUrlForRole = (rol: UserRole): string => {
  switch (rol) {
    case "Estudiante":
      return "/estudiante";
    case "Empresa":
      return "/empresa";
    case "Oficina": 
      return "/oficina";
    case "Asesor":
      return "/asesor";
    default:
      return "/login";
  }
}