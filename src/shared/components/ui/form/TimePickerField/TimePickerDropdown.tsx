import { FloatingPortal } from '@floating-ui/react';
import Button from '../../button';
import TimePickerColumn from './TimePickerColumn';
import type { TimePickerDropdownProps } from '../types/TimePickerField';

const TimePickerDropdown = ({
  state,
  lists,
  actions,
  use12Hour,
  validators,
  showSeconds,
  floatingStyles,
  setDropdown,
}: TimePickerDropdownProps) => {
  return (
    <FloatingPortal>
      <div
        ref={setDropdown}
        style={floatingStyles}
        className="z-50 mt-1 w-56 origin-top-right bg-bg-surface-elevated border border-border-default shadow-sm rounded-xl p-3"
        role="dialog"
        aria-label="Seleccionar hora"
      >
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

        <div className="flex gap-1 pb-2">
          <TimePickerColumn
            title={use12Hour ? 'Hora (1-12)' : 'Horas (0-23)'}
            items={lists.hoursList}
            selectedValue={state.hours}
            onSelect={actions.setHours}
            isDisabled={validators.isHourDisabled}
            scrollable={true}
          />

          <TimePickerColumn
            title="Min"
            items={lists.minutesList}
            selectedValue={state.minutes}
            onSelect={actions.setMinutes}
            isDisabled={validators.isMinuteDisabled}
            scrollable={true}
          />

          {showSeconds && (
            <TimePickerColumn
              title="Seg"
              items={lists.secondsList}
              selectedValue={state.seconds}
              onSelect={actions.setSeconds}
              isDisabled={validators.isSecondDisabled}
              scrollable={false}
            />
          )}

          {use12Hour && (
            <TimePickerColumn
              title="Periodo"
              items={lists.periodsList}
              selectedValue={state.period}
              onSelect={actions.setPeriod}
              isDisabled={validators.isPeriodDisabled}
              scrollable={false}
            />
          )}
        </div>

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
  );
};

export default TimePickerDropdown;
