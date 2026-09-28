import type { ReactNode } from 'react';
import { Toaster } from '@/shared/components/feedback';

export function ToasterProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
