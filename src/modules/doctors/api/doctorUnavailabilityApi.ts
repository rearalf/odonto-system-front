import { http } from '@/shared/services/http';
import type {
  Unavailability,
  UnavailabilityListParams,
  CreateUnavailabilityPayload,
  UpdateUnavailabilityPayload,
} from '../types/Unavailability';

export const doctorUnavailabilityApi = {
  list: (params: UnavailabilityListParams) =>
    http.get<Unavailability[]>(`/doctors/${params.doctorId}/unavailability`, {
      params: {
        from: params.from,
        to: params.to,
      },
    }),

  create: (doctorId: string | number, payload: CreateUnavailabilityPayload) =>
    http.post<Unavailability>(`/doctors/${doctorId}/unavailability`, payload),

  update: (
    doctorId: string | number,
    id: number,
    payload: UpdateUnavailabilityPayload,
  ) =>
    http.patch<Unavailability>(
      `/doctors/${doctorId}/unavailability/${id}`,
      payload,
    ),

  remove: (doctorId: string | number, id: number) =>
    http.delete<void>(`/doctors/${doctorId}/unavailability/${id}`),
};
