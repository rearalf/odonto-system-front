export const variantClasses = {
  default: 'bg-bg-surface-subtle text-text-secondary',
  primary: 'bg-primary-light text-primary',
  success: 'bg-emerald-50 text-success',
  warning: 'bg-amber-50 text-warning',
  error: 'bg-red-50 text-error',
  info: 'bg-sky-50 text-info',
} as const;

export const dotClasses = {
  default: 'bg-text-subtle',
  primary: 'bg-primary',
  success: 'bg-success',
  warning: 'bg-warning',
  error: 'bg-error',
  info: 'bg-info',
} as const;

export const sizeClasses = {
  sm: 'px-2 py-0.5 text-label-md',
  md: 'px-2.5 py-0.5 text-label-md',
} as const;