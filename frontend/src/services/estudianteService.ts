import { callApi } from '../lib/api/callApi';
import type {
  UsuarioResponse,
  ValidateCreditsResponse,
  ProcesoResponse,
  SeleccionPerfilResponse,
  DocumentoProcesoResponse,
  DocumentoProcesoTipo,
  DocumentoProcesoEstado,
} from '../types/estudianteTypes';

async function validateCredits(documento: string): Promise<ValidateCreditsResponse> {
  return await callApi<ValidateCreditsResponse>(`/Estudiante/Document/${documento}/ValidateCredits`);
}

async function startProcess(documento: string): Promise<UsuarioResponse> {
  return await callApi<UsuarioResponse>(`/Estudiante?document=${documento}`, {
    method: 'POST',
  });
}

async function getProceso(): Promise<ProcesoResponse> {
  return await callApi<ProcesoResponse>('/Proceso');
}

async function getSeleccionPerfil(): Promise<SeleccionPerfilResponse> {
  return await callApi<SeleccionPerfilResponse>('/SeleccionPerfil/estudiante');
}

async function getDocumentosProceso(): Promise<DocumentoProcesoResponse[]> {
  return await callApi<DocumentoProcesoResponse[]>('/Documento/proceso');
}

async function uploadDocumento(tipo: DocumentoProcesoTipo, file: File): Promise<DocumentoProcesoResponse> {
  const formData = new FormData();
  formData.append('Tipo', tipo);
  formData.append('File', file);
  return await callApi<DocumentoProcesoResponse>('/Documento', {
    method: 'POST',
    body: formData,
  });
}

async function replaceDocumento(documentoId: string, file: File): Promise<DocumentoProcesoResponse> {
  const formData = new FormData();
  formData.append('File', file);
  return await callApi<DocumentoProcesoResponse>(`/Documento/${documentoId}`, {
    method: 'PUT',
    body: formData,
  });
}

// base exports extended at end of file

async function getAllEstudiantes(): Promise<UsuarioResponse[]> {
  return await callApi<UsuarioResponse[]>('/Estudiante');
}

async function getProcesoByEstudiante(estudianteId: string): Promise<ProcesoResponse> {
  return await callApi<ProcesoResponse>(`/Proceso/${estudianteId}`);
}

async function getDocumentosProcesoByEstudiante(estudianteId: string): Promise<DocumentoProcesoResponse[]> {
  return await callApi<DocumentoProcesoResponse[]>(`/Documento/proceso/${estudianteId}`);
}

async function updateDocumentoEstado(documentoId: string, payload: { estado: DocumentoProcesoEstado; observacion?: string | null; }): Promise<void> {
  return await callApi<void>(`/Documento/${documentoId}/estado`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

// extend export
export const estudianteService = {
  validateCredits,
  startProcess,
  getProceso,
  getSeleccionPerfil,
  getDocumentosProceso,
  uploadDocumento,
  replaceDocumento,
  getAllEstudiantes,
  getProcesoByEstudiante,
  getDocumentosProcesoByEstudiante,
  updateDocumentoEstado,
};
