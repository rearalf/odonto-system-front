export interface DetailFieldProps {
  label: string;
  value: string;
  className?: string;
}

export default function DetailField({
  label,
  value,
  className = '',
}: DetailFieldProps) {
  return (
    <div className={className}>
      <dt className="text-label-sm font-medium uppercase tracking-[0.08em] text-text-muted">
        {label}
      </dt>
      <dd className="mt-1 text-body-md text-text-primary">{value}</dd>
    </div>
  );
}
