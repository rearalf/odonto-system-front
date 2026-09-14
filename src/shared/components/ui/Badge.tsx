import { clsx } from 'clsx';
import type { BadgeProps } from './types/Badge';

const variantClasses = {
  default: 'bg-bg-surface-subtle text-text-secondary',
  primary: 'bg-primary-light text-primary',
  success: 'bg-emerald-50 text-success',
  warning: 'bg-amber-50 text-warning',
  error: 'bg-red-50 text-error',
  info: 'bg-sky-50 text-info',
} as const;

const dotClasses = {
  default: 'bg-text-subtle',
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
  info: 'bg-info',
} as const;

const sizeClasses = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2.5 py-0.5 text-xs',
} as const;

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className,
}: BadgeProps) => (
  <span
    className={clsx(
      'inline-flex items-center gap-1.5 rounded-full font-medium',
      sizeClasses[size],
      variantClasses[variant],
      className,
    )}
  >
    {dot && (
      <span
        className={clsx('h-1.5 w-1.5 rounded-full', dotClasses[variant])}
        aria-hidden="true"
      />
    )}
    {children}
  </span>
);
