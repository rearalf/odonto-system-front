import { clsx } from 'clsx';
import type { Slot } from '@/modules/doctors/types/Slots';

type Props = {
  slots: Slot[];
  selected: string | undefined;
  onSelect: (slot: Slot) => void;
  error?: string;
};

export function AppointmentSlotsGrid({
  slots,
  selected,
  onSelect,
  error,
}: Props) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <p className="text-label-lg font-semibold text-text-primary">
          Horarios disponibles
        </p>
        <span className="text-body-sm text-text-muted">
          {slots.length} opciones
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {slots.map((slot) => {
          const disabled = !slot.isAvailable;
          return (
            <button
              key={`${slot.startTime}-${slot.endTime}`}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(slot)}
              className={clsx(
                'rounded-xl border px-3 py-3 text-left transition',
                selected === slot.startTime &&
                  'border-primary bg-primary/10 ring-2 ring-primary/20',
                selected !== slot.startTime &&
                  !disabled &&
                  'border-border-default bg-bg-surface hover:border-primary/60',
                disabled &&
                  'cursor-not-allowed border-border-subtle bg-bg-surface-elevated opacity-50',
              )}
            >
              <span className="block text-body-md font-semibold text-text-primary">
                {slot.startTime}
              </span>
              <span className="block text-body-sm text-text-muted">
                {disabled ? 'Completo' : `${slot.availableSpots} disponibles`}
              </span>
            </button>
          );
        })}
      </div>
      {error && <p className="mt-1.5 text-body-sm text-error">{error}</p>}
    </div>
  );
}
