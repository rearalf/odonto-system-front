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

export const DAYS_OF_WEEK: {
  value: DayOfWeek;
  label: string;
  shortLabel: string;
}[] = [
  { value: 0, label: 'Domingo', shortLabel: 'Dom' },
  { value: 1, label: 'Lunes', shortLabel: 'Lun' },
  { value: 2, label: 'Martes', shortLabel: 'Mar' },
  { value: 3, label: 'Miércoles', shortLabel: 'Mié' },
  { value: 4, label: 'Jueves', shortLabel: 'Jue' },
  { value: 5, label: 'Viernes', shortLabel: 'Vie' },
  { value: 6, label: 'Sábado', shortLabel: 'Sáb' },
];

export const DEFAULT_SLOT_DURATION = 30;
export const DEFAULT_MAX_PATIENTS_PER_SLOT = 1;
export const VALID_SLOT_DURATIONS = [15, 20, 30, 45, 60] as const;

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
  from: string;
  to: string;
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
    field: 'isRecurring' | 'from' | 'to',
    value: boolean | undefined | string,
  ) => void;
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (pageSize: number) => void;
}
