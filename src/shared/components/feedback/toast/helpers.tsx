import { toast, type ExternalToast } from 'sonner';
import { normalizeError } from '@/shared/services/http/apiError';

type ToastData = ExternalToast;

const DEFAULT_TITLE = {
  success: 'Operación exitosa',
  error: 'Ocurrió un error',
  warning: 'Advertencia',
  info: 'Información',
  loading: 'Procesando…',
} as const;

export function showSuccess(message?: string, data?: ToastData) {
  return toast.success(message ?? DEFAULT_TITLE.success, data);
}

export function showError(message?: string, data?: ToastData) {
  return toast.error(message ?? DEFAULT_TITLE.error, data);
}

export function showWarning(message?: string, data?: ToastData) {
  return toast.warning(message ?? DEFAULT_TITLE.warning, data);
}

export function showInfo(message?: string, data?: ToastData) {
  return toast.info(message ?? DEFAULT_TITLE.info, data);
}

export function showLoading(message?: string, data?: ToastData) {
  return toast.loading(message ?? DEFAULT_TITLE.loading, data);
}

export function showPromise<T = unknown>(
  promise: Promise<T>,
  data?: Parameters<typeof toast.promise>[1],
) {
  return toast.promise(promise, {
    loading: DEFAULT_TITLE.loading,
    success: DEFAULT_TITLE.success,
    error: DEFAULT_TITLE.error,
    ...data,
  });
}

export function showApiError(error: unknown, data?: ToastData) {
  const { message, errors } = normalizeError(error);

  const description = errors ? (
    <ul className="flex list-disc flex-col gap-1 pl-4">
      {Object.values(errors)
        .flat()
        .map((fieldError) => (
          <li key={fieldError}>{fieldError}</li>
        ))}
    </ul>
  ) : undefined;

  return toast.error(message, {
    ...data,
    description: data?.description ?? description,
  });
}
