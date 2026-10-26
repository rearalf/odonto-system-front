import { FloatingPortal } from '@floating-ui/react';
import { clsx } from 'clsx';
import { Clock, X } from 'lucide-react';
import FieldLabel, { fieldBaseClass } from '../FieldLabel';
import { fieldColorClass } from '../fieldColors';
import FieldHelp from '../FieldHelp';
import useTimePicker from './useTimePicker';
import type { TimePickerFieldProps } from '../types/TimePickerField';
import Button from '../../button';

const TimePickerField = ({
  label,
  required,
  optional,
  badge,
  leftIcon: Icon,
  help,
  error,
  id,
  value,
  onChange,
  disabled = false,
  showSeconds = true,
  className,
  ...props
}: TimePickerFieldProps) => {
  const messageId = id ? `${id}-message` : undefined;
  const {
    state,
    actions,
    displayValue,
    hoursList,
    minutesList,
    secondsList,
    periodsList,
    isHourDisabled,
    isMinuteDisabled,
    isSecondDisabled,
    isPeriodDisabled,
    setReference,
    setDropdown,
    floatingStyles,
  } = useTimePicker({
    label,
    required,
    optional,
    badge,
    leftIcon: Icon,
    help,
    error,
    id,
    value,
    onChange,
    disabled,
    showSeconds,
    stepSeconds: props.stepSeconds,
    min: props.min,
    max: props.max,
    use12Hour: props.use12Hour,
    accept12HourInput: props.accept12HourInput,
  });

  const columnClasses = 'flex flex-col gap-1 px-1 h-full';
  const scrollColumnClasses =
    'max-h-40 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-700';
  const noScrollColumnClasses = 'max-h-40 overflow-y-auto';

  return (
    <div className={clsx('w-full', className)}>
      <FieldLabel
        label={label}
        required={required}
        optional={optional}
        badge={badge}
        htmlFor={id}
      />
      <div className="relative">
        <div className="relative">
          {Icon && (
            <Icon
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-text-subtle"
            />
          )}
          <input
            ref={setReference}
            id={id}
            type="text"
            readOnly
            value={displayValue}
            placeholder={
              props.use12Hour
                ? showSeconds
                  ? 'hh:mm:ss AM'
                  : 'hh:mm AM'
                : showSeconds
                  ? 'HH:mm:ss'
                  : 'HH:mm'
            }
            onClick={() => !disabled && actions.setIsOpen(true)}
            onKeyDown={actions.handleKeyDown}
            aria-required={required || undefined}
            aria-invalid={error ? true : undefined}
            aria-describedby={messageId}
            aria-haspopup="dialog"
            aria-expanded={state.isOpen}
            disabled={disabled}
            className={clsx(
              fieldBaseClass,
              fieldColorClass(error),
              Icon && 'pl-11',
              'pr-10 cursor-pointer',
              disabled && 'opacity-50 cursor-not-allowed',
            )}
          />
          <button
            type="button"
            tabIndex={-1}
            onClick={() => !disabled && actions.setIsOpen(!state.isOpen)}
            disabled={disabled}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-text-subtle hover:text-text-primary transition-colors"
            aria-label="Abrir selector de hora"
          >
            <Clock className="h-4 w-4" />
          </button>
          {displayValue && !disabled && (
            <button
              type="button"
              tabIndex={-1}
              onClick={actions.handleClear}
              className="absolute inset-y-0 right-10 flex items-center px-2 text-text-muted hover:text-text-primary transition-colors"
              aria-label="Limpiar hora"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {state.isOpen && !disabled && (
          <FloatingPortal>
            <div
              ref={setDropdown}
              style={floatingStyles}
              className="z-50 mt-1 w-56 origin-top-right bg-bg-surface-elevated border border-border-default shadow-sm rounded-xl p-3"
              role="dialog"
              aria-label="Seleccionar hora"
            >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <span className="text-label-lg font-medium text-text-primary">
                Seleccionar hora
              </span>
              <Button
                variant="ghost"
                color="info"
                size="sm"
                type="button"
                onClick={() => actions.setIsOpen(false)}
              >
                Cerrar
              </Button>
            </div>

            {/* Columns */}
            <div className="grid grid-cols-3 gap-1 w-auto pb-2">
              {/* Hours */}
              <div className={`${columnClasses} min-w-14`}>
                <div className="text-xs text-text-secondary mb-1 px-1 uppercase tracking-wider">
                  {props.use12Hour ? 'Hora (1-12)' : 'Horas (0-23)'}
                </div>
                <div className={scrollColumnClasses}>
                  {hoursList.map((h) => (
                    <Button
                      key={h}
                      type="button"
                      variant="ghost"
                      color="info"
                      size="sm"
                      onClick={() => actions.setHours(h)}
                      disabled={isHourDisabled(h) || state.hours === h}
                      className={clsx(
                        'text-sm w-full',
                        state.hours === h
                          ? 'bg-blue-900 text-white opacity-60'
                          : '',
                        isHourDisabled(h) && 'opacity-40 cursor-not-allowed',
                      )}
                    >
                      {String(h).padStart(2, '0')}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Minutes */}
              <div className={`${columnClasses}`}>
                <div className="text-xs text-text-secondary mb-1 px-1 uppercase tracking-wider">
                  Min
                </div>
                <div className={scrollColumnClasses}>
                  {minutesList.map((m) => (
                    <Button
                      key={m}
                      type="button"
                      variant="ghost"
                      color="info"
                      size="sm"
                      onClick={() => actions.setMinutes(m)}
                      disabled={isMinuteDisabled(m) || state.minutes === m}
                      className={clsx(
                        'w-full text-sm',
                        state.minutes === m
                          ? 'bg-blue-900 text-white opacity-60'
                          : '',
                        isMinuteDisabled(m) && 'opacity-40 cursor-not-allowed',
                      )}
                    >
                      {String(m).padStart(2, '0')}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Seconds (conditional) */}
              {showSeconds && (
                <div className={`${columnClasses}`}>
                  <div className="text-xs text-text-secondary mb-1 px-1 uppercase tracking-wider">
                    Seg
                  </div>
                  <div className={noScrollColumnClasses}>
                    {secondsList.map((s) => (
                      <Button
                        key={s}
                        type="button"
                        variant="ghost"
                        color="info"
                        size="sm"
                        onClick={() => actions.setSeconds(s)}
                        disabled={isSecondDisabled(s) || state.seconds === s}
                        className={clsx(
                          'w-full text-sm',
                          state.seconds === s
                            ? 'bg-blue-900 text-white opacity-60'
                            : '',
                          isSecondDisabled(s) &&
                            'opacity-40 cursor-not-allowed',
                        )}
                      >
                        {String(s).padStart(2, '0')}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* AM/PM (12h only) */}
              {props.use12Hour && (
                <div className={`${columnClasses}`}>
                  <div className="text-xs text-text-secondary mb-1 px-1 uppercase tracking-wider">
                    Periodo
                  </div>
                  <div className={noScrollColumnClasses}>
                    {periodsList.map((p) => (
                      <Button
                        key={p}
                        type="button"
                        variant="ghost"
                        size="sm"
                        color="info"
                        onClick={() => actions.setPeriod(p)}
                        disabled={isPeriodDisabled(p) || state.period === p}
                        className={clsx(
                          'w-full text-sm',
                          state.period === p
                            ? 'bg-blue-900 text-white opacity-60'
                            : '',
                          isPeriodDisabled(p) &&
                            'opacity-40 cursor-not-allowed',
                        )}
                      >
                        {p}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-border-default">
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-400 hover:text-blue-300 transition-colors"
                onClick={actions.handleNow}
              >
                Now
              </Button>
              <Button
                variant="solid"
                size="sm"
                className="bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                onClick={actions.handleSelect}
              >
                Seleccionar
              </Button>
            </div>
          </div>
        </FloatingPortal>
        )}
      </div>
      <FieldHelp help={help} error={error} id={messageId} />
    </div>
  );
};

export default TimePickerField;
