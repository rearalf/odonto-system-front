export type AppointmentListItem = {
  id: number;
  patientId: number;
  doctorId: number;
  startTime: string;
  endTime: string;
  status: string;
  reason: string;
  isWalkIn: boolean;
  patientFullName: string;
  doctorFullName: string;
  statusColor: string;
  durationMinutes: number;
  rescheduled: boolean;
  createdAt: string;
  modifiedAt: string | null;
};

export type AppointmentListParams = {
  page?: number;
  per_page?: number;
  doctorId?: number;
  from?: string;
  to?: string;
  patientName?: string;
  status?: number[];
  sortBy?: 'startTime' | 'createdAt' | 'reason';
  sortOrder?: 'ASC' | 'DESC';
};

export type AppointmentListResponse = {
  data: AppointmentListItem[];
  meta: {
    total_count: number;
    total_pages: number;
    page: number;
    per_page: number;
  };
};