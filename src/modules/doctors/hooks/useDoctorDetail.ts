'use no memo';

import { useState } from 'react';
import { useParams } from 'react-router-dom';

import { useDoctorDetailQuery } from '@/modules/doctors/hooks/queries/useDoctorDetailQuery';
import { useCopyToClipboard } from '@/shared/utils/copyToClipboard';
import type { DoctorDetailTab } from '../constants/doctorNavTabs';

export function useDoctorDetail() {
  const { id } = useParams<{ id: string }>();

  const [activeTab, setActiveTab] = useState<DoctorDetailTab>(
    'informacion-general',
  );

  const { copy: handleCopyPhone } = useCopyToClipboard();

  const query = useDoctorDetailQuery(id);
  const data = query.data;

  const phoneDigits = data
    ? String(data.person.phone ?? '').replace(/\D/g, '')
    : '';
  const phone = phoneDigits
    ? `${phoneDigits.slice(0, 4)} ${phoneDigits.slice(4, 8)}`.trim()
    : '-';

  const fullName = data
    ? [data.person.firstName, data.person.middleName, data.person.lastName]
        .filter(Boolean)
        .join(' ')
    : undefined;

  const breadcrumbsItems = [
    { label: 'Inicio', href: '/' },
    { label: 'Doctores', href: '/doctors' },
    { label: fullName ? `Ficha del Doctor ${fullName}` : 'Ficha del Doctor' },
  ];

  return {
    doctor: data,
    fullName,
    phone,
    phoneDigits,
    breadcrumbsItems,
    activeTab,
    setActiveTab,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
    handleCopyPhone,
  };
}
