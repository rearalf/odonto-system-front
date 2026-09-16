export const variantClasses = {
  primary:
    'bg-primary text-text-inverse hover:bg-primary-hover active:bg-primary-active',
  secondary:
    'bg-secondary text-secondary-text border border-secondary-border hover:bg-secondary-hover',
  ghost: 'text-text-primary hover:bg-ghost-hover',
  destructive:
    'bg-destructive text-text-inverse hover:bg-destructive-hover active:bg-destructive-active',
  success:
    'bg-success text-text-inverse hover:bg-success-hover active:bg-success-active',
} as const;

export const sizeClasses = {
  sm: 'h-8 px-3 text-label-md',
  md: 'h-10 px-4 text-label-lg',
  lg: 'h-12 px-5 text-label-lg',
} as const;

export const iconOnlySizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
} as const;