import { useState, useRef } from 'react';
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  size,
  useDismiss,
  useFocus,
  useRole,
  useInteractions,
  useListNavigation,
} from '@floating-ui/react';
import type { SearchOption, UseSearchSelectProps } from './SearchSelect.types';

export function useSearchSelect<T>({
  options,
  value,
  onSelect,
  onSearchChange,
  disabled,
}: UseSearchSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [prevValue, setPrevValue] = useState(value);

  const floatingListRef = useRef<(HTMLElement | null)[]>([null]);

  if (value !== prevValue) {
    setPrevValue(value);
    const selectedOption = options.find((opt) => opt.id === value);
    if (selectedOption) {
      setQuery(selectedOption.label);
    } else if (value === null || value === undefined) {
      setQuery('');
    }
  }

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: (open) => {
      if (disabled) return;
      setIsOpen(open);

      if (!open && value) {
        const selectedOption = options.find((opt) => opt.id === value);
        if (selectedOption) setQuery(selectedOption.label);
      } else if (!open && !value) {
        setQuery('');
      }
    },
    placement: 'bottom-start',
    strategy: 'fixed',
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(6),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
      size({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
      }),
    ],
  });

  // ✅ Sync floating element to listRef for useListNavigation
  const setFloating = (node: HTMLElement | null) => {
    floatingListRef.current[0] = node;
    refs.setFloating(node);
  };

  // ✅ Interacciones completas: focus, dismiss, role, keyboard navigation
  const focus = useFocus(context);
  const dismiss = useDismiss(context, {
    outsidePress: true,
    escapeKey: true,
    referencePress: false,
    outsidePressEvent: 'mousedown',
  });
  const role = useRole(context, { role: 'combobox' });
  const listNavigation = useListNavigation(context, {
    enabled: isOpen && !disabled,
    loop: true,
    virtual: false,
    listRef: floatingListRef,
    selectedIndex: options.findIndex((o) => o.id === value),
    activeIndex: -1,
  });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    focus,
    dismiss,
    role,
    listNavigation,
  ]);

  const getItemProps = (itemOptions: { index: number; disabled?: boolean }) => {
    const itemProps = listNavigation.item;
    if (typeof itemProps === 'function') {
      return itemProps(itemOptions as never);
    }
    return itemProps;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    setQuery(text);
    onSearchChange?.(text);

    if (!isOpen) setIsOpen(true);

    if (text === '') {
      onSelect(null);
    }
  };

  const handleSelectOption = (option: SearchOption<T>) => {
    if (option.disabled) return;
    setQuery(option.label);
    onSelect(option);
    setIsOpen(false);
  };

  const handleClear = () => {
    setQuery('');
    onSelect(null);
    setIsOpen(false);
  };

  return {
    isOpen,
    query,
    floatingStyles,
    setReference: refs.setReference,
    setFloating,
    getReferenceProps,
    getFloatingProps,
    getItemProps,
    handleInputChange,
    handleSelectOption,
    handleClear,
  };
}
