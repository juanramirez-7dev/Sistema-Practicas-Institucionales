import { callApi } from '../lib/api/callApi';
import type { NotificacionesResponse } from '../types/estudianteTypes';

async function getNotificaciones(): Promise<NotificacionesResponse> {
  return await callApi<NotificacionesResponse>('/Notificacion');
}

async function markNotificacionLeida(id: string): Promise<void> {
  return await callApi<void>(`/Notificacion/${id}/leida`, {
    method: 'PATCH',
  });
}

export const notificationService = {
  getNotificaciones,
  markNotificacionLeida,
};
