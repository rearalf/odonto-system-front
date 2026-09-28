export const variantClasses = {
  solid: '',
  outline: 'border',
  ghost: '',
} as const;

export const colorClasses = {
  primary: {
    solid:
      'bg-primary text-text-inverse hover:bg-primary-hover active:bg-primary-active',
    outline:
      'bg-secondary text-secondary-text border-secondary-border hover:bg-secondary-hover',
    ghost: 'text-text-primary hover:bg-ghost-hover',
  },
  success: {
    solid:
      'bg-success text-text-inverse hover:bg-success-hover active:bg-success-active',
    outline: 'text-success border-success/40 hover:bg-success/10',
    ghost: 'text-success hover:bg-success/10',
  },
  error: {
    solid:
      'bg-destructive text-text-inverse hover:bg-destructive-hover active:bg-destructive-active',
    outline: 'text-destructive border-destructive/40 hover:bg-destructive/10',
    ghost: 'text-destructive hover:bg-destructive/10',
  },
  info: {
    solid: 'bg-info text-text-inverse hover:bg-info-hover',
    outline: 'text-info border-info/40 hover:bg-info/10',
    ghost: 'text-info hover:bg-info/10',
  },
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