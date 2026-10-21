import { http } from '@/shared/services/http';
import type { PaginatedResponse } from '@/shared/types/pagination';
import type {
  Unavailability,
  UnavailabilityListParams,
  CreateUnavailabilityPayload,
  UpdateUnavailabilityPayload,
} from '../types/Unavailability';

export const doctorUnavailabilityApi = {
  list: (params: UnavailabilityListParams) =>
    http.get<PaginatedResponse<Unavailability>>(
      `/doctors/${params.doctorId}/unavailability`,
      {
        params: {
          from: params.from,
          to: params.to,
          page: params.page,
          per_page: params.per_page,
          sort: params.sort,
          order: params.order,
          pagination: params.pagination,
        },
      },
    ),

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
