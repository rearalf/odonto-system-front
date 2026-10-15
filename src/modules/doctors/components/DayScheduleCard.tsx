import { Clock, Plus, Trash2 } from 'lucide-react';
import { Controller } from 'react-hook-form';
import { Button, InputField, Switch, TimeField } from '@/shared/components/ui';
import type { Control, FieldErrors } from 'react-hook-form';
import type { DayOfWeek } from '@/modules/doctors/types/Availability';
import {
  type WeeklyScheduleFormValues,
  type AvailabilityBlockFormValues,
} from '@/modules/doctors/schemas/AvailabilitySchema';

interface DayScheduleCardProps {
  day: { value: DayOfWeek; label: string };
  shifts: { block: AvailabilityBlockFormValues; index: number }[];
  isEnabled: boolean;
  blocks: AvailabilityBlockFormValues[];
  isPending: boolean;
  errors: FieldErrors<WeeklyScheduleFormValues>;
  control: Control<WeeklyScheduleFormValues>;
  updateBlock: (index: number, updates: Partial<AvailabilityBlockFormValues>) => void;
  removeShift: (index: number) => void;
  addShift: (dayOfWeek: DayOfWeek) => void;
  DEFAULT_SLOT_DURATION: number;
  DEFAULT_MAX_PATIENTS_PER_SLOT: number;
}

export function DayScheduleCard({
  day,
  shifts,
  isEnabled,
  blocks,
  isPending,
  errors,
  control,
  updateBlock,
  removeShift,
  addShift,
  DEFAULT_SLOT_DURATION,
  DEFAULT_MAX_PATIENTS_PER_SLOT,
}: DayScheduleCardProps) {
  return (
    <div
      key={day.value}
      className={`rounded-lg border border-border-default bg-bg-surface p-4 transition-colors ${
        isEnabled ? 'border-primary/50 bg-primary/5' : ''
      }`}
    >
      <div className="flex items-center gap-3 mb-3">
        <Switch
          id={`day-${day.value}`}
          checked={isEnabled}
          onChange={(checked) => {
            if (checked) {
              addShift(day.value);
            } else {
              const indicesToRemove = blocks
                .map((b, i) => (b.dayOfWeek === day.value ? i : -1))
                .filter((i) => i !== -1)
                .reverse();
              indicesToRemove.forEach((i) => removeShift(i));
            }
          }}
          aria-label={`Habilitar ${day.label}`}
        />
        <label
          className="font-medium text-text-primary"
          htmlFor={`day-${day.value}`}
        >
          {day.label}
        </label>
      </div>

      {isEnabled && (
        <div className="space-y-3">
          {shifts.map(({ index }) => (
            <div
              key={index}
              className="flex flex-col gap-3 p-3 rounded border border-border-subtle bg-bg-surface-elevated"
            >
              <div className="flex items-center justify-between">
                <span className="text-label-sm font-medium text-text-secondary">
                  Turno{' '}
                  {shifts.findIndex((s) => s.index === index) + 1}
                </span>
                <Button
                  variant="ghost"
                  color="error"
                  size="sm"
                  onClick={() => removeShift(index)}
                  aria-label="Eliminar turno"
                  disabled={isPending}
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                </Button>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <Controller
                  name={`blocks.${index}.startTime`}
                  control={control}
                  render={({ field }) => (
                    <TimeField
                      id={`startTime-${day.value}-${index}`}
                      label="Hora Inicio"
                      required
                      leftIcon={Clock}
                      value={field.value}
                      onChange={(value: string) =>
                        updateBlock(index, { startTime: value })
                      }
                      error={errors.blocks?.[index]?.startTime?.message}
                      disabled={isPending}
                    />
                  )}
                />
                <Controller
                  name={`blocks.${index}.endTime`}
                  control={control}
                  render={({ field }) => (
                    <TimeField
                      id={`endTime-${day.value}-${index}`}
                      label="Hora Fin"
                      required
                      leftIcon={Clock}
                      value={field.value}
                      onChange={(value: string) =>
                        updateBlock(index, { endTime: value })
                      }
                      error={errors.blocks?.[index]?.endTime?.message}
                      disabled={isPending}
                    />
                  )}
                />
                <Controller
                  name={`blocks.${index}.slotDuration`}
                  control={control}
                  render={({ field }) => (
                    <InputField
                      id={`slotDuration-${day.value}-${index}`}
                      label="Duración Turno (min)"
                      type="number"
                      required
                      min={5}
                      max={120}
                      step={5}
                      value={field.value}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        const value =
                          Number(event.target.value) || DEFAULT_SLOT_DURATION;
                        updateBlock(index, { slotDuration: value });
                      }}
                      error={errors.blocks?.[index]?.slotDuration?.message}
                      disabled={isPending}
                    />
                  )}
                />
                <Controller
                  name={`blocks.${index}.maxPatientsPerSlot`}
                  control={control}
                  render={({ field }) => (
                    <InputField
                      id={`maxPatientsPerSlot-${day.value}-${index}`}
                      label="Máx. Pacientes/Turno"
                      type="number"
                      required
                      min={1}
                      max={10}
                      value={field.value}
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        const value =
                          Number(event.target.value) ||
                          DEFAULT_MAX_PATIENTS_PER_SLOT;
                        updateBlock(index, { maxPatientsPerSlot: value });
                      }}
                      error={
                        errors.blocks?.[index]?.maxPatientsPerSlot?.message
                      }
                      disabled={isPending}
                    />
                  )}
                />
              </div>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => addShift(day.value)}
            disabled={isPending}
          >
            <Plus className="h-4 w-4 mr-2" aria-hidden="true" />
            Agregar Turno
          </Button>
        </div>
      )}
    </div>
  );
}