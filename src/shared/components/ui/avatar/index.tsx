import { clsx } from 'clsx';
import type { AvatarProps } from './types';
import { fallbackClasses, getInitials, imageClasses, sizeClasses, textClasses } from './classes';

const Avatar = ({ name, src, alt, size = 'md', className }: AvatarProps) => (
  <span
    className={clsx('relative inline-block shrink-0', sizeClasses[size], className)}
    aria-label={alt ?? name}
    role="img"
  >
    {src ? (
      <img src={src} alt="" className={imageClasses} />
    ) : (
      <span className={clsx(fallbackClasses, textClasses[size], 'h-full w-full')}>
        {getInitials(name)}
      </span>
    )}
  </span>
);

export default Avatar;