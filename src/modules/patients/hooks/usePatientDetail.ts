'use no memo';

import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { usePatientDetailQuery } from '@/modules/patients/hooks/queries/usePatientDetailQuery';
import { GENDER_LABELS } from '@/modules/patients/enums/GenderType';
import { calculateAge } from '@/shared/utils/date';
import { showError, showSuccess } from '@/shared/components/feedback';
import type React from 'react';
import type { PatientNavTab, PatientDetailView } from '../types/PatientDetail';

const formatBirthDate = (value: string) =>
  new Intl.DateTimeFormat('es', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));

/**
 * CAPA 2 (orquestador) — ficha del paciente.
 * Mapea `PatientResponse` (DTO) a `PatientDetailView` (strings para la UI).
 * La red vive en `usePatientDetailQuery`.
 */
export function usePatientDetail() {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState<PatientNavTab>('ficha-general');

  const query = usePatientDetailQuery(id);
  const data = query.data;

  // el backend devuelve phone como numero
  const phoneDigits = data ? String(data.person.phone ?? '').replace(/\D/g, '') : '';
  const phone = phoneDigits
    ? `${phoneDigits.slice(0, 4)} ${phoneDigits.slice(4, 8)}`.trim()
    : '-';

  const patientName = data
    ? `${data.person.firstName} ${data.person.lastName}`.trim()
    : undefined;

  const breadcrumbsItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Pacientes', href: '/patients' },
    {
      label: `Ficha del Paciente${patientName ?? ''}`,
    },
  ];

  const handleCopyPhone = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(phoneDigits);
      showSuccess('Teléfono copiado', {
        description: 'El número quedó en el portapapeles',
      });
    } catch {
      showError('No se pudo copiar el teléfono');
    }
  };

  const patient: PatientDetailView | undefined = data
    ? {
        id: data.id,
        fullName: [
          data.person.firstName,
          data.person.middleName,
          data.person.lastName,
        ]
          .filter(Boolean)
          .join(' '),
        avatarUrl: data.person.profilePictureUrl,
        age: calculateAge(data.birthDate),
        birthDate: formatBirthDate(data.birthDate),
        gender: GENDER_LABELS[data.gender] ?? data.gender,
        occupation: data.person.occupation ?? '-',
        phone,
        address: data.person.address ?? '-',
        firstName: data.person.firstName,
        middleName: data.person.middleName,
        lastName: data.person.lastName,
        medicalHistory: data.medicalHistory,
        allergicReactions: data.allergicReactions,
        currentSystemicTreatment: data.currentSystemicTreatment,
        labResults: data.labResults,
        systemicReview: data.systemicReview,
      }
    : undefined;

  return {
    patient,
    breadcrumbsItems,
    phoneDigits,
    activeTab,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    handleCopyPhone,
    setActiveTab,
  };
}
