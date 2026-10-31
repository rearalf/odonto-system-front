import { Badge, Breadcrumbs, Button, Switch } from '@/shared/components/ui';

import {
  PatientSelector,
  SelectDoctorSection,
  AppointmentDetailsSection,
} from '../components/CreateAppointmentSections';
import useAppointmentCreate from '../hooks/useAppointmentCreate';

export default function AppointmentCreatePage() {
  const appointment = useAppointmentCreate();

  const cardData = appointment.cardData;
  const patientMode = appointment.watch('patientMode');
  const patientId = appointment.watch('patientId');

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
        <PatientSelector
          patientId={patientId}
          patientMode={patientMode}
          cardData={cardData}
          error={appointment.errors.patientId?.message}
          isModalOpen={appointment.patientModalOpen}
          onSelectExisting={appointment.selectExistingPatient}
          onClearPatient={appointment.clearPatient}
          onEditPatient={appointment.editPatient}
          onOpenNewPatientModal={appointment.openPatientModal}
          onClosePatientModal={appointment.closePatientModal}
          onSaveNewPatient={appointment.saveNewPatient}
          control={appointment.control}
          errors={appointment.errors}
        />

        <SelectDoctorSection
          doctorId={appointment.doctorId}
          date={appointment.watch('date')}
          startTime={appointment.watch('startTime')}
          duration={appointment.watch('duration')}
          slot={appointment.watch('slot')}
          isWalkIn={appointment.isWalkIn}
          endTime={appointment.endTime}
          selectedDoctor={appointment.selectedDoctor}
          onDoctorChange={(id) =>
            appointment.setValue('doctorId', id, { shouldValidate: true })
          }
          onDateChange={(date) =>
            appointment.setValue('date', date, { shouldValidate: true })
          }
          onStartTimeChange={(time) =>
            appointment.setValue('startTime', time, { shouldValidate: true })
          }
          onDurationChange={(duration) =>
            appointment.setValue('duration', duration, { shouldValidate: true })
          }
          onSlotSelect={(slot) =>
            appointment.setValue('slot', slot, { shouldValidate: true })
          }
          doctorError={appointment.errors.doctorId?.message}
          dateError={appointment.errors.date?.message}
          slotError={appointment.errors.slot?.message}
        />

        <AppointmentDetailsSection
          control={appointment.control}
          errors={appointment.errors}
          isWalkIn={appointment.isWalkIn}
        />

        <div className="flex justify-end">
          <Button type="submit" size="lg" loading={appointment.isSubmitting}>
            Crear cita
          </Button>
        </div>
      </form>

      {/* <CreateAppointmentView /> */}
    </>
  );
}
