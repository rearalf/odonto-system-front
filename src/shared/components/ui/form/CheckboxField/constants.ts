import type { CheckboxSize } from './types';

export const SIZE_CLASSES: Record<
  CheckboxSize,
  { box: string; icon: string; offset: string }
> = {
  sm: { box: 'size-4 rounded-[4px]', icon: 'size-3', offset: 'mt-0.5' },
  md: { box: 'size-5 rounded-md', icon: 'size-3.5', offset: 'mt-0.5' },
  lg: { box: 'size-6 rounded-md', icon: 'size-4', offset: 'mt-0' },
};
