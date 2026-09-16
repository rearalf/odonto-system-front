import { Loader2 } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import type { ButtonProps } from './types/Button';

const variantClasses = {
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

const sizeClasses = {
  sm: 'h-8 px-3 text-label-md',
  md: 'h-10 px-4 text-label-lg',
  lg: 'h-12 px-5 text-label-lg',
} as const;

const iconOnlySizeClasses = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
} as const;

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  icon,
  iconRight,
  type = 'button',
  className,
  ...rest
}: ButtonProps) => {
  const isDisabled = disabled || loading;
  const isIconOnly =
    !children && (Boolean(icon) || Boolean(iconRight) || loading);

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-disabled={isDisabled || undefined}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg font-medium',
        'transition-colors focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-app focus-visible:outline-none',
        isIconOnly ? iconOnlySizeClasses[size] : sizeClasses[size],
        isDisabled
          ? 'cursor-not-allowed bg-disabled-bg text-disabled-text'
          : variantClasses[variant],
        className,
      )}
      {...rest}
    >
      {loading ? (
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
      ) : (
        icon
      )}
      {children}
      {!loading && iconRight}
    </button>
  );
};

export default Button;
