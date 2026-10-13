import { http } from '@/shared/services/http';
import type { DoctorSlotsResponse, SlotsQueryParams } from '../types/Slots';

export const doctorSlotsApi = {
  getSlots: (params: SlotsQueryParams) =>
    http.get<DoctorSlotsResponse>(`/doctors/${params.doctorId}/slots`, {
      params: {
        date: params.date,
      },
    }),
};