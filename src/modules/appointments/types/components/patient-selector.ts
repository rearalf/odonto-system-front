import type { Control, FieldErrors } from 'react-hook-form';
import type { PatientListItem } from '@/modules/patients/types/PatientList';
import type { AppointmentCreateFormValues } from '@/modules/appointments/schemas/AppointmentCreateSchema';
import type { PatientCardData } from '../domain';

export type PatientSelectorProps = {
  patientId: number | null;
  patientMode: 'search' | 'new';
  cardData: PatientCardData;
  error?: string;
  isModalOpen: boolean;
  onSelectExisting: (patient: PatientListItem) => void;
  onClearPatient: () => void;
  onEditPatient: () => void;
  onOpenNewPatientModal: () => void;
  onClosePatientModal: () => void;
  onSaveNewPatient: () => void;
  control: Control<AppointmentCreateFormValues>;
  errors: FieldErrors<AppointmentCreateFormValues>;
};

export type CreatePatientModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSavePatient: () => void;
  control: Control<AppointmentCreateFormValues>;
  errors: FieldErrors<AppointmentCreateFormValues>;
};
