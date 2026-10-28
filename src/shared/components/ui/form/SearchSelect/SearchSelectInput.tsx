import { clsx } from 'clsx';
import { X, ChevronDown, Loader2 } from 'lucide-react';

import { fieldBaseClass } from '../FieldLabel';
import { fieldColorClass } from '../fieldColors';
import type { SearchSelectInputProps } from './SearchSelect.types';

export const SearchSelectInput = ({
  id,
  value,
  placeholder,
  disabled,
  error,
  required,
  isOpen,
  isLoading,
  leftIcon: LeftIcon,
  setReference,
  getReferenceProps,
  handleInputChange,
  handleClear,
}: SearchSelectInputProps) => {
  return (
    <div
      className={clsx(
        'relative w-full',
        disabled && 'pointer-events-none opacity-50',
      )}
    >
      {LeftIcon && (
        <LeftIcon
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-text-subtle z-10"
        />
      )}

      <input
        ref={setReference}
        {...getReferenceProps({
          onChange: handleInputChange,
        })}
        id={id}
        type="text"
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={id ? `${id}-message` : undefined}
        autoComplete="off"
        className={clsx(
          fieldBaseClass,
          fieldColorClass(error),
          LeftIcon && 'pl-11',
          'pr-16',
          disabled && 'opacity-50 cursor-not-allowed',
          isOpen && 'border-b-0 rounded-b-none',
        )}
      />

      {/* Controles Derechos (Limpiar + Indicadores) */}
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 z-10">
        {isLoading ? (
          <Loader2 className="h-4 w-4 animate-spin text-primary mr-1" />
        ) : (
          value != null &&
          value !== undefined &&
          value !== '0' && (
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
              onClick={handleClear}
              className="rounded-md p-1 text-text-subtle hover:bg-bg-surface-elevated hover:text-text-primary transition-colors"
              aria-label="Limpiar selección"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )
        )}
        <ChevronDown
          className={clsx(
            'h-4 w-4 text-text-subtle transition-transform pointer-events-none',
            isOpen && 'rotate-180',
          )}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};