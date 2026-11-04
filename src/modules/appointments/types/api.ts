export type AppointmentStatus = {
  id: number;
  name: string;
  color: string;
  description: string;
};

export type AppointmentCreatePayload = {
  reason: string;
  notes?: string;
  status: string;
  start_time: string;
  end_time: string;
  doctor_id: number;
  patient_id: number;
  is_walk_in: boolean;
};

export type AppointmentResponse = { id: number } & AppointmentCreatePayload;