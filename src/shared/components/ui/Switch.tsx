import { clsx } from 'clsx';
import type { SwitchProps } from './types/Switch';

const Switch = ({
  checked,
  onChange,
  id,
  disabled = false,
  className,
  'aria-label': ariaLabel,
}: SwitchProps) => (
  <button
    type="button"
    id={id}
    role="switch"
    aria-checked={checked}
    aria-label={ariaLabel}
    disabled={disabled}
    onClick={() => onChange(!checked)}
    className={clsx(
      'relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-primary/60 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
      checked ? 'bg-switch-track-on' : 'bg-switch-track-off',
      className,
    )}
  >
    <span
      aria-hidden="true"
      className={clsx(
        'pointer-events-none h-5 w-5 rounded-full bg-switch-thumb shadow transition-transform duration-150',
        checked ? 'translate-x-[22px]' : 'translate-x-0.5',
      )}
    />
  </button>
);

export default Switch;