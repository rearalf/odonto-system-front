import { useEffect, useId, useImperativeHandle, useRef } from 'react';
import { Check, Minus } from 'lucide-react';
import { clsx } from 'clsx';

import FieldLabel from '@/shared/components/ui/form/FieldLabel';
import FieldHelp from '@/shared/components/ui/form/FieldHelp';
import type { CheckboxFieldProps } from './types';
import { SIZE_CLASSES } from './constants';

const CheckboxField = ({
  label,
  description,
  required,
  optional,
  badge,
  help,
  error,
  indeterminate = false,
  size = 'md',
  variant = 'default',
  id,
  disabled,
  className,
  inputClassName,
  ref,
  ...inputProps
}: CheckboxFieldProps) => {
  const generatedId = useId();
  const fieldId = id ?? generatedId;

  const hasMessage = Boolean(help || error);
  const messageId = hasMessage ? `${fieldId}-message` : undefined;
  const descriptionId = description ? `${fieldId}-description` : undefined;

  const ariaDescribedBy =
    [descriptionId, messageId].filter(Boolean).join(' ') || undefined;

  const internalRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => internalRef.current as HTMLInputElement);

  useEffect(() => {
    if (internalRef.current) {
      internalRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const currentSize = SIZE_CLASSES[size];
  const isCard = variant === 'card';

  return (
    <div className={clsx('w-full', className)}>
      <div
        className={clsx(
          'relative flex gap-3 transition-all duration-150',
          description ? 'items-start' : 'items-center',
          isCard && [
            'min-h-17 rounded-xl border px-3.5 py-3 border-border-default',
            'bg-bg-surface-subtle',
            disabled
              ? 'cursor-not-allowed border-border/50 opacity-60'
              : 'cursor-pointer shadow-sm hover:border-primary/50 hover:bg-bg-surface hover:shadow',
            error
              ? 'border-error bg-error/5'
              : 'border-border has-checked:border-primary/60 has-checked:bg-primary/5 has-indeterminate:border-primary/60',
            'focus-within:ring-4 focus-within:ring-primary/10',
          ],
        )}
      >
        <div
          className={clsx(
            'relative flex shrink-0 items-center justify-center',
            description && currentSize.offset,
          )}
        >
          <input
            ref={internalRef}
            id={fieldId}
            type="checkbox"
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={ariaDescribedBy}
            className={clsx(
              'peer appearance-none border shadow-sm transition-all duration-150',
              'bg-bg-surface-subtle border-border-default',
              'hover:border-primary/70',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
              'checked:border-primary checked:bg-primary',
              'indeterminate:border-primary indeterminate:bg-primary',
              'disabled:cursor-not-allowed disabled:border-transparent disabled:bg-bg-surface-subtle disabled:opacity-50',
              !disabled && 'cursor-pointer',
              error &&
                'border-error hover:border-error focus-visible:ring-error/30 checked:border-error checked:bg-error',
              currentSize.box,
              inputClassName,
            )}
            {...inputProps}
          />

          <Check
            className={clsx(
              'pointer-events-none absolute text-white opacity-0 scale-75 transition-all duration-150',
              'peer-checked:opacity-100 peer-checked:scale-100 peer-indeterminate:opacity-0',
              currentSize.icon,
            )}
          />
          <Minus
            className={clsx(
              'pointer-events-none absolute text-white opacity-0 scale-75 transition-all duration-150',
              'peer-indeterminate:opacity-100 peer-indeterminate:scale-100',
              currentSize.icon,
            )}
          />
        </div>

        <div
          className={clsx(
            'relative flex flex-1 flex-col select-none [&_label]:mb-0',
            description && 'gap-y-0.5',
            disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
          )}
        >
          <FieldLabel
            htmlFor={fieldId}
            label={label}
            required={required}
            optional={optional}
            badge={badge}
          />

          {description && (
            <p
              id={descriptionId}
              className={clsx(
                'text-xs text-text-muted leading-relaxed',
                disabled && 'opacity-60',
              )}
            >
              {description}
            </p>
          )}
        </div>
      </div>

      <FieldHelp help={help} error={error} id={messageId} />
    </div>
  );
};

export default CheckboxField;
