import { useState } from 'react';
import AvatarWithBadge from '@/shared/components/ui/AvatarWithBadge';

interface PhotoUploadCardProps {
  file?: File | null;
  onFileChange?: (file: File | null) => void;
}

export const PhotoUploadCard = ({ file, onFileChange }: PhotoUploadCardProps) => {
  const [internalFile, setInternalFile] = useState<File | null>(null);
  const currentFile = onFileChange ? file ?? null : internalFile;
  const setCurrentFile = (next: File | null) =>
    onFileChange ? onFileChange(next) : setInternalFile(next);

  return (
    <section className="flex flex-col items-start gap-6 rounded-2xl border border-border-subtle bg-bg-surface-subtle p-6 shadow-sm sm:flex-row sm:items-center">
      <AvatarWithBadge
        file={currentFile}
        onFileSelect={setCurrentFile}
        onFileClear={() => setCurrentFile(null)}
      />

      <div className="flex-1">
        <h3 className="text-headline-sm font-semibold text-text-primary">Fotografía de Ficha Clínica</h3>
        <p className="mt-1 text-body-md text-text-muted">
          Archivos admitidos: JPG o PNG. Tamaño máximo recomendado: 5 MB. Enfoque
          frontal nítido.
        </p>
      </div>
    </section>
  );
};