import Badge from '../badge';
import type { FieldLabelProps } from './types/FieldLabel';

const FieldLabel = ({
  label,
  required,
  optional,
  badge,
  htmlFor,
}: FieldLabelProps) => (
  <label
    htmlFor={htmlFor}
    className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-label-lg font-semibold text-text-primary"
  >
    <span className="min-w-0">{label}</span>
    {required && <span className="text-red-500">*</span>}
    {optional && (
      <span className="font-normal text-text-subtle">(Opcional)</span>
    )}
    {badge && <Badge variant="primary" size="sm">{badge}</Badge>}
  </label>
);

export const fieldBaseClass =
  'w-full rounded-xl border bg-bg-surface-subtle px-4 py-3 text-base sm:text-body-md text-text-primary placeholder:text-text-subtle outline-none transition focus:bg-bg-surface focus:ring-4';

export default FieldLabel;
