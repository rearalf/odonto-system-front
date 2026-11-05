import {
  X,
  Cake,
  Copy,
  User,
  Edit,
  Luggage,
  PhoneCall,
  AlertTriangle,
  Check,
} from 'lucide-react';
import { Avatar, Badge, Button, ToothIcon } from '@/shared/components/ui';
import { GenderType } from '@/modules/patients/enums/GenderType';
import type { PatientCardProps } from '@/modules/appointments/types';

const PatientCard = ({ patient, onClear, onEdit }: PatientCardProps) => {
  const canEdit = patient.source === 'new';

  return (
    <section className="bg-bg-surface rounded-xl border border-border-default shadow-sm p-5 sm:p-6 mt-6 w-full relative">
      {/* Botón superior derecho para limpiar/quitar (absoluto para no romper el flujo) */}
      {onClear && (
        <div className="absolute top-4 right-4 sm:top-5 sm:right-5">
          <Button
            variant="ghost"
            color="error"
            type="button"
            aria-label="Cambiar paciente"
            title="Cambiar paciente"
            onClick={onClear}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-5 sm:gap-6 items-start">
        {/* Sección de Avatar */}
        <div className="shrink-0 pt-1">
          <Avatar
            name={patient.fullName}
            alt={`Foto de ${patient.fullName}`}
            size="lg"
            src={patient.avatarUrl}
          />
        </div>

        {/* Sección de Información Principal */}
        <div className="flex-1 min-w-0 w-full">
          {/* Cabecera: Nombre y Botón de Edición */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 pr-10">
            <h2 className="text-headline-sm font-bold text-text-primary truncate">
              {patient.fullName}
            </h2>
            {canEdit && onEdit && (
              <Button
                type="button"
                onClick={onEdit}
                variant="outline"
                color="info"
                title="Editar paciente"
                aria-label="Editar paciente"
                className="shrink-0"
              >
                <Edit className="h-4 w-4 mr-2" aria-hidden="true" />
                Editar
              </Button>
            )}
          </div>

          {/* Cuadrícula de Datos Demográficos */}
          <div className="flex flex-wrap gap-2 mb-5">
            <Badge
              variant="primary"
              className="px-3 py-1.5 flex items-center gap-1.5"
            >
              <Cake size={16} className="opacity-70" />
              <span>
                {patient.age != null ? `${patient.age} años` : '-'} (
                {patient.birthday})
              </span>
            </Badge>
            <Badge
              variant="primary"
              className="px-3 py-1.5 flex items-center gap-1.5"
            >
              <User size={16} className="opacity-70" />
              <span>
                {patient.gender === GenderType.MALE ? 'Masculino' : 'Femenino'}
              </span>
            </Badge>
            {patient.occupation && (
              <Badge
                variant="info"
                className="px-3 py-1.5 flex items-center gap-1.5"
              >
                <Luggage size={16} className="opacity-70" />
                <span className="truncate max-w-37.5">
                  {patient.occupation}
                </span>
              </Badge>
            )}
          </div>

          {/* Footer: Estado Clínico y Contacto */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pt-4 border-t border-border-default/50">
            {/* Alertas Médicas */}
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={patient.hasAllergies ? 'error' : 'success'}
                className="px-3 py-1.5 flex items-center gap-1.5"
              >
                {patient.hasAllergies ? (
                  <AlertTriangle size={15} />
                ) : (
                  <Check size={15} />
                )}
                <span>Alergias: {patient.hasAllergies ? 'Sí' : 'No'}</span>
              </Badge>
              <Badge
                variant={patient.completeOdontogram ? 'success' : 'warning'}
                className="px-3 py-1.5 flex items-center gap-1.5"
              >
                <ToothIcon className="h-4 w-4" aria-hidden="true" />
                <span>
                  Odontograma:{' '}
                  {patient.completeOdontogram ? 'Mixto' : 'Permanente'}
                </span>
              </Badge>
            </div>

            {/* Teléfono y Acciones */}
            <div className="flex items-center">
              <Badge
                variant="primary"
                className="flex items-center justify-center gap-3 px-3 py-1.5 w-full sm:w-auto"
              >
                <a
                  href={`tel:${patient.phone}`}
                  aria-label="Llamar"
                  title="Llamar"
                  className="text-current opacity-70 hover:opacity-100 transition focus:outline-none"
                >
                  <PhoneCall className="h-4 w-4" aria-hidden="true" />
                </a>
                <span className="truncate font-medium">{patient.phone}</span>
                <button
                  type="button"
                  aria-label="Copiar teléfono"
                  title="Copiar"
                  className="text-current opacity-70 hover:opacity-100 transition focus:outline-none"
                  onClick={() =>
                    navigator.clipboard.writeText(String(patient.phone))
                  }
                >
                  <Copy className="h-4 w-4" aria-hidden="true" />
                </button>
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PatientCard;
