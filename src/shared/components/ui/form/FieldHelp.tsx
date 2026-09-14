import type { FieldHelpProps } from './FieldHelp.types';

const FieldHelp = ({ help, error, id }: FieldHelpProps) => {
  const message = error ?? help;
  if (!message) return null;

  return (
    <p
      id={id}
      role={error ? 'alert' : undefined}
      className={`mt-1.5 text-xs leading-relaxed ${
        error ? 'font-medium text-error' : 'text-text-muted'
      }`}
    >
      {message}
    </p>
  );
};

export default FieldHelp;