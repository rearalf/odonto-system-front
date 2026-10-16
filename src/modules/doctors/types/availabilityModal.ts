import type { AvailabilityBlock } from './Availability';
import type { Unavailability } from './Unavailability';

export type AvailabilityModalMode = 'recurrente' | 'excepcion';

export interface UnifiedBlock {
  id?: number;
  startTime: string;
  endTime: string;
  slotDuration?: number;
  maxPatientsPerSlot?: number;
  isRecurring?: boolean;
  dayOfWeek?: number;
  specificDate?: string | null;
  reason?: string;
  type: AvailabilityModalMode;
}

export interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctorId: string | number;
  initialData?: UnifiedBlock;
  onSuccess?: () => void;
}

export interface RecurrenteModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctorId: string | number;
  initialData?: AvailabilityBlock;
  onSuccess?: () => void;
}

export interface ExcepcionModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctorId: string | number;
  initialData?: Unavailability;
  onSuccess?: () => void;
}

export interface UseRecurrenteFormProps {
  doctorId: string | number;
  initialData?: AvailabilityBlock;
  isEditing: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export interface UseExcepcionFormProps {
  doctorId: string | number;
  initialData?: Unavailability;
  isEditing: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}