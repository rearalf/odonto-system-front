import type { FieldHelpProps } from './types/FieldHelp';

const FieldHelp = ({ help, error, id }: FieldHelpProps) => {
  const message = error ?? help;
  if (!message) return null;

  return (
    <p
      id={id}
      role={error ? 'alert' : undefined}
      className={`mt-1.5 text-body-sm leading-relaxed ${
        error ? 'font-medium text-error' : 'text-text-muted'
      }`}
    >
      {message}
    </p>
  );
};

export default FieldHelp;