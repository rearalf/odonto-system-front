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
  UnavailabilityListParams,
} from '../types/Unavailability';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

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

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortKey, setSortKey] = useState<'startTime' | 'endTime' | 'createdAt'>(
    'startTime',
  );
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const queryParams: UnavailabilityListParams = {
    doctorId,
    from: from || undefined,
    to: to || undefined,
    page,
    per_page: pageSize,
    sort: sortKey,
    order: sortDirection.toUpperCase() as 'ASC' | 'DESC',
    pagination: true,
  };

  const {
    data: unavailabilityResponse,
    isLoading,
    isError,
    isRefetching,
    refetch,
  } = useDoctorUnavailabilityQuery(queryParams);

  const deleteUnavailMutation = useDoctorUnavailabilityDeleteMutation();

  const handleReloadPage = () => {
    setPage(1);
    setPageSize(10);
    setSortKey('startTime');
    setSortDirection('asc');
    setFrom('');
    setTo('');
    refetch();
  };

  const unavailabilityData = unavailabilityResponse?.data ?? [];

  const unavailabilityRowData: RowData[] = unavailabilityData.map((u) => ({
    id: u.id,
    startTime: u.startTime,
    endTime: u.endTime,
    isRecurring: false,
    specificDate: u.startTime,
    reason: u.reason,
    type: 'excepcion' as BlockType,
    day: format(new Date(u.startTime), 'EEE, dd/MM/yyyy', {
      locale: es,
    }).replace(/^\w/, (c) => c.toUpperCase()),
  }));

  const total =
    unavailabilityResponse?.meta?.total_count ?? unavailabilityRowData.length;

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

  const handleSortChange = (key: string, direction: 'asc' | 'desc') => {
    setSortKey(key as 'startTime' | 'endTime' | 'createdAt');
    setSortDirection(direction);
  };

  const handleFilterChange = (field: 'from' | 'to', value: string) => {
    if (field === 'from') setFrom(value);
    else setTo(value);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => setPage(newPage);
  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setPage(1);
  };

  return {
    isError,
    deleteId,
    isLoading: isRefetching || isLoading,
    unavailabilityModal,
    viewModal,
    unavailabilityRowData,
    total,
    page,
    pageSize,
    sortKey,
    sortDirection,
    from,
    to,
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
    handleSortChange,
    handleFilterChange,
    handlePageChange,
    handlePageSizeChange,
  };
}

export default useUnavailabilityTab;
