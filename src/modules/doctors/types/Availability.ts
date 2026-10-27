import type { Control, FieldErrors } from 'react-hook-form';
import type {
  AvailabilityBlockFormValues,
  WeeklyScheduleFormValues,
} from '../schemas/AvailabilitySchema';
import type { BlockType, RowData } from './HorarioTab';
export type { BlockType, RowData };

export interface AvailabilityBlock {
  id?: number;
  startTime: string;
  endTime: string;
  slotDuration: number;
  maxPatientsPerSlot: number;
  isRecurring: boolean;
  dayOfWeek: number;
  specificDate?: string | null;
}

export interface AvailabilityListParams {
  doctorId: string | number;
  isRecurring?: boolean;
  from?: string;
  to?: string;
  page?: number;
  per_page?: number;
  sort?: 'dayOfWeek' | 'specificDate' | 'startTime' | 'endTime' | 'createdAt';
  order?: 'ASC' | 'DESC';
  pagination?: boolean;
}

export type DoctorAvailabilityResponse = AvailabilityBlock[];

export interface BulkAvailabilityPayload {
  blocks: Omit<AvailabilityBlock, 'id'>[];
}

export interface CreateAvailabilityPayload {
  startTime: string;
  endTime: string;
  slotDuration: number;
  maxPatientsPerSlot: number;
  isRecurring: boolean;
  dayOfWeek?: number;
  specificDate?: string | null;
}

export interface UpdateAvailabilityPayload {
  startTime?: string;
  endTime?: string;
  slotDuration?: number;
  maxPatientsPerSlot?: number;
  isRecurring?: boolean;
  dayOfWeek?: number;
  specificDate?: string | null;
}

export type DayOfWeek = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface AvailabilityModalState {
  isOpen: boolean;
  initialData?: AvailabilityBlock;
}

export interface UseAvailabilityTabReturn {
  isError: boolean;
  deleteId: number | null;
  isLoading: boolean;
  recurrenteModal: AvailabilityModalState;
  recurrentesRows: RowData[];
  total: number;
  page: number;
  pageSize: number;
  sortKey: 'dayOfWeek' | 'specificDate' | 'startTime' | 'endTime' | 'createdAt';
  sortDirection: 'asc' | 'desc';
  isRecurringFilter: boolean | undefined;
  dateRange: string;
  deleteAvailMutation: {
    isPending: boolean;
    mutateAsync: (params: {
      doctorId: string | number;
      id: number;
    }) => Promise<void>;
  };
  setDeleteId: (id: number | null) => void;
  handlePlantilla: () => void;
  openCreateModal: () => void;
  openEditModal: (block: RowData) => void;
  handleReloadPage: () => void;
  handleDeleteRequest: (id: number) => void;
  handleCancelDelete: () => void;
  handleConfirmDelete: () => Promise<void>;
  handleRecurrenteModalClose: () => void;
  handleModalSuccess: () => void;
  handleSortChange: (key: string, direction: 'asc' | 'desc') => void;
  handleFilterChange: (
    field: 'isRecurring' | 'dateRange',
    value: boolean | undefined | string,
  ) => void;
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (pageSize: number) => void;
}

export interface DayScheduleCardProps {
  day: { value: DayOfWeek; label: string };
  shifts: {
    block: AvailabilityBlockFormValues;
    index: number;
  }[];
  isEnabled: boolean;
  blocks: AvailabilityBlockFormValues[];
  isPending: boolean;
  errors: FieldErrors<WeeklyScheduleFormValues>;
  control: Control<WeeklyScheduleFormValues>;
  updateBlock: (
    index: number,
    updates: Partial<AvailabilityBlockFormValues>,
  ) => void;
  removeShift: (index: number) => void;
  addShift: (dayOfWeek: DayOfWeek) => void;
  DEFAULT_SLOT_DURATION: number;
  DEFAULT_MAX_PATIENTS_PER_SLOT: number;
}
