import { Navigate, Outlet } from "react-router"

import { useAuth } from "../../hooks/useAuth"
import { getUrlForRole } from "../../util/getUrlForRole"
import type { UserRole } from "../../types/authTypes"

type ProtectedRouteProps = {
  roles: UserRole[]
}

export function ProtectedRoute({ roles }: ProtectedRouteProps) {

  const { user, meLoading } = useAuth() 

  if (meLoading) return <div>Loading...</div>

  if (!user) return <Navigate to="/login"  replace/>

  const url = getUrlForRole(user.rol)

  if (!roles.includes(user.rol)) return <Navigate to={url} replace /> 

  return <Outlet />
}