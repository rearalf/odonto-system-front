import type { ReactNode } from 'react';

export type ModalSize = 'sm' | 'md' | 'lg';

export type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  size?: ModalSize;
  closeOnBackdrop?: boolean;
};

export type UseModalOptions = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  closeOnBackdrop?: boolean;
};
