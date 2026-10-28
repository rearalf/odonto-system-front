import { FloatingPortal } from '@floating-ui/react';
import { clsx } from 'clsx';
import { Check } from 'lucide-react';

import type { SearchSelectDropdownProps } from './SearchSelect.types';

export const SearchSelectDropdown = ({
  isOpen,
  isLoading,
  options,
  value,
  loadingMessage,
  emptyMessage,
  floatingStyles,
  getFloatingProps,
  setFloating,
  getItemProps,
  handleSelectOption,
  renderOption,
}: SearchSelectDropdownProps) => {
  if (!isOpen) return null;

  return (
    <FloatingPortal>
      <div
        ref={setFloating}
        style={floatingStyles}
        {...getFloatingProps()}
        className="z-9999 max-h-60 overflow-y-auto rounded-xl border border-border-default bg-bg-surface p-1 shadow-lg"
      >
        {isLoading && (
          <div className="px-3 py-3 text-center text-body-sm text-text-muted">
            {loadingMessage}
          </div>
        )}

        {!isLoading && options.length === 0 && (
          <div className="px-3 py-3 text-center text-body-sm text-text-muted">
            {emptyMessage}
          </div>
        )}

        {!isLoading &&
          options.map((option, index) => {
            const isSelected = option.id === value;
            const itemProps = getItemProps({ index, disabled: option.disabled }) || {};
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { ref: _itemRef, ...itemPropsWithoutRef } = itemProps;
            return (
              <button
                key={option.id}
                {...itemPropsWithoutRef}
                type="button"
                onClick={() => handleSelectOption(option)}
                className={clsx(
                  'flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-body-md transition-colors',
                  isSelected
                    ? 'bg-bg-surface-elevated font-medium text-primary'
                    : 'text-text-primary hover:bg-bg-surface-elevated',
                  option.disabled && 'cursor-not-allowed opacity-40',
                )}
              >
                <div className="min-w-0 flex-1">
                  {renderOption ? (
                    renderOption(option, isSelected)
                  ) : (
                    <span className="block truncate">{option.label}</span>
                  )}
                </div>
                {isSelected && (
                  <Check
                    className="h-4 w-4 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          })}
      </div>
    </FloatingPortal>
  );
};