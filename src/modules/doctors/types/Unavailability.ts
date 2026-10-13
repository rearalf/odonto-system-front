export interface Unavailability {
  id: number;
  startTime: string;
  endTime: string;
  reason: string;
}

export interface UnavailabilityListParams {
  doctorId: string | number;
  from?: string;
  to?: string;
}

export interface CreateUnavailabilityPayload {
  startTime: string;
  endTime: string;
  reason: string;
}

export interface UpdateUnavailabilityPayload {
  startTime?: string;
  endTime?: string;
  reason?: string;
}