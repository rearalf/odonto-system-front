export type AppointmentListItem = {
  id: number;
  patientId: number;
  doctorId: number;
  startTime: string;
  endTime: string;
  status: 'scheduled' | 'waiting';
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
  status?: ('scheduled' | 'waiting')[];
  sortBy?: 'startTime' | 'createdAt' | 'reason';
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