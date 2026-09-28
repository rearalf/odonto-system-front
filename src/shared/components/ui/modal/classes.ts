export const modalClasses = {
  overlay:
    'fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4',
  panel:
    'relative flex max-h-full w-full flex-col overflow-hidden rounded-xl border border-border-default bg-bg-surface shadow-modal',
  sizes: {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  } as const,
  body: 'overflow-y-auto px-6 py-5',
  header: 'flex items-start gap-4 border-b border-border-subtle px-6 py-4',
  iconFrom: 'flex shrink-0 items-center justify-center rounded-full',
  title: 'text-headline-md font-semibold text-text-primary',
  description: 'mt-1 text-body-md text-text-muted',
  footer: 'flex justify-end gap-3 border-t border-border-subtle px-6 py-4',
} as const;