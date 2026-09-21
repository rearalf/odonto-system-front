export const sizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-9 w-9',
  lg: 'h-20 w-20',
} as const;

export const textClasses = {
  sm: 'text-label-lg',
  md: 'text-label-lg',
  lg: 'text-headline-md',
} as const;

export const fallbackClasses =
  'inline-flex select-none items-center justify-center rounded-full font-display font-semibold uppercase tracking-wide text-primary bg-linear-to-b from-primary-light to-primary/25 ring-1 ring-primary/20 shadow-card';

export const imageClasses =
  'h-full w-full rounded-full object-cover ring-1 ring-black/[0.04]';

export const getInitials = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join('')
    .toUpperCase();