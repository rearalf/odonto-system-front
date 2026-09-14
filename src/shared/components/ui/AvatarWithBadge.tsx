import { Camera, Trash2, UserRound } from 'lucide-react';
import { useEffect, useMemo, useRef } from 'react';
import type { ChangeEvent } from 'react';
import type { AvatarWithBadgeProps } from './types/AvatarWithBadge';

const sizeClasses = {
  md: 'h-20 w-20',
  lg: 'h-24 w-24',
} as const;

const AvatarWithBadge = ({
  size = 'lg',
  file,
  onFileSelect,
  onFileClear,
}: AvatarWithBadgeProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const previewUrl = useMemo(
    () => (file ? URL.createObjectURL(file) : undefined),
    [file],
  );

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handlePick = () => inputRef.current?.click();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextFile = event.target.files?.[0];
    if (nextFile) onFileSelect?.(nextFile);
    event.target.value = '';
  };

  const handleClear = () => onFileClear?.();

  const badgeClass =
    'absolute right-0 bottom-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-bg-surface-subtle shadow-md transition';

  return (
    <div className="relative shrink-0">
      <div
        className={`${sizeClasses[size]} flex items-center justify-center overflow-hidden rounded-full bg-bg-surface-elevated`}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Fotografía de la ficha clínica"
            className="h-full w-full object-cover"
          />
        ) : (
          <UserRound
            size={size === 'lg' ? 40 : 32}
            className="text-text-subtle"
            aria-hidden="true"
          />
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg"
        className="hidden"
        onChange={handleChange}
      />

      {file ? (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Eliminar foto"
          className={`${badgeClass} bg-red-600 hover:bg-red-700`}
        >
          <Trash2 size={16} className="text-white" aria-hidden="true" />
        </button>
      ) : (
        <button
          type="button"
          onClick={handlePick}
          aria-label="Subir foto"
          className={`${badgeClass} bg-sky-700 hover:bg-sky-800`}
        >
          <Camera size={16} className="text-white" aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default AvatarWithBadge;
