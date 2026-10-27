import { clsx } from 'clsx';
import Button from '../../button';
import type { TimePickerColumnProps } from '../types/TimePickerField';

const TimePickerColumn = <T extends string | number>({
  title,
  items,
  selectedValue,
  scrollable = true,
  onSelect,
  isDisabled,
}: TimePickerColumnProps<T>) => {
  return (
    <div className="flex flex-col gap-1 px-1 h-full min-w-14">
      <div className="text-xs text-text-secondary mb-1 px-1 uppercase tracking-wider">
        {title}
      </div>

      <div
        className={clsx(
          'max-h-40 overflow-y-auto',
          scrollable &&
            'scrollbar-thin scrollbar-track-transparent scrollbar-thumb-zinc-700',
        )}
      >
        {items.map((item) => (
          <Button
            key={String(item)}
            type="button"
            variant="ghost"
            color="info"
            size="sm"
            onClick={() => onSelect(item)}
            disabled={isDisabled(item) || selectedValue === item}
            className={clsx(
              'w-full text-sm',
              selectedValue === item ? 'bg-blue-900 text-white opacity-60' : '',
              isDisabled(item) && 'opacity-40 cursor-not-allowed',
            )}
          >
            {typeof item === 'number' ? String(item).padStart(2, '0') : item}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default TimePickerColumn;
