import { useState } from 'react';
import { useDoctorUnavailabilityQuery } from '@/modules/doctors/hooks/queries/useDoctorUnavailabilityQuery';
import { useDoctorUnavailabilityDeleteMutation } from '@/modules/doctors/hooks/mutations/useDoctorUnavailabilityDeleteMutation';
import {
  showLoading,
  showSuccess,
  showApiError,
} from '@/shared/components/feedback';
import type {
  RowData,
  BlockType,
  Unavailability,
  UseUnavailabilityTabReturn,
} from '../types/Unavailability';

function useUnavailabilityTab(
  doctorId: string | number,
): UseUnavailabilityTabReturn {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [unavailabilityModal, setUnavailabilityModal] = useState<{
    isOpen: boolean;
    initialData?: Unavailability;
  }>({ isOpen: false });
  const [viewModal, setViewModal] = useState<{
    isOpen: boolean;
    initialData?: Unavailability;
  }>({ isOpen: false });

  const {
    data: unavailability,
    isLoading,
    isError,
    isRefetching,
    refetch,
  } = useDoctorUnavailabilityQuery({ doctorId });

  const deleteUnavailMutation = useDoctorUnavailabilityDeleteMutation();

  const handleReloadPage = () => refetch();

  const unavailabilityRowData: RowData[] = (unavailability ?? []).map((u) => ({
    id: u.id,
    startTime: u.startTime,
    endTime: u.endTime,
    isRecurring: false,
    specificDate: u.startTime,
    reason: u.reason,
    type: 'excepcion' as BlockType,
    day: new Date(u.startTime).toLocaleDateString('es-ES', {
      weekday: 'short',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }),
  }));

  const toUnavailability = (row: RowData): Unavailability => ({
    id: row.id,
    startTime: row.startTime,
    endTime: row.endTime,
    reason: row.reason ?? '',
  });

  const handleDeleteRequest = (id: number) => setDeleteId(id);
  const handleCancelDelete = () => setDeleteId(null);

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    const toastId = showLoading('Eliminando excepción…', {
      description: 'Procesando...',
    });
    try {
      await deleteUnavailMutation.mutateAsync({ doctorId, id: deleteId });
      showSuccess('Excepción eliminada', {
        description: 'La excepción se eliminó correctamente',
        id: toastId,
      });
      setDeleteId(null);
    } catch (e) {
      showApiError(e, { id: toastId });
    }
  };

  const openCreateModal = () => setUnavailabilityModal({ isOpen: true });

  const openEditModal = (block: RowData) => {
    setUnavailabilityModal({
      isOpen: true,
      initialData: {
        id: block.id,
        startTime: block.startTime,
        endTime: block.endTime,
        reason: block.reason ?? '',
      },
    });
  };

  const handleCloseUnavailabilityModal = () =>
    setUnavailabilityModal({ isOpen: false });

  const handleView = (row: RowData) =>
    setViewModal({ isOpen: true, initialData: toUnavailability(row) });
  const handleDelete = (row: RowData) => handleDeleteRequest(row.id);
  const handleCloseViewModal = () => setViewModal({ isOpen: false });

  const handleModalSuccess = () => {
    handleCloseUnavailabilityModal();
  };

  return {
    isError,
    deleteId,
    isLoading: isRefetching || isLoading,
    unavailabilityModal,
    viewModal,
    unavailabilityRowData,
    deleteUnavailMutation,
    setDeleteId,
    openEditModal,
    openCreateModal,
    handleReloadPage,
    handleModalSuccess,
    handleCancelDelete,
    handleDeleteRequest,
    handleConfirmDelete,
    handleCloseUnavailabilityModal,
    handleView,
    handleDelete,
    handleCloseViewModal,
  };
}

export default useUnavailabilityTab;
