import type { UserRole } from "../types/authTypes";

export const getUrlForRole = (rol: UserRole): string => {
  switch (rol) {
    case "estudiante":
      return "/estudiante";
    case "empresa":
      return "/empresa";
    case "oficina": 
      return "/oficina";
    case "asesor":
      return "/asesor";
    default:
      return "/login";
  }
}