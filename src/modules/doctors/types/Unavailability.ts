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
}
