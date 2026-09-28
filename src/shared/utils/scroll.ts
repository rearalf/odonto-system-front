import { clsx, type ClassValue } from 'clsx';

export const scrollStyles = {
  thin: clsx(
    'overflow-x-auto',
    'scrollbar-thin',
    'scrollbar-track-transparent',
    'scrollbar-thumb-border-subtle/30',
    'hover:scrollbar-thumb-border-subtle',
    'scrollbar-thumb-hover:border-default',
    'scrollbar-thumb-rounded-full',
    'scrollbar-track-hover:bg-surface-subtle',
  ),
  thinY: clsx(
    'overflow-y-auto',
    'scrollbar-thin',
    'scrollbar-track-transparent',
    'scrollbar-thumb-border-subtle/30',
    'hover:scrollbar-thumb-border-subtle',
    'scrollbar-thumb-hover:border-default',
    'scrollbar-thumb-rounded-full',
    'scrollbar-track-hover:bg-surface-subtle',
  ),
  thinBoth: clsx(
    'overflow-auto',
    'scrollbar-thin',
    'scrollbar-track-transparent',
    'scrollbar-thumb-border-subtle/30',
    'hover:scrollbar-thumb-border-subtle',
    'scrollbar-thumb-hover:border-default',
    'scrollbar-thumb-rounded-full',
    'scrollbar-track-hover:bg-surface-subtle',
  ),
};

export const cn = (...inputs: ClassValue[]) => clsx(inputs);
