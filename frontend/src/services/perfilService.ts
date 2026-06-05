import { callApi } from '../lib/api/callApi';
import type {
  PerfilProfesionalResponse,
  PerfilProfesionalUpdate,
  ListaPerfilesResponse,
  SeleccionarPerfilRequest,
  SeleccionEmpresaResponse,
} from '../types/estudianteTypes';

async function getPerfilProfesional(): Promise<PerfilProfesionalResponse> {
  return await callApi<PerfilProfesionalResponse>('/PerfilProfesional/estudiante');
}

async function updatePerfilProfesional(perfilId: string, payload: PerfilProfesionalUpdate): Promise<PerfilProfesionalResponse> {
  await callApi<void>(`/PerfilProfesional/${perfilId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  return getPerfilProfesional();
}

async function getPerfilesDisponibles(
  textoBusqueda?: string,
  carrera?: string
): Promise<ListaPerfilesResponse> {
  const params = new URLSearchParams();
  if (textoBusqueda) params.append('textoBusqueda', textoBusqueda);
  if (carrera) params.append('carrera', carrera);

  const queryString = params.toString();
  const endpoint = `/PerfilProfesional${queryString ? `?${queryString}` : ''}`;
  return await callApi<ListaPerfilesResponse>(endpoint);
}

async function getDetallePerfilEstudiante(
  estudianteId: string
): Promise<PerfilProfesionalResponse> {
  return await callApi<PerfilProfesionalResponse>(
    `/PerfilProfesional/estudiante/${estudianteId}`
  );
}

async function seleccionarPerfil(request: SeleccionarPerfilRequest): Promise<void> {
  return await callApi<void>('/SeleccionPerfil', {
    method: 'POST',
    body: JSON.stringify(request),
    headers: { 'Content-Type': 'application/json' },
  });
}

async function getSeleccionPerfilEmpresa(): Promise<SeleccionEmpresaResponse> {
  return await callApi<SeleccionEmpresaResponse>('/SeleccionPerfil/empresa');
}

async function deleteSeleccionPerfil(seleccionId: string): Promise<void> {
  return await callApi<void>(`/SeleccionPerfil/${seleccionId}`, {
    method: 'DELETE',
  });
}

export const perfilService = {
  getPerfilProfesional,
  updatePerfilProfesional,
  getPerfilesDisponibles,
  getDetallePerfilEstudiante,
  seleccionarPerfil,
  getSeleccionPerfilEmpresa,
  deleteSeleccionPerfil,
};
