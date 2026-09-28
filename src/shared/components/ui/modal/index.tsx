import { X } from 'lucide-react';
import { cn } from '@/shared/utils/cn';
import { Button } from '@/shared/components/ui/button';
import useModal from '@/shared/components/ui/modal/useModal';
import type { ModalProps } from '../types/Modal';
import { modalClasses } from './classes';

function Modal({
  open,
  onOpenChange,
  title,
  description,
  icon,
  children,
  footer,
  size = 'sm',
  closeOnBackdrop = true,
}: ModalProps) {
  const { titleId, descriptionId, panelRef, handleClose, handleBackdropClick } =
    useModal({ open, onOpenChange, closeOnBackdrop });

  if (!open) return null;

  return (
    <div className={modalClasses.overlay} onClick={handleBackdropClick}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
        tabIndex={-1}
        className={cn(modalClasses.panel, modalClasses.sizes[size])}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-3 top-3 text-text-muted hover:text-text-primary"
          aria-label="Cerrar modal"
          title="Cerrar"
          onClick={handleClose}
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </Button>

        {(title || icon) && (
          <div className={modalClasses.header}>
            {icon && <span className={modalClasses.iconFrom}>{icon}</span>}
            <div>
              {title && (
                <h2 id={titleId} className={modalClasses.title}>
                  {title}
                </h2>
              )}
              {description && (
                <p id={descriptionId} className={modalClasses.description}>
                  {description}
                </p>
              )}
            </div>
          </div>
        )}

        {children && <div className={modalClasses.body}>{children}</div>}

        {footer && <footer className={modalClasses.footer}>{footer}</footer>}
      </div>
    </div>
  );
}

export default Modal;
