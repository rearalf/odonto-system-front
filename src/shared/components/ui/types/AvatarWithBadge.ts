export type AvatarWithBadgeProps = {
  size?: 'md' | 'lg';
  file?: File | null;
  onFileSelect?: (file: File) => void;
  onFileClear?: () => void;
};
