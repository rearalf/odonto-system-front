import type { CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  Clock,
  Loader2,
  Stethoscope,
  User,
} from 'lucide-react';

import {
  Badge,
  Button,
  ToothIcon,
  Breadcrumbs,
  DetailField,
  ParticipantCard,
} from '@/shared/components/ui';
import { AppointmentStatusBadge } from '../components/AppointmentStatusBadge';
import { useAppointmentDetail } from '../hooks/useAppointmentDetail';
import { hexToRgb } from '../constants/appointment-status';
import { cn } from '@/shared/utils/cn';

function AppointmentDetailPage() {
  const {
    error,
    isError,
    isLoading,
    appointment,
    availableActions,
    handleRefetch,
  } = useAppointmentDetail();

  if (isLoading) {
    return (
      <div className="rounded-xl bg-bg-surface border border-border-default shadow-sm p-8 mt-6 flex flex-col gap-3 items-center justify-center">
        <Loader2
          className="animate-spin stroke-primary h-16 w-16"
          aria-hidden="true"
        />
        <span className="text-text-muted">Cargando horario...</span>
      </div>
    );
  }

  if (isError || !appointment)
    return (
      <div className="mt-8 rounded-2xl border border-border-default bg-bg-surface p-8 text-center shadow-sm">
        <AlertCircle className="mx-auto h-12 w-12 text-destructive" />
        <h3 className="mt-4 text-headline-sm font-semibold text-text-primary">
          No se pudo cargar la cita
        </h3>
        <p className="mt-1 text-body-md text-text-muted">
          {error instanceof Error ? error.message : 'Error desconocido'}
        </p>
        <Button variant="outline" className="mt-4" onClick={handleRefetch}>
          Reintentar
        </Button>
      </div>
    );

  return (
    <>
      <Breadcrumbs />

      <header className="mt-4 flex flex-col gap-4 border-b border-border-default pb-4 mb-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-start gap-3">
          <Link to="/appointments" aria-label="Volver a citas" className="mt-1">
            <Button variant="ghost" size="sm" aria-label="Volver">
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </Button>
          </Link>
          <div>
            <p className="text-label-md font-medium uppercase tracking-[0.12em] text-primary">
              Registro de cita
            </p>
            <h1 className="mt-1 text-headline-lg font-bold text-text-primary">
              Cita #{appointment.id}
            </h1>
            <p className="mt-1 text-body-md text-text-muted">
              Información completa de la cita
            </p>
          </div>
        </div>
        <AppointmentStatusBadge
          status={{
            name: appointment.status.name,
            color: appointment.status.color,
            description: appointment.statusLabel,
            id: appointment.status.id,
          }}
          className="self-start sm:self-auto"
        />
      </header>

      {availableActions.length > 0 && (
        <section
          aria-label="Acciones de la cita"
          className="rounded-2xl border border-border-default bg-bg-surface p-4 shadow-sm sm:p-5"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-label-sm font-medium uppercase tracking-widest text-text-muted">
                Próximo paso
              </p>
              <p className="mt-1 text-body-sm text-text-secondary">
                Acciones disponibles según el estado actual
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
              {availableActions.map((action) => {
                const rgb = hexToRgb(action.color);
                const isSolid = action.variant === 'solid';
                const isOutline = action.variant === 'outline';

                return (
                  <Button
                    key={action.label}
                    type="button"
                    variant={action.variant}
                    className={cn(
                      isSolid
                        ? 'bg-(--action-color) text-white hover:bg-[rgba(var(--action-color-rgb),0.75)] active:bg-[rgba(var(--action-color-rgb),0.10)]'
                        : isOutline
                          ? 'border text-(--action-color) border-(--action-color) hover:bg-[rgba(var(--action-color-rgb),0.10)]'
                          : 'text-(--action-color) hover:bg-[rgba(var(--action-color-rgb),0.10)]',
                    )}
                    style={
                      {
                        '--action-color': action.color,
                        '--action-color-rgb': rgb,
                      } as CSSProperties
                    }
                    title="Disponible próximamente"
                  >
                    {action.label}
                  </Button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <main className="mt-6 space-y-6">
        <section className="overflow-hidden rounded-2xl border border-border-default bg-bg-surface shadow-sm">
          <div className="border-l-4 border-primary p-5 sm:p-6">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Calendar className="h-6 w-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-label-sm font-medium uppercase tracking-widest text-text-muted">
                    Fecha programada
                  </p>
                  <h2 className="mt-1 text-headline-md font-semibold capitalize text-text-primary">
                    {appointment.startDateFormatted}
                  </h2>
                  <p className="mt-2 text-body-md text-text-secondary">
                    {appointment.reason}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-border-default pt-5 sm:grid-cols-3 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                <div>
                  <p className="text-label-sm font-medium uppercase tracking-[0.08em] text-text-muted">
                    Inicio
                  </p>
                  <p className="mt-1 font-mono text-headline-sm font-semibold tabular-nums text-text-primary">
                    {appointment.startTimeFormatted}
                  </p>
                </div>
                <div>
                  <p className="text-label-sm font-medium uppercase tracking-[0.08em] text-text-muted">
                    Fin
                  </p>
                  <p className="mt-1 font-mono text-headline-sm font-semibold tabular-nums text-text-primary">
                    {appointment.endTimeFormatted}
                  </p>
                </div>
                <div className="col-span-2 flex items-center gap-2 text-primary sm:col-span-1 sm:border-l sm:border-border-default sm:pl-4">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  <span className="text-label-lg font-semibold">
                    {appointment.durationFormatted}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-2">
          <ParticipantCard
            icon={<User className="h-5 w-5" aria-hidden="true" />}
            title="Paciente"
          >
            <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
              <DetailField
                label="Nombre"
                value={appointment.patient.fullName}
                className="sm:col-span-2"
              />
              <DetailField
                label="Edad"
                value={appointment.patient.ageFormatted}
              />
              <DetailField
                label="Género"
                value={appointment.patient.genderLabel}
              />
              <DetailField
                label="Teléfono"
                value={appointment.patient.phone}
                className="sm:col-span-2"
              />
            </dl>
            {appointment.patient.completeOdontogram && (
              <Button
                variant="outline"
                size="sm"
                className="mt-5 w-full"
                disabled
              >
                <ToothIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                Ver odontograma
              </Button>
            )}
          </ParticipantCard>

          <ParticipantCard
            icon={<Stethoscope className="h-5 w-5" aria-hidden="true" />}
            title="Doctor"
          >
            <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
              <DetailField
                label="Nombre"
                value={appointment.doctor.fullName}
                className="sm:col-span-2"
              />
              <DetailField
                label="Teléfono"
                value={appointment.doctor.phone}
                className="sm:col-span-2"
              />
              {appointment.doctor.primarySpecialty && (
                <div className="sm:col-span-2">
                  <dt className="text-label-sm font-medium uppercase tracking-[0.08em] text-text-muted">
                    Especialidad principal
                  </dt>
                  <dd className="mt-1.5">
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 font-medium text-primary"
                    >
                      {appointment.doctor.primarySpecialty.name}
                    </Badge>
                  </dd>
                </div>
              )}
              {appointment.doctor.hasSecondarySpecialties && (
                <div className="sm:col-span-2">
                  <dt className="text-label-sm font-medium uppercase tracking-[0.08em] text-text-muted">
                    Otras especialidades (
                    {appointment.doctor.secondarySpecialties.length})
                  </dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {appointment.doctor.secondarySpecialties.map((spec) => (
                      <span
                        key={spec.id}
                        className="inline-flex items-center gap-1.5 rounded-md bg-bg-surface-subtle px-2.5 py-1 text-body-sm text-text-secondary"
                      >
                        <span className="font-medium text-primary">
                          {spec.index}.
                        </span>
                        {spec.name}
                      </span>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          </ParticipantCard>
        </div>

        <section className="rounded-2xl border border-border-default bg-bg-surface p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-3 border-b border-border-default pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <AlertCircle className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-headline-sm font-semibold text-text-primary">
                Detalles de la cita
              </h2>
              <p className="text-body-sm text-text-muted">
                Información adicional y seguimiento
              </p>
            </div>
          </div>

          <dl className="mt-5 grid gap-5 md:grid-cols-2">
            <div>
              <dt className="text-label-sm font-medium uppercase tracking-[0.08em] text-text-muted">
                Estado
              </dt>
              <dd className="mt-1.5">
                <AppointmentStatusBadge
                  status={{
                    name: appointment.status.name,
                    color: appointment.status.color,
                    description: appointment.statusLabel,
                    id: appointment.status.id,
                  }}
                />
              </dd>
            </div>
            <div>
              <dt className="text-label-sm font-medium uppercase tracking-[0.08em] text-text-muted">
                Sin cita previa
              </dt>
              <dd className="mt-1.5">
                <Badge variant={appointment.isWalkIn ? 'warning' : 'primary'}>
                  {appointment.walkInLabel}
                </Badge>
              </dd>
            </div>
            <div className="md:col-span-2">
              <dt className="text-label-sm font-medium uppercase tracking-[0.08em] text-text-muted">
                Notas
              </dt>
              <dd className="mt-1.5 rounded-lg bg-bg-surface-subtle p-3 text-body-md text-text-secondary">
                {appointment.hasNotes ? (
                  appointment.notes
                ) : (
                  <span className="text-text-muted">— Sin notas —</span>
                )}
              </dd>
            </div>
            {appointment.isRescheduled && (
              <div className="border-t border-border-default pt-5 md:col-span-2">
                <dt className="text-label-sm font-medium uppercase tracking-[0.08em] text-text-muted">
                  Historial de cambios
                </dt>
                <dd className="mt-2 grid gap-2 text-body-sm text-text-secondary sm:grid-cols-2">
                  <div>
                    <span className="text-text-muted">
                      Última modificación:{' '}
                    </span>
                    <time
                      dateTime={appointment.modifiedAt?.toISOString() ?? ''}
                    >
                      {appointment.modifiedAtFormatted}
                    </time>
                  </div>
                  {appointment.modificationReason && (
                    <div>
                      <span className="text-text-muted">Motivo: </span>
                      <span>{appointment.modificationReason}</span>
                    </div>
                  )}
                </dd>
              </div>
            )}
          </dl>
        </section>
      </main>
    </>
  );
}

export default AppointmentDetailPage;
