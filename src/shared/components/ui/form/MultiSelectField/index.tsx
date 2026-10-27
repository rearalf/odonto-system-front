import { ChevronDown, X } from 'lucide-react';
import { clsx } from 'clsx';
import FieldLabel, { fieldBaseClass } from '../FieldLabel';
import { fieldColorClass } from '../fieldColors';
import FieldHelp from '../FieldHelp';
import { useMultiSelect } from './useMultiSelect';
import type { MultiSelectFieldProps } from './types';

const MultiSelectField = ({
  label,
  required,
  optional,
  leftIcon: Icon,
  help,
  error,
  id,
  options = [],
  placeholder = 'Seleccionar...',
  maxTags = 3,
  className,
  value = [],
  onChange,
  disabled,
}: MultiSelectFieldProps) => {
  const {
    open,
    focused,
    wrapperRef,
    handleKeyDown,
    handleClick,
    handleFocus,
    handleBlur,
    handleToggleOption,
    handleRemoveOption,
    selectedOptions,
    remainingOptions,
    messageId,
  } = useMultiSelect({ disabled, value, onChange, id, options });

  return (
    <div ref={wrapperRef}>
      {label && (
        <FieldLabel
          label={label}
          required={required}
          optional={optional}
          htmlFor={id}
        />
      )}
      <div className="relative">
        {Icon && (
          <Icon
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-text-subtle z-10"
          />
        )}
        <div
          className={clsx(
            fieldBaseClass,
            fieldColorClass(error),
            Icon && 'pl-11',
            'min-h-10.5 flex flex-wrap items-center gap-1.5 px-3 py-2',
            'cursor-pointer transition-colors',
            disabled && 'opacity-50 cursor-not-allowed',
            focused && 'ring-2 ring-primary ring-offset-2',
            open && 'border-b-0 rounded-b-none',
            className,
          )}
          onClick={handleClick}
          onFocus={handleFocus}
          onBlur={handleBlur}
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-labelledby={id ? `${id}-label` : undefined}
          aria-describedby={messageId}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={handleKeyDown}
        >
          {selectedOptions.map((opt) => (
            <span
              key={opt.value}
              className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 text-primary text-body-sm px-2 py-0.5"
            >
              {opt.label}
              <button
                type="button"
                onClick={(e) => handleRemoveOption(e, opt.value)}
                className="p-0.5 rounded hover:bg-primary/20"
                aria-label={`Eliminar ${opt.label}`}
              >
                <X size={12} />
              </button>
            </span>
          ))}
          {selectedOptions.length >= maxTags &&
            selectedOptions.length > maxTags && (
              <span className="text-body-sm text-text-muted px-1">
                +{selectedOptions.length - maxTags} más
              </span>
            )}
          {value.length === 0 && (
            <span className="text-body-md text-text-muted flex-1">
              {placeholder}
            </span>
          )}
          <ChevronDown
            aria-hidden="true"
            size={16}
            className={clsx(
              'pointer-events-none ml-auto shrink-0 text-text-subtle transition-transform',
              open && 'rotate-180',
            )}
          />
        </div>
        {open && !disabled && (
          <ul
            id={id}
            role="listbox"
            aria-label={label}
            className="absolute z-50 mt-1 w-full rounded-lg border border-border-default bg-bg-surface shadow-lg max-h-60 overflow-auto"
          >
            {remainingOptions.map((opt) => (
              <li
                key={opt.value}
                role="option"
                aria-selected={false}
                className="px-4 py-2 text-body-md text-text-primary hover:bg-bg-surface-elevated cursor-pointer"
                onClick={() => handleToggleOption(opt.value)}
              >
                {opt.label}
              </li>
            ))}
            {remainingOptions.length === 0 && (
              <li className="px-4 py-2 text-body-md text-text-muted">
                Todas las opciones seleccionadas
              </li>
            )}
          </ul>
        )}
      </div>
      <FieldHelp help={help} error={error} id={messageId} />
    </div>
  );
};

export default MultiSelectField;
