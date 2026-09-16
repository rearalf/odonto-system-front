import { Loader2 } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import type { ButtonProps } from './types';
import { iconOnlySizeClasses, sizeClasses, variantClasses } from './classes';

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