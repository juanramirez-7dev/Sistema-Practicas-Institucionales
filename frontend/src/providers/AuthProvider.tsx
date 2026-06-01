import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { useNavigate } from "react-router";

import { AuthContext } from "../context/AuthContext";
import type { User, Login } from "../types/authTypes";
import { authService } from "../services/authService";
import { getUrlForRole } from "../util/getUrlForRole";

export function AuthProvider({ children }: { children: ReactNode }) {
  
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: user = null, isLoading: meLoading } = useQuery<User | null, Error>({
    queryKey: ["user"],
    queryFn: ()=> authService.getMe(),
  }) 

  const loginMutation = useMutation<User, Error, Login>({
    mutationFn: (credentials) => authService.login(credentials),
  })

  const logoutMutation = useMutation<void, Error>({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
    }
  })


  const login =  async (credentials: Login) : Promise<void>  => {
    const data = await loginMutation.mutateAsync(credentials);
    const url = getUrlForRole(data.rol);
    navigate(url);
  };

  const logout = async (): Promise<void> => {
    logoutMutation.mutate();
  };


  return (
    <AuthContext.Provider value={{
      user,
      meLoading,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}

