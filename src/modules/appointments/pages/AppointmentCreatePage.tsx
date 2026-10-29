import { UserPlus, UserRound } from 'lucide-react';

import { Badge, Breadcrumbs, Button, Switch } from '@/shared/components/ui';
// import CreateAppointmentView from '../components/CreateAppointmentView'; // Comentado temporalmente - en migración
import useAppointmentCreate from '../hooks/useAppointmentCreate';
import CreatePatientModal from '../components/modals/CreatePatientModal';
import PatientSearch from '../components/PatientSearch';
import { PatientCard } from '../components/PatientCard';

export default function AppointmentCreatePage() {
  const appointment = useAppointmentCreate();

  return (
    <>
      <Breadcrumbs />

      <h1 className="mt-4 text-headline-lg font-bold text-text-primary">
        Nuevo cita
      </h1>
      <p className="mt-1 text-body-md text-text-muted">
        Asigna paciente, profesional y horario. Complete la información
        requerida de la cita. Los campos marcados con (
        <span className="text-orange-400">*</span>) son obligatorios para la
        apertura oficial.
      </p>

      <div className="mt-6 relative overflow-hidden rounded-2xl border border-border-default bg-bg-surface p-6 shadow-sm sm:p-8">
        <div className="flex gap-3 items-center  mb-4">
          <h2 className="text-headline-md font-bold text-text-secondary">
            ¿Qué tipo de cita es?
          </h2>
          <Badge variant={appointment.isWalkIn ? 'warning' : 'info'} size="md">
            {appointment.isWalkIn
              ? 'Atención inmediata'
              : 'Programación regular'}
          </Badge>
        </div>

        <div className="flex gap-3 items-center">
          <label
            htmlFor="isRecurring"
            className="font-medium text-text-primary"
          >
            Programación regular
          </label>
          <Switch
            id="isRecurring"
            checked={appointment.isWalkIn}
            onChange={() => appointment.setWalkIn(!appointment.isWalkIn)}
            aria-label="Tipo de cita"
          />
          <label
            htmlFor="isRecurring"
            className="font-medium text-text-primary"
          >
            Atención inmediata
          </label>
        </div>
      </div>

      <form
        id="appointment-form"
        onSubmit={appointment.onSubmit}
        noValidate
        className="mt-6 space-y-6"
      >
        <section className="rounded-2xl border border-border-default bg-bg-surface p-6 shadow-sm sm:p-8">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="rounded-xl bg-primary/10 p-3 text-primary">
                <UserRound className="h-5 w-5" />
              </span>
              <div>
                <h2 className="text-headline-sm font-semibold text-text-primary">
                  Paciente
                </h2>
                <p className="text-body-sm text-text-muted">
                  Busca un expediente existente o abre uno nuevo.
                </p>
              </div>
            </div>
            {!appointment.patientCardData && !appointment.watchers.patientId && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                icon={<UserPlus className="h-4 w-4" />}
                onClick={() => appointment.openPatientModal()}
              >
                Nuevo paciente
              </Button>
            )}
          </div>

          {!appointment.patientCardData &&
            appointment.watchers.patientMode === 'search' && (
              <PatientSearch
                selectedId={appointment.watchers.patientId}
                onSelect={(patient) =>
                  appointment.selectExistingPatient(patient)
                }
                error={appointment.errors.patientId?.message}
              />
            )}

          {appointment.patientCardData && (
            <PatientCard
              patient={appointment.patientCardData}
              onClear={appointment.clearPatient}
            />
          )}
        </section>
      </form>

      {/* <CreateAppointmentView /> */}

      <CreatePatientModal
        isOpen={appointment.patientModalOpen}
        onClose={appointment.closePatientModal}
        onSavePatient={appointment.saveNewPatient}
        control={appointment.control}
        errors={appointment.errors}
      />
    </>
  );
}
