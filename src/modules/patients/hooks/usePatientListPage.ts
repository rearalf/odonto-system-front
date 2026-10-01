import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import { usePatientSearch } from './usePatientSearch';
import { usePatientDeleteMutation } from './mutations/usePatientDeleteMutation';
import { patientKeys } from './patientKeys';
import type { PatientListItem } from '@/modules/patients/types/PatientList';
import {
  showApiError,
  showSuccess,
} from '@/shared/components/feedback';

/**
 * CAPA 2 (orquestador) — pagina de listado.
 * Compone la query de lectura y la mutation de delete (feedback + invalidacion
 * viven aqui, no en los primitivos).
 */
export function usePatientListPage() {
  const list = usePatientSearch();
  const queryClient = useQueryClient();
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
      queryClient.invalidateQueries({ queryKey: patientKeys.lists() });
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
    deletingId: deleteMutation.isPending
      ? deleteMutation.variables
      : undefined,
    requestDelete,
    cancelDelete,
    handleConfirmDelete,
  };
}
