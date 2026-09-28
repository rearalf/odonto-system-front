import { useEffect, useId, useRef } from 'react';
import type { UseModalOptions } from '../types';

function useModal({
  open,
  onOpenChange,
  closeOnBackdrop = true,
}: UseModalOptions) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open || !closeOnBackdrop) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onOpenChange(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, closeOnBackdrop, onOpenChange]);

  const handleClose = () => onOpenChange(false);

  const handleBackdropClick = () => {
    if (closeOnBackdrop) onOpenChange(false);
  };

  return { titleId, descriptionId, panelRef, handleClose, handleBackdropClick };
}

export default useModal;
