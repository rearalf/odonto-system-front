import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Button, Badge, Breadcrumbs } from '@/shared/components/ui';
import { usePlantillaSemanalEdit } from '@/modules/doctors/hooks/usePlantillaSemanalEdit';
import type { DayOfWeek } from '@/modules/doctors/types/Availability';
import { DayScheduleCard } from '@/modules/doctors/components/DayScheduleCard';

export default function PlantillaSemanalEditPage() {
  const {
    doctor,
    breadcrumbsItems,
    fullName,
    isLoadingDoctor,
    isErrorDoctor,
    control,
    errors,
    onSubmit,
    handleCancel,
    blocks,
    getShiftsForDay,
    addShift,
    removeShift,
    updateBlock,
    isPending,
    DAYS_OF_WEEK,
    DEFAULT_SLOT_DURATION,
    DEFAULT_MAX_PATIENTS_PER_SLOT,
  } = usePlantillaSemanalEdit();

  if (isLoadingDoctor) {
    return (
      <div className="rounded-xl bg-bg-surface border border-border-default shadow-sm p-8 mt-6 flex items-center justify-center">
        <svg
          className="h-8 w-8 animate-spin text-primary"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeDasharray="30 70"
            strokeLinecap="round"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 12 12"
              to="360 12 12"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
        <span className="sr-only">Cargando...</span>
      </div>
    );
  }

  if (isErrorDoctor || !doctor) {
    return (
      <div className="rounded-xl bg-bg-surface border border-border-default shadow-sm p-8 mt-6 text-center">
        <p className="text-body-lg font-medium text-text-primary">
          Error al cargar el doctor
        </p>
        <Button variant="outline" onClick={handleCancel} className="mt-4">
          Volver
        </Button>
      </div>
    );
  }

  return (
    <>
      <Breadcrumbs items={breadcrumbsItems} />

      <section className="flex flex-col gap-3 mt-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-headline-lg font-bold text-text-primary">
            Editar Plantilla Semanal
          </h1>
          <p className="text-body-md text-text-muted">Dr. {fullName}</p>
        </div>
        <div className="flex flex-col gap-2 w-full sm:flex-row sm:flex-wrap sm:w-auto">
          <Button
            variant="ghost"
            onClick={handleCancel}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4 mr-2" aria-hidden="true" />
            Volver
          </Button>
        </div>
      </section>

      <section className="mt-6 rounded-xl border border-border-default bg-bg-surface p-6 shadow-sm">
        <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="rounded-lg bg-bg-surface-elevated p-2 text-primary shrink-0">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <div>
              <h2 className="text-headline-md font-semibold text-text-primary">
                Plantilla Semanal de Disponibilidad
              </h2>
              <p className="text-body-sm text-text-muted">
                Configure los horarios de trabajo recurrentes del doctor
              </p>
            </div>
          </div>
          <Badge variant="info" size="md" className="shrink-0">
            Solo bloques recurrentes
          </Badge>
        </div>

        <form onSubmit={onSubmit} noValidate className="space-y-6">
          <div className="grid gap-4">
            {DAYS_OF_WEEK.map((day: { value: DayOfWeek; label: string }) => {
              const shifts = getShiftsForDay(day.value);
              const isEnabled = shifts.length > 0;

              return (
                <DayScheduleCard
                  key={day.value}
                  day={day}
                  shifts={shifts}
                  isEnabled={isEnabled}
                  blocks={blocks}
                  isPending={isPending}
                  errors={errors}
                  control={control}
                  updateBlock={updateBlock}
                  removeShift={removeShift}
                  addShift={addShift}
                  DEFAULT_SLOT_DURATION={DEFAULT_SLOT_DURATION}
                  DEFAULT_MAX_PATIENTS_PER_SLOT={DEFAULT_MAX_PATIENTS_PER_SLOT}
                />
              );
            })}
          </div>

          {errors.blocks?.message && (
            <div
              className="flex items-center gap-2 rounded-lg bg-danger/10 border border-danger/20 p-3 text-danger"
              role="alert"
            >
              <AlertCircle className="h-5 w-5 shrink-0" aria-hidden="true" />
              <p className="text-body-sm">{errors.blocks.message}</p>
            </div>
          )}

          <div className="flex justify-end pt-4 border-t border-border-default">
            <Button
              type="submit"
              loading={isPending}
              disabled={isPending}
              className="w-full sm:w-auto"
            >
              {isPending ? 'Guardando...' : 'Guardar Plantilla Semanal'}
            </Button>
          </div>
        </form>
      </section>
    </>
  );
}
