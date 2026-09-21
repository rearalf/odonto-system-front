export const tableClasses = {
  wrapper:
    'rounded-xl border border-border-default bg-bg-surface shadow-sm',
  scroll: 'overflow-x-auto',
  table: 'w-full min-w-[640px] border-collapse',
  thead: 'bg-bg-surface-elevated',
  th: 'border-b border-border-default px-4 py-3 text-left text-label-md font-semibold whitespace-nowrap text-text-muted',
  thSortable:
    'inline-flex cursor-pointer items-center gap-1 select-none transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded',
  tbody: 'divide-y divide-border-default',
  row: 'transition-colors hover:bg-bg-surface-elevated/60',
  td: 'px-4 py-3 text-body-md whitespace-nowrap text-text-primary',
  footer:
    'flex flex-col gap-3 border-t border-border-default px-4 py-3 sm:flex-row sm:items-center sm:justify-between',
  footerInfo: 'flex flex-col gap-2 sm:flex-row sm:items-center',
  info: 'text-body-sm text-text-muted',
  select:
    'h-8 rounded-md border border-border-default bg-bg-surface px-2 text-label-md text-text-secondary',
  pagination: 'flex items-center justify-center gap-1 sm:justify-end',
  ellipsis: 'inline-flex h-8 items-center px-1 text-label-md text-text-subtle',
  empty: 'p-8 text-center sm:p-12',
  skeleton: 'h-4 w-24 animate-pulse rounded-sm bg-bg-surface-subtle',
} as const;

export const paginationClasses = {
  base: 'inline-flex h-8 min-w-8 items-center justify-center rounded-md px-2 text-label-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40',
  idle: 'text-text-secondary hover:bg-ghost-hover',
  active: 'bg-primary text-text-inverse hover:bg-primary-hover',
  disabled: 'cursor-not-allowed text-disabled-text hover:bg-transparent',
} as const;