import type { ErrorResponse } from '../../types/genericTypes';

const BASE_URL = 'https://localhost:7200/api';

export async function callApi<T>(endpoint: string, options?: RequestInit): Promise<T> {

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    credentials: 'include',
    ...options,
  });

  if (!response.ok) {
    const errorText = await response.text();
    const errorData = errorText ? (JSON.parse(errorText) as ErrorResponse) : null;
    throw new Error(errorData?.message || 'Error en la solicitud');
  }

  const responseText = await response.text();
  if (!responseText) {
    return undefined as unknown as T;
  }

  return JSON.parse(responseText) as T;

}
