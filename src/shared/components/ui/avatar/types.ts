export type AvatarSize = 'sm' | 'md' | 'lg';

export type AvatarProps = {
  name: string;
  src?: string | null;
  alt?: string;
  size?: AvatarSize;
  className?: string;
};