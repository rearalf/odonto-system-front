import {
  Cake,
  Copy,
  Edit,
  Locate,
  Luggage,
  PhoneCall,
  User,
  X,
} from 'lucide-react';

import { GenderType } from '@/modules/patients/enums/GenderType';
import { Avatar, Badge, Button } from '@/shared/components/ui';
import type { PatientCardData } from '@/modules/appointments/types';

type PatientCardProps = {
  patient: NonNullable<PatientCardData>;
  onClear?: () => void;
  onEdit?: () => void;
};

export function PatientCard({
  patient,
  onClear,
  onEdit,
}: PatientCardProps) {
  const canEdit = patient.source === 'new';
  return (
    <section className="flex flex-col items-center gap-4 bg-bg-surface rounded-xl border border-border-default shadow-sm p-4 sm:p-6 lg:p-8 mt-6 xl:flex-row xl:justify-between xl:items-center">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <div className="flex items-center gap-3 relative">
          <Avatar
            name={patient.fullName}
            alt={`Foto de ${patient.fullName}`}
            size="lg"
            src={patient.avatarUrl}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-center gap-2 flex-col md:flex-row">
            <h2 className="text-headline-sm font-bold text-text-primary">
              {patient.fullName}
            </h2>
            <Badge variant="primary" className="px-3 py-1.5">
              <Cake size={22} />
              {patient.age != null ? `${patient.age} años` : '-'} (
              {patient.birthday})
            </Badge>

            <Badge variant="primary" className="px-3 py-1.5">
              <User size={22} />
              {patient.gender === GenderType.MALE ? 'Masculino' : 'Femenino'}
            </Badge>
          </div>
          {(patient.occupation || patient.address) && (
            <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 md:gap-4 mt-3">
              {patient.occupation && (
                <Badge variant="info" className="flex items-center gap-1">
                  <Luggage />
                  {patient.occupation}
                </Badge>
              )}
              {patient.address && (
                <Badge
                  variant="info"
                  className="flex items-center gap-1 max-w-40"
                >
                  <Locate className="shrink-0" />
                  <span className="truncate">{patient.address}</span>
                </Badge>
              )}
            </div>
          )}
          {patient.hasAllergies && (
            <p className="mt-2 text-body-sm text-amber-600 dark:text-amber-400">
              ⚠️ Tiene alergias registradas
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-center gap-2">
        <Badge variant="primary" className="flex items-center gap-4">
          <a
            href={`tel:${patient.phone}`}
            aria-label="Llamar al número de teléfono"
            title="Llamar"
            className="rounded p-0.5 text-current opacity-70 transition hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none"
          >
            <PhoneCall className="h-5 w-5" aria-hidden="true" />
          </a>
          <span className="truncate">{patient.phone}</span>

          <button
            type="button"
            aria-label="Copiar teléfono"
            title="Copiar"
            className="rounded p-0.5 text-current opacity-70 transition hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none"
            onClick={() => navigator.clipboard.writeText(String(patient.phone))}
          >
            <Copy className="h-5 w-5" aria-hidden="true" />
          </button>
        </Badge>
        {canEdit && onEdit && (
          <Button
            type="button"
            onClick={onEdit}
            variant="outline"
            color="info"
            title="Editar paciente"
            aria-label="Editar paciente"
          >
            <Edit className="h-5 w-5" aria-hidden="true" />
            Editar
          </Button>
        )}
        {onClear && (
          <Button
            variant="ghost"
            color="error"
            type="button"
            aria-label="Cambiar paciente"
            title="Cambiar paciente"
            onClick={onClear}
          >
            <X />
          </Button>
        )}
      </div>
    </section>
  );
}
