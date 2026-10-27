import { showError, showSuccess } from '@/shared/components/feedback';

export function useCopyToClipboard() {
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showSuccess('Copiado', { description: 'Texto en portapapeles' });
    } catch {
      showError('No se pudo copiar');
    }
  };
  return { copy };
}
