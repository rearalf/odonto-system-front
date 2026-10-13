export interface Slot {
  startTime: string;
  endTime: string;
  maxCapacity: number;
  occupiedSpots: number;
  availableSpots: number;
  isAvailable: boolean;
}

export interface DoctorSlotsResponse {
  slots: Slot[];
}

export interface SlotsQueryParams {
  doctorId: string | number;
  date: string;
}