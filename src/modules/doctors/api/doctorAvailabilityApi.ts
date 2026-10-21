import { http } from '@/shared/services/http';
import type { PaginatedResponse } from '@/shared/types/pagination';
import type {
  DoctorAvailabilityResponse,
  BulkAvailabilityPayload,
  AvailabilityBlock,
  CreateAvailabilityPayload,
  UpdateAvailabilityPayload,
  AvailabilityListParams,
} from '../types/Availability';

export const doctorAvailabilityApi = {
  list: (params: AvailabilityListParams) =>
    http.get<PaginatedResponse<AvailabilityBlock>>(
      `/doctors/${params.doctorId}/availability`,
      {
        params: {
          isRecurring: params.isRecurring,
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

  bulkUpdate: (doctorId: string | number, payload: BulkAvailabilityPayload) =>
    http.put<DoctorAvailabilityResponse>(`/doctors/${doctorId}/availability/bulk`, payload),

  create: (doctorId: string | number, payload: CreateAvailabilityPayload) =>
    http.post<AvailabilityBlock>(`/doctors/${doctorId}/availability`, payload),

  update: (
    doctorId: string | number,
    id: number,
    payload: UpdateAvailabilityPayload,
  ) =>
    http.patch<AvailabilityBlock>(
      `/doctors/${doctorId}/availability/${id}`,
      payload,
    ),

  remove: (doctorId: string | number, id: number) =>
    http.delete<void>(`/doctors/${doctorId}/availability/${id}`),

  getSlots: (doctorId: string | number, date: string) =>
    http.get<{ slots: Array<{ startTime: string; endTime: string; available: boolean; maxPatients: number; currentPatients: number }> }>(
      `/doctors/${doctorId}/available-slots`,
      { params: { date } },
    ),
};