import { http } from '@/shared/services/http';
import type { DoctorAvailabilityResponse, BulkAvailabilityPayload } from '../types/Availability';

export const doctorAvailabilityApi = {
  get: (doctorId: string | number) =>
    http.get<DoctorAvailabilityResponse>(`/doctors/${doctorId}/availability`),

  bulkUpdate: (doctorId: string | number, payload: BulkAvailabilityPayload) =>
    http.put<DoctorAvailabilityResponse>(`/doctors/${doctorId}/availability/bulk`, payload),
};