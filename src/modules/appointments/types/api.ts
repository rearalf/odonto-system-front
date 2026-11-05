export type AppointmentStatus = {
  id: number;
  name: string;
  color: string;
  description: string;
};

export type AppointmentCreatePayload = {
  // Appointment fields
  start_time: string;
  end_time: string;
  doctor_id: number;
  statusId: number;
  is_walk_in: boolean;
  allow_overbooking: boolean;
  reason: string;
  notes?: string;
  // Patient fields (when creating new patient in same transaction)
  patient_id?: number;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  birthDate?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  phone?: string;
  address?: string;
  occupation?: string;
  userId?: number;
  medicalHistory?: string;
  allergicReactions?: string;
  currentSystemicTreatment?: string;
  labResults?: string;
  completeOdontogram?: boolean;
  hasSncIssues?: boolean;
  hasSvcIssues?: boolean;
  hasSeIssues?: boolean;
  hasSmeIssues?: boolean;
  hasSrIssues?: boolean;
  hasSuIssues?: boolean;
  hasSguIssues?: boolean;
  hasSgiIssues?: boolean;
  systemEvaluationNotes?: string;
  profilePicture?: File;
};

export type AppointmentResponse = {
  id: number;
  patientId: number;
  patientFullName: string;
  doctorId: number;
  doctorFullName: string;
  startTime: string;
  endTime: string;
  status: string;
  statusColor: string;
};