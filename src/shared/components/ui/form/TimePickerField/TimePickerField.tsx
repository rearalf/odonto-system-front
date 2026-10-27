import { clsx } from 'clsx';

import useTimePicker from './useTimePicker';
import TimePickerInput from './TimePickerInput';
import { FieldLabel, FieldHelp } from '../index';
import TimePickerDropdown from './TimePickerDropdown';
import type { TimePickerFieldProps } from '../types/TimePickerField';

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

  const placeholderText = props.use12Hour
    ? showSeconds
      ? 'hh:mm:ss AM'
      : 'hh:mm AM'
    : showSeconds
      ? 'HH:mm:ss'
      : 'HH:mm';

  const messageId = id ? `${id}-message` : undefined;

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
        <TimePickerInput
          id={id}
          displayValue={displayValue}
          placeholderText={placeholderText}
          disabled={disabled}
          required={required}
          error={error}
          leftIcon={Icon}
          messageId={messageId}
          setReference={setReference}
          isOpen={state.isOpen}
          actions={{
            setIsOpen: actions.setIsOpen,
            handleKeyDown: actions.handleKeyDown,
            handleClear: actions.handleClear,
          }}
        />

        {state.isOpen && !disabled && (
          <TimePickerDropdown
            setDropdown={setDropdown}
            floatingStyles={floatingStyles}
            use12Hour={props.use12Hour}
            showSeconds={showSeconds}
            state={state}
            lists={{
              hoursList: hoursList,
              minutesList: minutesList,
              secondsList: secondsList,
              periodsList: periodsList,
            }}
            validators={{
              isHourDisabled: isHourDisabled,
              isMinuteDisabled: isMinuteDisabled,
              isSecondDisabled: isSecondDisabled,
              isPeriodDisabled: isPeriodDisabled,
            }}
            actions={{
              setIsOpen: actions.setIsOpen,
              setHours: actions.setHours,
              setMinutes: actions.setMinutes,
              setSeconds: actions.setSeconds,
              setPeriod: actions.setPeriod,
              handleNow: actions.handleNow,
              handleSelect: actions.handleSelect,
            }}
          />
        )}
      </div>
      <FieldHelp help={help} error={error} id={messageId} />
    </div>
  );
};

export default TimePickerField;
