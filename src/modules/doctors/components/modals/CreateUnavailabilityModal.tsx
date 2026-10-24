import {
  Modal,
  Button,
  DatePickerField,
  TimePickerField,
  TextAreaField,
} from '@/shared/components/ui';
import { useExcepcionForm } from '@/modules/doctors/hooks/useExcepcionForm';
import type { CreateUnavailabilityModalProps } from '../../types/Unavailability';

function CreateUnavailabilityModal({
  isOpen,
  onClose,
  doctorId,
  initialData,
  onSuccess,
}: CreateUnavailabilityModalProps) {
  const isEditing = Boolean(initialData?.id);

  const {
    errors,
    onSubmit,
    isSubmitting,
    setValue,
    startDate,
    startTime,
    endDate,
    endTime,
    reason,
    handleStartDateChange,
    handleEndDateChange,
    handleReasonChange,
  } = useExcepcionForm({
    doctorId,
    initialData,
    isEditing,
    onClose,
    onSuccess,
  });

  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onOpenChange={onClose}
      title={isEditing ? 'Editar excepción' : 'Nueva excepción'}
      description="Configure los detalles del bloque de excepción (vacaciones, ausencia, etc.)"
      size="lg"
      footer={
        <>
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
          <Button type="submit" form="excepcion-form" loading={isSubmitting}>
            {isEditing ? 'Guardar cambios' : 'Crear'}
          </Button>
        </>
      }
    >
      <form id="excepcion-form" onSubmit={onSubmit} className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <DatePickerField
            id="startDate"
            label="Fecha inicio"
            required
            value={startDate}
            onChange={(val) => handleStartDateChange(val)}
            error={errors.startDate?.message}
          />
          <TimePickerField
            id="startTime"
            label="Hora inicio"
            required
            value={startTime}
            onChange={(val) =>
              setValue('startTime', val, { shouldValidate: true })
            }
            error={errors.startTime?.message}
            showSeconds={false}
            stepSeconds={30}
            use12Hour={true}
            accept12HourInput={true}
            min="06:00:00"
            max="22:00:00"
          />
          <DatePickerField
            id="endDate"
            label="Fecha fin"
            required
            value={endDate}
            onChange={(val) => handleEndDateChange(val)}
            error={errors.endDate?.message}
          />
          <TimePickerField
            id="endTime"
            label="Hora fin"
            required
            value={endTime}
            onChange={(val) =>
              setValue('endTime', val, { shouldValidate: true })
            }
            error={errors.endTime?.message}
            showSeconds={false}
            stepSeconds={30}
            use12Hour={true}
            accept12HourInput={true}
            min="06:00:00"
            max="23:00:00"
          />
          <div className="sm:col-span-2">
            <TextAreaField
              id="reason"
              label="Motivo"
              required
              rows={3}
              maxLength={255}
              placeholder="Ej. Vacaciones, Congreso, Enfermedad..."
              value={reason}
              onChange={(e) => handleReasonChange(e.target.value)}
              error={errors.reason?.message}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default CreateUnavailabilityModal;
