import type { LucideIcon } from 'lucide-react';
import { FieldLabel, fieldBaseClass } from './FieldLabel';

export type FieldMockProps = {
  label: string;
  placeholder: string;
  badge?: string;
  leftIcon: LucideIcon;
};

export const FieldMock = ({ label, placeholder, badge, leftIcon: Icon }: FieldMockProps) => (
  <div>
    <FieldLabel label={label} required badge={badge} />
    <div className="relative">
      <Icon
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-text-subtle"
      />
      {/* Aquí se integrará la librería externa de DatePicker / Mask Input */}
      <div tabIndex={0} className={fieldBaseClass}>
        <span className="text-text-subtle">{placeholder}</span>
      </div>
    </div>
  </div>
);