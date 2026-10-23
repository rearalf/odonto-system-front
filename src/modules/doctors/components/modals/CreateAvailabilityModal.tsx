import { CalendarDays } from 'lucide-react';
import {
  Badge,
  Modal,
  Button,
  Switch,
  InputField,
  SelectField,
  TimePickerField,
  DatePickerField,
} from '@/shared/components/ui';
import { useRecurrenteForm } from '@/modules/doctors/hooks/useRecurrenteForm';
import type { RecurrenteModalProps } from '@/modules/doctors/types/availabilityModal';
import { DAYS_OF_WEEK } from '@/modules/doctors/types/Availability';

const CreateAvailabilityModal = ({
  isOpen,
  onClose,
  doctorId,
  initialData,
  onSuccess,
}: RecurrenteModalProps) => {
  const isEditing = Boolean(initialData?.id);

  const {
    errors,
    onSubmit,
    isSubmitting,
    setValue,
    startTime,
    endTime,
    slotDuration,
    maxPatientsPerSlot,
    isRecurring,
    dayOfWeek,
    specificDate,
    handleDayOfWeekChange,
    handleSlotDurationChange,
    handleMaxPatientsChange,
    handleSpecificDateChange,
    handleIsRecurringChange,
  } = useRecurrenteForm({
    isOpen,
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
      closeOnBackdrop={false}
      title={isEditing ? 'Editar bloque recurrente' : 'Nuevo bloque recurrente'}
      description="Configure los detalles del horario recurrente semanal"
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
          <Button type="submit" form="recurrente-form" loading={isSubmitting}>
            {isEditing ? 'Guardar cambios' : 'Crear'}
          </Button>
        </>
      }
    >
      <form id="recurrente-form" onSubmit={onSubmit} className="space-y-6">
        <div className="flex items-center gap-3">
          <Switch
            id="isRecurring"
            checked={isRecurring}
            onChange={handleIsRecurringChange}
            aria-label="Bloque recurrente"
          />
          <label
            htmlFor="isRecurring"
            className="font-medium text-text-primary"
          >
            Bloque recurrente (plantilla semanal)
          </label>
          <Badge variant="info" className="ml-auto">
            <span className="flex items-center gap-1">
              <CalendarDays className="h-3 w-3" />
              Semanal
            </span>
          </Badge>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {isRecurring ? (
            <>
              <SelectField
                id="dayOfWeek"
                label="Día de la semana"
                required
                value={String(dayOfWeek)}
                onChange={(e) => handleDayOfWeekChange(Number(e.target.value))}
                error={errors.dayOfWeek?.message}
              >
                <option value="" disabled>
                  Seleccionar día
                </option>
                {DAYS_OF_WEEK.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </SelectField>
            </>
          ) : (
            <DatePickerField
              required
              id="specificDate"
              label="Fecha específica"
              minDate={new Date()}
              value={specificDate ?? ''}
              onChange={handleSpecificDateChange}
              error={errors.specificDate?.message}
            />
          )}

          <TimePickerField
            id="startTime"
            label="Hora Inicio"
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
          <TimePickerField
            id="endTime"
            label="Hora Fin"
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
          <InputField
            id="slotDuration"
            label="Duración del turno (min)"
            type="number"
            required
            min={15}
            max={120}
            step={5}
            value={slotDuration}
            onChange={(e) =>
              handleSlotDurationChange(Number(e.target.value) || 30)
            }
            error={errors.slotDuration?.message}
          />
          <InputField
            id="maxPatientsPerSlot"
            label="Máx. pacientes por turno"
            type="number"
            required
            min={1}
            max={10}
            value={maxPatientsPerSlot}
            onChange={(e) =>
              handleMaxPatientsChange(Number(e.target.value) || 1)
            }
            error={errors.maxPatientsPerSlot?.message}
          />
        </div>
      </form>
    </Modal>
  );
};

export default CreateAvailabilityModal;
