import { useState } from 'react';

import { usePatientSearch } from './usePatientSearch';
import { usePatientDeleteMutation } from './mutations/usePatientDeleteMutation';
import type { PatientListItem } from '@/modules/patients/types/PatientList';
import { showApiError, showSuccess } from '@/shared/components/feedback';

export function usePatientListPage() {
  const list = usePatientSearch();
  const deleteMutation = usePatientDeleteMutation();
  const [selectedPatient, setSelectedPatient] =
    useState<PatientListItem | null>(null);

  const requestDelete = (patient: PatientListItem) =>
    setSelectedPatient(patient);

  const cancelDelete = () => setSelectedPatient(null);

  const handleConfirmDelete = async () => {
    if (!selectedPatient) return;
    try {
      await deleteMutation.mutateAsync(selectedPatient.id);
      showSuccess('Paciente eliminado', {
        description: 'El paciente se eliminó correctamente',
      });
      setSelectedPatient(null);
    } catch (error) {
      showApiError(error);
    }
  };

  return {
    ...list,
    selectedPatient,
    isDeleteModalOpen: selectedPatient !== null,
    isDeleting: deleteMutation.isPending,
    deletingId: deleteMutation.isPending ? deleteMutation.variables : undefined,
    requestDelete,
    cancelDelete,
    handleConfirmDelete,
  };
}
