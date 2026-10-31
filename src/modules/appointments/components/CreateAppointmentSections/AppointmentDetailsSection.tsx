import { Clock3 } from 'lucide-react';

import { InputField, TextAreaField } from '@/shared/components/ui';
import { Controller } from 'react-hook-form';
import type { Control, FieldErrors } from 'react-hook-form';
import type { AppointmentCreateFormValues } from '../../schemas/AppointmentCreateSchema';

type AppointmentDetailsSectionProps = {
  control: Control<AppointmentCreateFormValues>;
  errors: FieldErrors<AppointmentCreateFormValues>;
  isWalkIn: boolean;
};

const AppointmentDetailsSection = ({
  control,
  errors,
  isWalkIn,
}: AppointmentDetailsSectionProps) => {
  return (
    <section className="rounded-2xl border border-border-default bg-bg-surface p-6 shadow-sm sm:p-8">
      <div className="mb-5 flex items-start gap-3">
        <span className="rounded-xl bg-primary/10 p-3 text-primary">
          <Clock3 className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-headline-sm font-semibold text-text-primary">
            Detalles de la consulta
          </h2>
          <p className="text-body-sm text-text-muted">
            Información que verá el equipo clínico.
          </p>
        </div>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Controller
          name="reason"
          control={control}
          render={({ field }) => (
            <InputField
              id="appointment-reason"
              label="Motivo de consulta"
              required
              placeholder="Ej. Dolor dental, limpieza…"
              error={errors.reason?.message}
              {...field}
            />
          )}
        />
        <div className="rounded-xl border border-border-default bg-bg-surface-elevated p-4">
          <p className="text-label-lg font-semibold text-text-primary">
            Estado
          </p>
          <p className="mt-2 text-body-md font-semibold text-primary">
            {isWalkIn ? 'En espera' : 'Programada'}
          </p>
          <p className="mt-1 text-body-sm text-text-muted">
            Se determina automáticamente por el tipo de cita.
          </p>
        </div>
        <div className="md:col-span-2">
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
      </div>
    </section>
  );
};

export default AppointmentDetailsSection;