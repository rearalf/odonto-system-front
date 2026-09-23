'use no memo';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { patientApi } from '@/modules/patients/api/patientApi';
import { GENDER_LABELS } from '@/modules/patients/enums/GenderType';
import { calculateAge } from '@/shared/utils/date';
import { showError, showSuccess } from '@/shared/components/feedback';
import type React from 'react';
import type { PatientNavTab } from '../types/PatientDetail';
import { useState } from 'react';

const formatBirthDate = (value: string) =>
  new Intl.DateTimeFormat('es', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value));

export function usePatientDetail() {
  const { id } = useParams<{ id: string }>();

  const [activeTab, setActiveTab] = useState<PatientNavTab>('ficha-general');

  const query = useQuery({
    queryKey: ['patients', id],
    queryFn: () => patientApi.get(id as string),
    enabled: Boolean(id),
    retry: false,
  });

  const data = query.data;

  const phoneDigits = data?.person.phone.replace(/\D/g, '') ?? '';
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

  return {
    patient: data
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
      : undefined,
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
