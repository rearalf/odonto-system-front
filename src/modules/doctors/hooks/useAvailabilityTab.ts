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
  AvailabilityListParams,
} from '../types/Availability';
import { useNavigate } from 'react-router-dom';

function useAvailabilityTab(
  doctorId: string | number,
): UseAvailabilityTabReturn {
  const navigate = useNavigate();
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [recurrenteModal, setRecurrenteModal] = useState<{
    isOpen: boolean;
    initialData?: AvailabilityBlock;
  }>({ isOpen: false });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortKey, setSortKey] = useState<
    'dayOfWeek' | 'specificDate' | 'startTime' | 'endTime' | 'createdAt'
  >('dayOfWeek');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [isRecurringFilter, setIsRecurringFilter] = useState<
    boolean | undefined
  >(undefined);
  const [dateRange, setDateRange] = useState('');

  const [rangeStart, rangeEnd] = dateRange.split(' - ');
  const isRangeComplete = !!rangeStart && !!rangeEnd && rangeEnd.trim() !== '';

  const queryParams: AvailabilityListParams = {
    doctorId,
    isRecurring: isRecurringFilter,
    from: isRangeComplete ? rangeStart : undefined,
    to: isRangeComplete ? rangeEnd : undefined,
    page,
    per_page: pageSize,
    sort: sortKey,
    order: sortDirection.toUpperCase() as 'ASC' | 'DESC',
    pagination: true,
  };

  const {
    data: availabilityResponse,
    isLoading,
    isError,
    isRefetching,
    refetch,
  } = useDoctorAvailabilityQuery(queryParams);

  const deleteAvailMutation = useDoctorAvailabilityDeleteMutation();

  const handleReloadPage = () => {
    setPage(1);
    setPageSize(10);
    setSortKey('dayOfWeek');
    setSortDirection('asc');
    setIsRecurringFilter(undefined);
    setDateRange('');
    refetch();
  };

  const dayNames = [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];

  const availabilityData = availabilityResponse?.data ?? [];

  const recurrentesRows: RowData[] = availabilityData.map((b) => ({
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
          }).replace(/^\w/, (c) => c.toUpperCase())
        : '—',
  }));

  const total =
    availabilityResponse?.meta?.total_count ?? recurrentesRows.length;

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
    } finally {
      refetch();
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
    refetch();
  };

  const handleSortChange = (key: string, direction: 'asc' | 'desc') => {
    setSortKey(
      key as
        | 'dayOfWeek'
        | 'specificDate'
        | 'startTime'
        | 'endTime'
        | 'createdAt',
    );
    setSortDirection(direction);
  };

  const handleFilterChange = (
    field: 'isRecurring' | 'dateRange',
    value: boolean | undefined | string,
  ) => {
    if (field === 'isRecurring')
      setIsRecurringFilter(value as boolean | undefined);
    else if (field === 'dateRange') setDateRange(value as string);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => setPage(newPage);
  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(1);
  };

  const handlePlantilla = () =>
    navigate(`/doctors/${doctorId}/availability/edit`);

  return {
    isError,
    deleteId,
    isLoading: isRefetching || isLoading,
    recurrenteModal,
    recurrentesRows,
    total,
    page,
    pageSize,
    sortKey,
    sortDirection,
    isRecurringFilter,
    dateRange,
    deleteAvailMutation,
    setDeleteId,
    handlePlantilla,
    openCreateModal,
    openEditModal,
    handleReloadPage,
    handleDeleteRequest,
    handleCancelDelete,
    handleConfirmDelete,
    handleRecurrenteModalClose,
    handleModalSuccess,
    handleSortChange,
    handleFilterChange,
    handlePageChange,
    handlePageSizeChange,
  };
}

export default useAvailabilityTab;
