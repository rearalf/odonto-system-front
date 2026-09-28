import { AxiosError } from 'axios';

export interface ApiErrorBody {
  message?: string;
  errors?: Record<string, string[]>;
}

export class ApiError extends Error {
  status?: number;
  errors?: Record<string, string[]>;

  constructor(message: string, options?: { status?: number; errors?: Record<string, string[]> }) {
    super(message);
    this.name = 'ApiError';
    this.status = options?.status;
    this.errors = options?.errors;
  }
}

function defaultMessage(status?: number): string {
  if (status === undefined) return 'No se pudo conectar con el servidor';
  if (status === 401) return 'Tu sesión ha expirado. Inicia sesión nuevamente';
  if (status === 403) return 'No tienes permisos para realizar esta acción';
  if (status === 404) return 'No se encontró el recurso solicitado';
  if (status >= 500) return 'Ocurrió un error en el servidor. Intenta nuevamente';
  return 'Ocurrió un error inesperado';
}

export function normalizeError(error: unknown): ApiError {
  if (error instanceof ApiError) return error;

  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const body = error.response?.data as ApiErrorBody | undefined;
    const message = body?.message ?? defaultMessage(status);

    return new ApiError(message, {
      status,
      errors: body?.errors,
    });
  }

  if (error instanceof Error) return new ApiError(error.message);

  return new ApiError(defaultMessage());
}