import { clsx } from 'clsx';
import type { BadgeProps } from './types';
import { dotClasses, sizeClasses, variantClasses } from './classes';

const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  className,
  style,
}: BadgeProps) => (
  <span
    className={clsx(
      'inline-flex items-center gap-1.5 rounded-full font-medium',
      sizeClasses[size],
      variantClasses[variant],
      className,
    )}
    style={style}
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

export default Badge;