import { http } from '@/shared/services/http';

import type { RadiographyReportPayload } from '../types/RadiographyReport';

/**
 * CAPA 1 — Red pura. Sin React, sin React Query, sin toasts.
 * POST devuelve un binario PDF (blob).
 */
export const radiographyReportApi = {
  generatePdf: (payload: RadiographyReportPayload) =>
    http.post<Blob>('/radiography-reports/generate-pdf', payload, {
      responseType: 'blob',
    }),
};
