import { clsx } from 'clsx';
import FieldLabel, { fieldBaseClass } from './FieldLabel';
import { fieldColorClass } from './fieldColors';
import FieldHelp from './FieldHelp';
import type { FieldMockProps } from './types/FieldMock';

const FieldMock = ({
  label,
  placeholder,
  badge,
  leftIcon: Icon,
  help,
  error,
}: FieldMockProps) => (
  <div>
    <FieldLabel label={label} required badge={badge} />
    <div className="relative">
      <Icon
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-text-subtle"
      />
      {/* Aquí se integrará la librería externa de DatePicker / Mask Input */}
      <div
        tabIndex={0}
        className={clsx(fieldBaseClass, fieldColorClass(error), 'pl-11')}
      >
        <span className="text-text-subtle">{placeholder}</span>
      </div>
    </div>
    <FieldHelp help={help} error={error} />
  </div>
);

export default FieldMock;
