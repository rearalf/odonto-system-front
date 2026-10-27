import { useEffect, useId, useRef } from 'react';
import type { UseModalOptions } from '../types';

function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}

function useModal({
  open,
  onOpenChange,
  closeOnBackdrop = true,
}: UseModalOptions) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(0);

  useEffect(() => {
    if (!open) return;
    const scrollbarWidth = getScrollbarWidth();
    scrollYRef.current = window.scrollY;

    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';

    panelRef.current?.focus();

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
      document.body.style.top = '';
      document.body.style.position = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollYRef.current);
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
