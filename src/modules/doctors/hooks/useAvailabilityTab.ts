import { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useDoctorAvailabilityQuery } from '@/modules/doctors/hooks/queries/useDoctorAvailabilityQuery';
import { useDoctorAvailabilityDeleteMutation } from '@/modules/doctors/hooks/mutations/useDoctorAvailabilityDeleteMutation';
import {
  showLoading,
  showSuccess,
  showApiError,
} from '@/shared/components/feedback';
import type {
  RowData,
  BlockType,
  AvailabilityBlock,
  UseAvailabilityTabReturn,
} from '../types/Availability';

function useAvailabilityTab(
  doctorId: string | number,
): UseAvailabilityTabReturn {
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [recurrenteModal, setRecurrenteModal] = useState<{
    isOpen: boolean;
    initialData?: AvailabilityBlock;
  }>({ isOpen: false });

  const {
    data: availability,
    isLoading,
    isError,
    isRefetching,
    refetch,
  } = useDoctorAvailabilityQuery(doctorId);

  const handleReloadPage = () => refetch();

  const deleteAvailMutation = useDoctorAvailabilityDeleteMutation();

  const dayNames = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];

  const recurrentesRows: RowData[] = (availability ?? []).map((b) => ({
    id: b.id ?? 0,
    startTime: b.startTime,
    endTime: b.endTime,
    slotDuration: b.slotDuration,
    maxPatientsPerSlot: b.maxPatientsPerSlot,
    isRecurring: b.isRecurring,
    dayOfWeek: b.dayOfWeek,
    specificDate: b.specificDate,
    type: 'recurrente' as BlockType,
    day: b.isRecurring
      ? (dayNames[b.dayOfWeek ?? 0] ?? '—')
      : b.specificDate
        ? format(new Date(b.specificDate + 'T00:00:00'), 'eeee, dd/MM', {
            locale: es,
          })
        : '—',
  }));

  const handleDeleteRequest = (id: number) => setDeleteId(id);
  const handleCancelDelete = () => setDeleteId(null);

  const handleConfirmDelete = async () => {
    if (!deleteId) return;
    const toastId = showLoading('Eliminando horario…', {
      description: 'Procesando...',
    });
    try {
      await deleteAvailMutation.mutateAsync({ doctorId, id: deleteId });
      showSuccess('Horario eliminado', {
        description: 'El bloque se eliminó correctamente',
        id: toastId,
      });
      setDeleteId(null);
    } catch (e) {
      showApiError(e, { id: toastId });
    }
  };

  const openCreateModal = () => setRecurrenteModal({ isOpen: true });

  const openEditModal = (block: RowData) => {
    setRecurrenteModal({
      isOpen: true,
      initialData: {
        id: block.id,
        startTime: block.startTime,
        endTime: block.endTime,
        slotDuration: block.slotDuration ?? 30,
        maxPatientsPerSlot: block.maxPatientsPerSlot ?? 1,
        isRecurring: block.isRecurring,
        dayOfWeek: block.dayOfWeek ?? 1,
        specificDate: block.specificDate ?? null,
      },
    });
  };

  const handleRecurrenteModalClose = () =>
    setRecurrenteModal({ isOpen: false });

  const handleModalSuccess = () => {
    handleRecurrenteModalClose();
  };

  return {
    isError,
    deleteId,
    isLoading: isRefetching || isLoading,
    setDeleteId,
    recurrenteModal,
    recurrentesRows,
    deleteAvailMutation,
    handleReloadPage,
    handleDeleteRequest,
    handleCancelDelete,
    handleConfirmDelete,
    openCreateModal,
    openEditModal,
    handleRecurrenteModalClose,
    handleModalSuccess,
  };
}

export default useAvailabilityTab;
