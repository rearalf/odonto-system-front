import { http } from '@/shared/services/http';
import type {
  DoctorAvailabilityResponse,
  BulkAvailabilityPayload,
  AvailabilityBlock,
  CreateAvailabilityPayload,
  UpdateAvailabilityPayload,
} from '../types/Availability';

export const doctorAvailabilityApi = {
  get: (doctorId: string | number) =>
    http.get<DoctorAvailabilityResponse>(`/doctors/${doctorId}/availability`),

  bulkUpdate: (doctorId: string | number, payload: BulkAvailabilityPayload) =>
    http.put<DoctorAvailabilityResponse>(`/doctors/${doctorId}/availability/bulk`, payload),

  create: (doctorId: string | number, payload: CreateAvailabilityPayload) =>
    http.post<AvailabilityBlock>(`/doctors/${doctorId}/availability`, payload),

  update: (doctorId: string | number, id: number, payload: UpdateAvailabilityPayload) =>
    http.patch<AvailabilityBlock>(`/doctors/${doctorId}/availability/${id}`, payload),

  remove: (doctorId: string | number, id: number) =>
    http.delete<void>(`/doctors/${doctorId}/availability/${id}`),

  getSlots: (doctorId: string | number, date: string) =>
    http.get<{ slots: Array<{ startTime: string; endTime: string; available: boolean; maxPatients: number; currentPatients: number }> }>(
      `/doctors/${doctorId}/available-slots`,
      { params: { date } },
    ),
};