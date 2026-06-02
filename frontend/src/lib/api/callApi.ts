import type { ErrorResponse } from '../../types/genericTypes';

const BASE_URL = 'https://localhost:7200/api';

export async function callApi<T>(endpoint: string, options?: RequestInit): Promise<T> {

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    credentials: 'include',
    ...options,
  });

  if (!response.ok) {
    const errorData: ErrorResponse = await response.json();
    throw new Error(errorData.message || 'Error en la solicitud');
  }

  const data: T = await response.json();
  return data;

}
