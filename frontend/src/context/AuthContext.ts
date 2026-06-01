import { createContext } from "react";

import type { User, Login } from "../types/authTypes";

interface AuthContextType {
  user: User | null;
  meLoading: boolean;
  login: (credentials: Login) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | null>(null);