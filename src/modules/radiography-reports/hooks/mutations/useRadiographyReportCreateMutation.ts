import { useMutation } from '@tanstack/react-query';

import { radiographyReportApi } from '@/modules/radiography-reports/api/radiographyReportApi';
import type { RadiographyReportPayload } from '@/modules/radiography-reports/types/RadiographyReport';

export function useRadiographyReportCreateMutation() {
  return useMutation<Blob, Error, RadiographyReportPayload>({
    mutationFn: (payload) => radiographyReportApi.generatePdf(payload),
  });
}
