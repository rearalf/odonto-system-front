import { CalendarClock } from 'lucide-react';

import type { HorarioTabProps } from '@/modules/doctors/types/HorarioTab';
import { UnavailabilitySection, AvailabilitySection } from '..';

export default function HorarioTab({ doctorId }: HorarioTabProps) {
  return (
    <section className="mt-6 bg-bg-surface border border-border-default shadow-sm rounded-xl p-6">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="rounded-lg bg-bg-surface-elevated p-2 text-primary shrink-0">
            <CalendarClock className="h-6 w-6" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-headline-md font-semibold text-text-primary">
              Horario del Doctor
            </h2>
            <p className="text-body-sm text-text-muted">
              Visualización unificada de bloques recurrentes y excepciones
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"></div>
      </div>

      <div className="space-y-8">
        <AvailabilitySection doctorId={doctorId} />
        <UnavailabilitySection doctorId={doctorId} />
      </div>
    </section>
  );
}
