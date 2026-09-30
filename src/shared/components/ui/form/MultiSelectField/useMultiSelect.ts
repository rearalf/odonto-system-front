import { useEffect, useRef, useState, useMemo, useCallback } from 'react';

export interface UseMultiSelectOptions {
  disabled?: boolean;
  value?: string[];
  onChange?: (value: string[]) => void;
  id?: string;
  options?: Array<{ value: string; label: string }>;
}

export interface UseMultiSelectReturn {
  open: boolean;
  setOpen: (open: boolean) => void;
  focused: boolean;
  wrapperRef: React.RefObject<HTMLDivElement>;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  handleClick: () => void;
  handleFocus: () => void;
  handleBlur: () => void;
  handleToggleOption: (value: string) => void;
  handleRemoveOption: (e: React.MouseEvent, value: string) => void;
  selectedOptions: Array<{ value: string; label: string }>;
  remainingOptions: Array<{ value: string; label: string }>;
  messageId: string | undefined;
}

export function useMultiSelect({
  disabled,
  value = [],
  onChange,
  id,
  options = [],
}: UseMultiSelectOptions = {}): UseMultiSelectReturn {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen((prev) => !prev);
    }
    if (e.key === 'Escape') setOpen(false);
  }, [disabled]);

  const handleClick = useCallback(() => {
    if (!disabled) setOpen((prev) => !prev);
  }, [disabled]);

  const handleFocus = useCallback(() => setFocused(true), []);
  const handleBlur = useCallback(() => setFocused(false), []);

  const handleToggleOption = useCallback(
    (valueToToggle: string) => {
      onChange?.(
        value.includes(valueToToggle)
          ? value.filter((v) => v !== valueToToggle)
          : [...value, valueToToggle],
      );
    },
    [value, onChange],
  );

  const handleRemoveOption = useCallback(
    (e: React.MouseEvent, valueToRemove: string) => {
      e.stopPropagation();
      onChange?.(value.filter((v) => v !== valueToRemove));
    },
    [value, onChange],
  );

  const selectedOptions = useMemo(
    () => options.filter((o) => value.includes(o.value)),
    [options, value],
  );

  const remainingOptions = useMemo(
    () => options.filter((o) => !value.includes(o.value)),
    [options, value],
  );

  const messageId = useMemo(() => (id ? `${id}-message` : undefined), [id]);

  return {
    open,
    setOpen,
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
  };
}