import { useQuery } from '@tanstack/react-query';

import { appointmentApi } from '@/modules/appointments/api/appointmentApi';
import { appointmentKeys } from '@/modules/appointments/hooks/appointmentKeys';
import type {
  AppointmentDetailResponse,
  AppointmentDetailViewModel,
} from '@/modules/appointments/types';

function toViewModel(
  raw: AppointmentDetailResponse,
): AppointmentDetailViewModel {
  const startDate = new Date(raw.startTime);
  const endDate = new Date(raw.endTime);
  const durationMin = Math.round(
    (endDate.getTime() - startDate.getTime()) / 60000,
  );

  const patientAge = (() => {
    const today = new Date();
    const birth = new Date(raw.patient.birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  })();

  const genderLabels: Record<string, string> = {
    male: 'Masculino',
    female: 'Femenino',
    other: 'Otro',
  };

  const primarySpecialty =
    raw.doctor.specialties.find((s) => s.isPrimary) ?? null;
  const secondarySpecialties = raw.doctor.specialties
    .filter((s) => !s.isPrimary)
    .map((s, idx) => ({ id: s.id, name: s.name, index: idx + 1 }));

  return {
    id: raw.id,
    startDate,
    endDate,
    startDateFormatted: startDate.toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    startTimeFormatted: startDate.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    endTimeFormatted: endDate.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    }),
    durationMinutes: durationMin,
    durationFormatted: `${durationMin} min`,
    status: raw.status,
    statusLabel: raw.status.description,
    statusColor: raw.status.color,
    reason: raw.reason,
    notes: raw.notes,
    hasNotes: !!raw.notes,
    isWalkIn: raw.isWalkIn,
    walkInLabel: raw.isWalkIn ? 'Sí' : 'No',
    isRescheduled: !!raw.modifiedAt,
    modifiedAt: raw.modifiedAt ? new Date(raw.modifiedAt) : null,
    modifiedAtFormatted: raw.modifiedAt
      ? new Date(raw.modifiedAt).toLocaleString('es-ES', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : null,
    modificationReason: raw.modificationReason,
    patient: {
      id: raw.patient.id,
      fullName: raw.patient.fullName,
      phone: raw.patient.phone,
      gender: raw.patient.gender,
      genderLabel: genderLabels[raw.patient.gender] ?? raw.patient.gender,
      age: patientAge,
      ageFormatted: `${patientAge} años`,
      completeOdontogram: raw.patient.completeOdontogram,
    },
    doctor: {
      id: raw.doctor.id,
      fullName: raw.doctor.fullName,
      phone: raw.doctor.phone,
      primarySpecialty: primarySpecialty
        ? { id: primarySpecialty.id, name: primarySpecialty.name }
        : null,
      secondarySpecialties,
      hasSecondarySpecialties: secondarySpecialties.length > 0,
    },
  };
}

export function useAppointmentDetailQuery(
  id: string | undefined,
  options?: { enabled?: boolean },
) {
  const numericId = id ? Number(id) : NaN;
  const isValidId = !isNaN(numericId) && numericId > 0;

  return useQuery({
    queryKey: appointmentKeys.details(numericId),
    queryFn: () => appointmentApi.getById(numericId),
    enabled: options?.enabled ?? isValidId,
    select: toViewModel,
  });
}

export type { AppointmentDetailViewModel };
