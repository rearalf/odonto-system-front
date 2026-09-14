type FieldLabelProps = {
  label: string;
  required?: boolean;
  optional?: boolean;
  badge?: string;
  htmlFor?: string;
};

export const FieldLabel = ({
  label,
  required,
  optional,
  badge,
  htmlFor,
}: FieldLabelProps) => (
  <label
    htmlFor={htmlFor}
    className="mb-1.5 flex items-center gap-2 text-sm font-semibold text-text-primary"
  >
    {label}
    {required && <span className="text-red-500">*</span>}
    {optional && (
      <span className="font-normal text-text-subtle">(Opcional)</span>
    )}
    {badge && (
      <span className="rounded-full bg-primary-light px-2.5 py-0.5 text-xs font-medium text-primary">
        {badge}
      </span>
    )}
  </label>
);

export const fieldBaseClass =
  'w-full rounded-xl border border-transparent bg-bg-surface-subtle px-4 py-3 text-sm text-text-primary placeholder:text-text-subtle outline-none transition focus:border-primary focus:bg-bg-surface focus:ring-4 focus:ring-primary/10';