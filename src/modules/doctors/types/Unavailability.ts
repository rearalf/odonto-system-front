import type { BlockType, RowData } from './HorarioTab';
export type { BlockType, RowData };

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
  page?: number;
  per_page?: number;
  sort?: 'startTime' | 'endTime' | 'createdAt';
  order?: 'ASC' | 'DESC';
  pagination?: boolean;
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

export interface UseUnavailabilityFormProps {
  doctorId: string | number;
  initialData?: Unavailability;
  isEditing: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export interface UnavailabilityModalInfoProps {
  data: Unavailability | null;
  isOpen: boolean;
  onClose: () => void;
}

export interface CreateUnavailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  doctorId: string | number;
  initialData?: Unavailability;
  onSuccess?: () => void;
}

export interface UnavailabilityModalState {
  isOpen: boolean;
  initialData?: Unavailability;
}

export interface UseUnavailabilityTabReturn {
  isError: boolean;
  deleteId: number | null;
  isLoading: boolean;
  unavailabilityModal: UnavailabilityModalState;
  viewModal: UnavailabilityModalState;
  unavailabilityRowData: RowData[];
  total: number;
  page: number;
  pageSize: number;
  sortKey: 'startTime' | 'endTime' | 'createdAt';
  sortDirection: 'asc' | 'desc';
  from: string;
  to: string;
  deleteUnavailMutation: {
    isPending: boolean;
    mutateAsync: (params: {
      doctorId: string | number;
      id: number;
    }) => Promise<void>;
  };
  setDeleteId: (id: number | null) => void;
  openEditModal: (block: RowData) => void;
  openCreateModal: () => void;
  handleReloadPage: () => void;
  handleModalSuccess: () => void;
  handleCancelDelete: () => void;
  handleDeleteRequest: (id: number) => void;
  handleConfirmDelete: () => Promise<void>;
  handleCloseUnavailabilityModal: () => void;
  handleView: (row: RowData) => void;
  handleDelete: (row: RowData) => void;
  handleCloseViewModal: () => void;
  handleSortChange: (key: string, direction: 'asc' | 'desc') => void;
  handleFilterChange: (field: 'from' | 'to', value: string) => void;
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (pageSize: number) => void;
  handleDateRangeChange: (val: string) => void;
}
