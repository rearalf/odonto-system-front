import { useState } from 'react';

import { usePatientSearch } from './usePatientSearch';
import { usePatientDelete } from './usePatientDelete';
import type { PatientListItem } from '@/modules/patients/types/PatientList';

export function usePatientListPage() {
  const list = usePatientSearch();
  const { deletePatient, isDeleting, deletingId } = usePatientDelete();
  const [selectedPatient, setSelectedPatient] =
    useState<PatientListItem | null>(null);

  const requestDelete = (patient: PatientListItem) =>
    setSelectedPatient(patient);

  const cancelDelete = () => setSelectedPatient(null);

  const handleConfirmDelete = async () => {
    if (!selectedPatient) return;
    try {
      await deletePatient(selectedPatient.id);
      setSelectedPatient(null);
    } catch {
      // el toast de error ya lo maneja usePatientDelete
    }
  };

  return {
    ...list,
    selectedPatient,
    isDeleteModalOpen: selectedPatient !== null,
    isDeleting,
    deletingId,
    requestDelete,
    cancelDelete,
    handleConfirmDelete,
  };
}