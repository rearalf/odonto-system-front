import { Clock3, Info } from 'lucide-react';
import { TextAreaField, Badge } from '@/shared/components/ui';
import { Controller, useWatch } from 'react-hook-form';
import type { Control, FieldErrors } from 'react-hook-form';
import type { AppointmentCreateFormValues } from '../../schemas/AppointmentCreateSchema';
import { useAppointmentStatusesQuery } from '../../hooks/queries/useAppointmentStatusesQuery';

type AppointmentDetailsSectionProps = {
  control: Control<AppointmentCreateFormValues>;
  errors: FieldErrors<AppointmentCreateFormValues>;
};

const AppointmentDetailsSection = ({
  control,
  errors,
}: AppointmentDetailsSectionProps) => {
  const statusId = useWatch({ control, name: 'statusId' });
  const { data: statuses } = useAppointmentStatusesQuery();

  const currentStatus = statuses?.find((s) => s.id === statusId);
  const statusLabel = currentStatus?.description ?? 'Desconocido';
  const statusColor = currentStatus?.color ?? '#6b7280';

  return (
    <section className="rounded-2xl border border-border-default bg-bg-surface p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
        <div className="flex items-start gap-3">
          <span className="shrink-0 rounded-xl bg-primary/10 p-3 text-primary">
            <Clock3 className="h-5 w-5" />
          </span>
          <div>
            <h2 className="text-headline-sm font-semibold text-text-primary">
              Detalles de la consulta
            </h2>
            <p className="mt-1 text-body-sm text-text-muted">
              Información que verá el equipo clínico.
            </p>
          </div>
        </div>

        <div className="w-full rounded-xl border border-border-default bg-bg-surface-elevated p-4 md:w-auto md:max-w-xs">
          <Badge
            variant="default"
            size="md"
            className="flex w-fit items-center gap-2 px-3 py-1.5 text-white"
            style={{
              backgroundColor: statusColor,
            }}
          >
            <Info
              className="h-4 w-4 shrink-0"
              aria-label="El estado se determina automáticamente según el tipo de cita"
            />
            <span>{statusLabel}</span>
          </Badge>
          <p className="mt-2 text-body-sm text-text-muted">
            Se determina automáticamente por el tipo de cita.
          </p>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Controller
          name="reason"
          control={control}
          render={({ field }) => (
            <TextAreaField
              id="appointment-reason"
              label="Motivo de consulta"
              required
              placeholder="Ej. Dolor dental, limpieza…"
              rows={4}
              error={errors.reason?.message}
              {...field}
            />
          )}
        />

        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <TextAreaField
              id="appointment-notes"
              label="Notas"
              optional
              rows={4}
              placeholder="Indicaciones o información adicional…"
              error={errors.notes?.message}
              {...field}
            />
          )}
        />
      </div>
    </section>
  );
};

export default AppointmentDetailsSection;
