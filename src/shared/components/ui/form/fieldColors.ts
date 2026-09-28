export const fieldColorClass = (error?: string | boolean) =>
  error
    ? 'border-error focus:border-error focus:ring-error/10'
    : 'border-transparent focus:border-primary focus:ring-primary/10';