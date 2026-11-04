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
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-end justify-between border-b border-border-subtle pb-3">
        <p className="text-label-lg font-bold text-text-primary">
          Horarios disponibles
        </p>
        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-body-sm font-medium text-primary">
          {slots.length} opciones
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {slots.map((slot) => {
          const disabled = !slot.isAvailable;
          const isSelected = selected === slot.startTime;

          return (
            <button
              key={`${slot.startTime}-${slot.endTime}`}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(slot)}
              className={clsx(
                'group relative flex flex-col items-center justify-center rounded-2xl border p-4 transition-all duration-200 ease-in-out',
                isSelected &&
                  'scale-[1.02] border-primary bg-primary text-white shadow-md shadow-primary/30 ring-2 ring-primary ring-offset-2',
                !isSelected &&
                  !disabled &&
                  'border-border-default bg-bg-surface hover:scale-[1.02] hover:border-primary/60 hover:bg-primary/5 hover:shadow-sm',
                disabled &&
                  'cursor-not-allowed border-border-subtle bg-bg-surface-elevated/50 opacity-60 grayscale',
              )}
            >
              <span
                className={clsx(
                  'text-body-md font-bold tracking-wide transition-colors',
                  isSelected ? 'text-white' : 'text-text-primary',
                )}
              >
                {slot.startTime}
              </span>
              <span
                className={clsx(
                  'mt-1 text-body-sm transition-colors',
                  isSelected
                    ? 'text-white/80'
                    : disabled
                      ? 'text-text-muted'
                      : 'text-primary/80 font-medium',
                )}
              >
                {disabled ? 'Completo' : `${slot.availableSpots} disponibles`}
              </span>
            </button>
          );
        })}
      </div>

      {error && (
        <div className="mt-2 rounded-lg bg-error/10 p-3">
          <p className="text-body-sm font-medium text-error text-center">
            {error}
          </p>
        </div>
      )}
    </div>
  );
}
