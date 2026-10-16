import { AlertTriangle } from 'lucide-react';

import {
  Button,
  DateField,
  TextAreaField,
  TimeField,
  Switch,
  Modal,
  Badge,
} from '@/shared/components/ui';
import { useExcepcionForm } from '@/modules/doctors/hooks/useExcepcionForm';
import type { ExcepcionModalProps } from '@/modules/doctors/types/availabilityModal';

export function ExcepcionModal({
  isOpen,
  onClose,
  doctorId,
  initialData,
  onSuccess,
}: ExcepcionModalProps) {
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
        <div className="flex items-center gap-3">
          <Switch
            id="isExcepcion"
            checked={false}
            disabled
            onChange={() => {}}
            aria-label="Excepción"
          />
          <label
            htmlFor="isExcepcion"
            className="font-medium text-text-primary"
          >
            Excepción (vacaciones, ausencia, etc.)
          </label>
          <Badge variant="warning" className="ml-auto">
            <span className="flex items-center gap-1">
              <AlertTriangle className="h-3 w-3" />
              Fecha única
            </span>
          </Badge>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <DateField
            id="startDate"
            label="Fecha inicio"
            required
            value={startDate}
            onChange={(val) => handleStartDateChange(val)}
            error={errors.startDate?.message}
          />
          <TimeField
            id="startTime"
            label="Hora inicio"
            required
            value={startTime}
            onChange={(val) =>
              setValue('startTime', val, { shouldValidate: true })
            }
            error={errors.startTime?.message}
          />
          <DateField
            id="endDate"
            label="Fecha fin"
            required
            value={endDate}
            onChange={(val) => handleEndDateChange(val)}
            error={errors.endDate?.message}
          />
          <TimeField
            id="endTime"
            label="Hora fin"
            required
            value={endTime}
            onChange={(val) =>
              setValue('endTime', val, { shouldValidate: true })
            }
            error={errors.endTime?.message}
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
