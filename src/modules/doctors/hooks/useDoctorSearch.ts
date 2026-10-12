import { useState, type FormEvent } from 'react';

import {
  showSuccess,
  showLoading,
  showApiError,
} from '@/shared/components/feedback';
import { useDoctorList } from './useDoctorList';
import type { DoctorListItem } from '../types/Doctor';
import useDoctorDeleteMutation from './mutations/useDoctorDeleteMutation';

function useDoctorSearch() {
  const list = useDoctorList();
  const deleteMutation = useDoctorDeleteMutation();
  const [searchInput, setSearchInput] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorListItem | null>(
    null,
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    list.applySearch(searchInput.trim());
  };

  const handleClear = () => {
    setSearchInput('');
    list.applySearch('');
  };

  const requestDelete = (patient: DoctorListItem) => setSelectedDoctor(patient);

  const cancelDelete = () => setSelectedDoctor(null);

  const handleConfirmDelete = async () => {
    if (!selectedDoctor) return;

    const toastId = showLoading('Eliminando doctor…', {
      description: 'Procesando...',
    });

    try {
      await deleteMutation.mutateAsync(selectedDoctor.id);
      showSuccess('Doctor eliminado', {
        description: 'El doctor se eliminó correctamente',
        id: toastId,
      });
      setSelectedDoctor(null);
    } catch (error) {
      showApiError(error, { id: toastId });
    }
  };

  return {
    ...list,
    searchInput,
    selectedDoctor,
    isDeleteModalOpen: selectedDoctor !== null,
    isDeleting: deleteMutation.isPending,
    deletingId: deleteMutation.isPending ? deleteMutation.variables : undefined,
    setSearchInput,
    handleSubmit,
    handleClear,
    cancelDelete,
    requestDelete,
    handleConfirmDelete,
  };
}

export default useDoctorSearch;
